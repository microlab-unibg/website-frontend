#!/usr/bin/env node
/**
 * One-off migration: Firestore thesis-proposals + Storage files → Supabase.
 *
 * Required env:
 *   FIREBASE_SERVICE_ACCOUNT_PATH  Path to Firebase service account JSON
 *   SUPABASE_URL                   Supabase project URL
 *   SUPABASE_SERVICE_ROLE_KEY      Supabase service_role key (not the anon key)
 *
 * Optional:
 *   FIREBASE_STORAGE_BUCKET        Default: website-frontend-firebase.appspot.com
 *
 * Usage:
 *   node scripts/migrate-firebase-to-supabase.mjs
 */

import { readFileSync } from 'fs';
import { createRequire } from 'module';
import { createClient } from '@supabase/supabase-js';

const require = createRequire(import.meta.url);

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing required env var: ${name}`);
    process.exit(1);
  }
  return value;
}

function loadFirebaseAdmin() {
  try {
    return {
      app: require('firebase-admin/app'),
      firestore: require('firebase-admin/firestore'),
      storage: require('firebase-admin/storage')
    };
  } catch {
    console.error('Install firebase-admin first: npm install --no-save firebase-admin');
    process.exit(1);
  }
}

function parseStoragePath(refValue, defaultBucket) {
  if (!refValue) {
    return null;
  }
  if (refValue.startsWith('gs://')) {
    const withoutScheme = refValue.slice('gs://'.length);
    const slash = withoutScheme.indexOf('/');
    if (slash < 0) {
      return null;
    }
    return {
      bucket: withoutScheme.slice(0, slash),
      path: withoutScheme.slice(slash + 1)
    };
  }
  return { bucket: defaultBucket, path: refValue.replace(/^\//, '') };
}

function guessContentType(path) {
  const lower = path.toLowerCase();
  if (lower.endsWith('.pdf')) return 'application/pdf';
  if (lower.endsWith('.png')) return 'image/png';
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg';
  if (lower.endsWith('.gif')) return 'image/gif';
  if (lower.endsWith('.webp')) return 'image/webp';
  return 'application/octet-stream';
}

async function migrateFile(getStorage, supabase, refValue, defaultBucket) {
  const parsed = parseStoragePath(refValue, defaultBucket);
  if (!parsed || !parsed.path) {
    return '';
  }

  const [downloadResponse] = await getStorage().bucket(parsed.bucket).file(parsed.path).download();
  const contentType = guessContentType(parsed.path);

  // Supabase JS expects Blob/File/ArrayBuffer in some environments; Buffer alone can
  // produce an invalid Content-Type header. Wrap as Blob with an explicit type.
  const blob = new Blob([new Uint8Array(downloadResponse)], { type: contentType });

  const { error } = await supabase.storage.from('thesis').upload(parsed.path, blob, {
    upsert: true,
    contentType
  });
  if (error) {
    throw error;
  }
  return parsed.path;
}

async function main() {
  const serviceAccountPath = requireEnv('FIREBASE_SERVICE_ACCOUNT_PATH');
  const supabaseUrl = requireEnv('SUPABASE_URL');
  const serviceRoleKey = requireEnv('SUPABASE_SERVICE_ROLE_KEY');
  const defaultBucket = process.env.FIREBASE_STORAGE_BUCKET || 'website-frontend-firebase.appspot.com';

  const { app, firestore, storage } = loadFirebaseAdmin();
  const { initializeApp, getApps, cert } = app;
  const { getFirestore } = firestore;
  const { getStorage } = storage;

  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
  if (getApps().length === 0) {
    initializeApp({
      credential: cert(serviceAccount),
      storageBucket: defaultBucket
    });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  const snapshot = await getFirestore().collection('thesis-proposals').get();
  console.log(`Found ${snapshot.size} thesis proposal(s).`);

  let ok = 0;
  let failed = 0;

  for (const doc of snapshot.docs) {
    const data = doc.data() || {};
    const id = doc.id;
    try {
      const imgRef = await migrateFile(getStorage, supabase, data.imgRef, defaultBucket);
      const pdfRef = await migrateFile(getStorage, supabase, data.pdfRef, defaultBucket);

      const row = {
        id,
        title: data.title ?? '',
        description: data.description ?? '',
        bachelor: !!data.bachelor,
        master: !!data.master,
        status: data.status || 'available',
        author: data.author ?? '',
        email: data.email ?? '',
        date: data.date ?? '',
        img_ref: imgRef,
        pdf_ref: pdfRef
      };

      const { error } = await supabase.from('thesis_proposals').upsert(row, { onConflict: 'id' });
      if (error) {
        throw error;
      }
      ok += 1;
      console.log(`✓ Migrated ${id}`);
    } catch (err) {
      failed += 1;
      console.error(`✗ Failed ${id}:`, err.message || err);
    }
  }

  console.log(`Done. Success: ${ok}, Failed: ${failed}`);
  process.exit(failed > 0 ? 1 : 0);
}

main();
