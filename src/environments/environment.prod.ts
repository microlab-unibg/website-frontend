import { oauth2 } from './oauth2.environment'
import { supabase } from './supabase.environment';

export const environment = {
  ...supabase,
  ...oauth2,
  production: true,
  name: 'microlab-unibg',
  version: '1.0.0'
};
