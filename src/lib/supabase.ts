import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or anon key in environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      news_posts: {
        Row: {
          id: string;
          title: string;
          content: string;
          image_url: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['news_posts']['Row'], 'id' | 'created_at'> & {
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['news_posts']['Insert']>;
      };
      site_settings: {
        Row: {
          id: string;
          key: string;
          value: string;
        };
        Insert: Omit<Database['public']['Tables']['site_settings']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['site_settings']['Insert']>;
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          phone: string | null;
          email: string;
          message: string;
          created_at: string;
          is_read: boolean;
        };
        Insert: Omit<Database['public']['Tables']['contact_messages']['Row'], 'id' | 'created_at' | 'is_read'> & {
          created_at?: string;
          is_read?: boolean;
        };
        Update: Partial<Database['public']['Tables']['contact_messages']['Insert']>;
      };
    };
  };
};
