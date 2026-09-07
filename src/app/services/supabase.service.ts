import { Injectable } from '@angular/core';
import { createClient, RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Thesis } from '@models/thesis';

type ThesisRow = {
  id: string;
  title: string;
  description: string;
  bachelor: boolean;
  master: boolean;
  status: string;
  author: string;
  email: string;
  date: string;
  img_ref: string;
  pdf_ref: string;
};

const BUCKET = 'thesis';
const TABLE = 'thesis_proposals';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private readonly client: SupabaseClient;

  constructor() {
    const { url, anonKey } = environment.supabase;
    if (!url || !anonKey) {
      console.warn('Supabase url/anonKey are not configured in environment.');
    }
    this.client = createClient(url || 'https://placeholder.supabase.co', anonKey || 'placeholder');
  }

  getClient(): SupabaseClient {
    return this.client;
  }

  private rowToThesis(row: ThesisRow): Thesis {
    return new Thesis(
      row.id,
      row.title,
      row.description,
      row.bachelor,
      row.master,
      row.status,
      row.author,
      row.email,
      row.date,
      row.img_ref,
      '',
      row.pdf_ref
    );
  }

  private thesisToRow(thesis: Thesis, id: string): ThesisRow {
    return {
      id,
      title: thesis.title ?? '',
      description: thesis.description ?? '',
      bachelor: !!thesis.bachelor,
      master: !!thesis.master,
      status: thesis.status || 'available',
      author: thesis.author ?? '',
      email: thesis.email ?? '',
      date: thesis.date ?? '',
      img_ref: thesis.imgRef ?? '',
      pdf_ref: thesis.pdfRef ?? ''
    };
  }

  watchTheses(): Observable<Thesis[]> {
    return new Observable<Thesis[]>((subscriber) => {
      let channel: RealtimeChannel | null = null;
      let cancelled = false;

      const emitAll = async () => {
        const { data, error } = await this.client.from(TABLE).select('*');
        if (cancelled) {
          return;
        }
        if (error) {
          subscriber.error(error);
          return;
        }
        subscriber.next((data as ThesisRow[]).map((row) => this.rowToThesis(row)));
      };

      emitAll().then(() => {
        if (cancelled) {
          return;
        }
        channel = this.client
          .channel('thesis_proposals_changes')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: TABLE },
            () => {
              void emitAll();
            }
          )
          .subscribe();
      });

      return () => {
        cancelled = true;
        if (channel) {
          void this.client.removeChannel(channel);
        }
      };
    });
  }

  async getThesis(id: string): Promise<Thesis | null> {
    const { data, error } = await this.client.from(TABLE).select('*').eq('id', id).maybeSingle();
    if (error) {
      throw error;
    }
    return data ? this.rowToThesis(data as ThesisRow) : null;
  }

  async insertThesis(thesis: Thesis): Promise<string> {
    const id = crypto.randomUUID();
    const row = this.thesisToRow(thesis, id);
    const { error } = await this.client.from(TABLE).insert(row);
    if (error) {
      throw error;
    }
    return id;
  }

  async updateThesis(id: string, thesis: Thesis): Promise<void> {
    const row = this.thesisToRow(thesis, id);
    const { error } = await this.client.from(TABLE).update(row).eq('id', id);
    if (error) {
      throw error;
    }
  }

  async deleteThesis(id: string): Promise<void> {
    const { error } = await this.client.from(TABLE).delete().eq('id', id);
    if (error) {
      throw error;
    }
  }

  async uploadFile(file: File, parentDir: string): Promise<string> {
    const path = `${parentDir}${file.name}`;
    const { error } = await this.client.storage.from(BUCKET).upload(path, file, {
      upsert: true,
      contentType: file.type || undefined
    });
    if (error) {
      throw error;
    }
    return path;
  }

  getPublicUrl(path: string): string {
    if (!path) {
      return '';
    }
    const { data } = this.client.storage.from(BUCKET).getPublicUrl(path);
    return data.publicUrl;
  }

  async downloadBlob(path: string): Promise<Blob> {
    const { data, error } = await this.client.storage.from(BUCKET).download(path);
    if (error || !data) {
      throw error ?? new Error('Download failed');
    }
    return data;
  }

  async deleteFile(path: string): Promise<void> {
    if (!path) {
      return;
    }
    const { error } = await this.client.storage.from(BUCKET).remove([path]);
    if (error) {
      throw error;
    }
  }
}
