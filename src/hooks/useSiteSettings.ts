import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function useSiteSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('key, value');

        if (error) throw error;

        const settingsMap: Record<string, string> = {};
        data?.forEach((item) => {
          settingsMap[item.key] = item.value;
        });
        setSettings(settingsMap);
      } catch (err) {
        console.error('Error fetching site settings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading };
}

export function useSetting(key: string, defaultValue: string = '') {
  const { settings, loading } = useSiteSettings();
  return settings[key] || defaultValue;
}

export async function getSiteSetting(key: string, defaultValue: string = '') {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', key)
      .single();

    if (error) throw error;
    return data?.value || defaultValue;
  } catch (err) {
    console.error(`Error fetching setting "${key}":`, err);
    return defaultValue;
  }
}

export async function updateSiteSetting(key: string, value: string) {
  try {
    const { error } = await supabase
      .from('site_settings')
      .upsert({ key, value });

    if (error) throw error;
    return true;
  } catch (err) {
    console.error(`Error updating setting "${key}":`, err);
    return false;
  }
}
