import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export type NewsPost = {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
};

export function useNewsPosts() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('news_posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (err) {
        console.error('Error fetching news posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading };
}

export async function createNewsPost(title: string, content: string, image_url?: string) {
  try {
    const { error } = await supabase
      .from('news_posts')
      .insert([{ title, content, image_url: image_url || null }]);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error creating news post:', err);
    return false;
  }
}

export async function updateNewsPost(id: string, title: string, content: string, image_url?: string) {
  try {
    const { error } = await supabase
      .from('news_posts')
      .update({ title, content, image_url: image_url || null })
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error updating news post:', err);
    return false;
  }
}

export async function deleteNewsPost(id: string) {
  try {
    const { error } = await supabase
      .from('news_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error deleting news post:', err);
    return false;
  }
}
