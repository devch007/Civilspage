'use server';

import { redirect } from 'next/navigation';
import { getSupabaseServerClient } from '@/lib/supabase/server';

export interface LoginState {
  error?: string;
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = (formData.get('email') as string)?.trim();
  const password = formData.get('password') as string;
  const next = (formData.get('next') as string) || '/admin/dashboard';

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  if (!data.session) {
    return { error: 'Login failed — no session returned.' };
  }

  // redirect() throws internally so it must be outside try/catch
  redirect(next);
}
