// ==============================================================================
// FITNESS METRIC: Supabase Client Integration & Credential Manager
// Safe client initialization with environment variables & connection validator
// ==============================================================================

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variable defaults
const ENV_SUPABASE_URL = (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) 
  || (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_URL) 
  || '';

const ENV_SUPABASE_ANON_KEY = (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) 
  || (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_ANON_KEY) 
  || 'sb_publishable_P8xlTiqHQVPDNF4Eve1hgg_Gn5cYjR6';

// Storage keys for user-configured credentials in Settings
const STORAGE_URL_KEY = 'fitness_metric_supabase_url';
const STORAGE_ANON_KEY = 'fitness_metric_supabase_anon_key';

export interface SupabaseConfigState {
  isConfigured: boolean;
  url: string;
  maskedKey: string;
  source: 'env' | 'storage' | 'none';
}

export function getEffectiveCredentials(): { url: string; anonKey: string; source: 'env' | 'storage' | 'none' } {
  // Check localStorage first (user runtime configuration in Settings)
  if (typeof window !== 'undefined') {
    const localUrl = localStorage.getItem(STORAGE_URL_KEY);
    const localKey = localStorage.getItem(STORAGE_ANON_KEY);
    if (localUrl && localKey && isValidUrl(localUrl)) {
      return { url: localUrl, anonKey: localKey, source: 'storage' };
    }
  }

  // Fallback to environment variables
  if (ENV_SUPABASE_URL && ENV_SUPABASE_ANON_KEY && isValidUrl(ENV_SUPABASE_URL)) {
    return { url: ENV_SUPABASE_URL, anonKey: ENV_SUPABASE_ANON_KEY, source: 'env' };
  }

  return { url: '', anonKey: '', source: 'none' };
}

function isValidUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function isSupabaseConfigured(): boolean {
  const creds = getEffectiveCredentials();
  return Boolean(creds.url && creds.anonKey && creds.url.includes('.supabase.co'));
}

export function getSupabaseConfigState(): SupabaseConfigState {
  const creds = getEffectiveCredentials();
  const isConfigured = isSupabaseConfigured();
  const maskedKey = creds.anonKey 
    ? `${creds.anonKey.substring(0, 8)}...${creds.anonKey.substring(creds.anonKey.length - 6)}` 
    : '';

  return {
    isConfigured,
    url: creds.url,
    maskedKey,
    source: creds.source
  };
}

let cachedClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  const creds = getEffectiveCredentials();
  if (!creds.url || !creds.anonKey) {
    return null;
  }

  if (cachedClient) return cachedClient;

  try {
    cachedClient = createClient(creds.url, creds.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    });
    return cachedClient;
  } catch (err) {
    console.warn('[Fitness Metric] Supabase initialization error:', err);
    return null;
  }
}

export async function testSupabaseConnection(url: string, anonKey: string): Promise<{ success: boolean; message: string }> {
  if (!isValidUrl(url)) {
    return { success: false, message: 'Invalid Supabase URL format. Must start with https://' };
  }
  if (!anonKey || anonKey.length < 20) {
    return { success: false, message: 'Invalid Anonymous Key length.' };
  }

  try {
    const tempClient = createClient(url, anonKey);
    // Ping health or query public table
    const { error } = await tempClient.from('food_categories').select('id').limit(1);
    if (error && error.code !== 'PGRST116') {
      // If table doesn't exist yet, it still contacted Postgres!
      return { 
        success: true, 
        message: 'Connected to Supabase endpoint! (Remember to execute schema.sql in your Supabase SQL editor if tables are missing).' 
      };
    }
    return { success: true, message: 'Successfully connected to Supabase database!' };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to establish connection to Supabase.' };
  }
}

export function saveSupabaseConfig(url: string, anonKey: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_URL_KEY, url.trim());
    localStorage.setItem(STORAGE_ANON_KEY, anonKey.trim());
    cachedClient = null; // reset client
  }
}

export function clearSupabaseConfig(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_URL_KEY);
    localStorage.removeItem(STORAGE_ANON_KEY);
    cachedClient = null;
  }
}
