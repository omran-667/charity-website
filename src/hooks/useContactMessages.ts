import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export type ContactMessage = {
  id: string;
  name: string;
  phone: string | null;
  email: string;
  message: string;
  created_at: string;
  is_read: boolean;
};

export function useContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('contact_messages')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setMessages(data || []);
      } catch (err) {
        console.error('Error fetching contact messages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return { messages, loading };
}

export async function submitContactMessage(name: string, email: string, message: string, phone?: string) {
  try {
    const { error } = await supabase
      .from('contact_messages')
      .insert([{ name, email, message, phone: phone || null, is_read: false }]);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error submitting contact message:', err);
    return false;
  }
}

export async function markMessageAsRead(id: string) {
  try {
    const { error } = await supabase
      .from('contact_messages')
      .update({ is_read: true })
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error marking message as read:', err);
    return false;
  }
}

export async function deleteContactMessage(id: string) {
  try {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error deleting contact message:', err);
    return false;
  }
}
