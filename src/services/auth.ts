import type { Session } from '@supabase/supabase-js';

import { supabase } from '@/lib/supabase';
import type { CustomerProfile } from '@/types/customer';

export async function signInWithPassword(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email: email.trim(), password });
}

export async function signOutLocal() {
  return supabase.auth.signOut({ scope: 'local' });
}

export async function loadCustomerProfile(
  session: Session,
): Promise<CustomerProfile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, role, full_name, phone')
    .eq('id', session.user.id)
    .maybeSingle();

  if (error) throw error;
  if (!data || data.role !== 'customer') return null;

  return {
    id: data.id,
    role: 'customer',
    fullName: data.full_name,
    phone: data.phone,
    email: session.user.email ?? '',
  };
}
