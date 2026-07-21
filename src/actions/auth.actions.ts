'use server';

import { redirect } from 'next/navigation';
import { getSupabaseServerClient } from '@/lib/supabase/server';

export interface LoginState {
  error?: string;
  message?: string;
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = (formData.get('email') as string | null)?.trim() ?? '';
  const password = (formData.get('password') as string | null) ?? '';
  const next = (formData.get('next') as string | null)?.trim() || '/admin/dashboard';

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  let redirectTo: string | null = null;

  try {
    const supabase = await getSupabaseServerClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('[login] Supabase error:', error.message, error.status);
      return { error: `${error.message} (code: ${error.status ?? 'unknown'})` };
    }

    if (!data?.session) {
      return { error: 'Login failed — no session was returned.' };
    }

    redirectTo = next;
  } catch (err) {
    console.error('[login] Unexpected error:', err);
    return { error: `Unexpected error: ${err instanceof Error ? err.message : String(err)}` };
  }

  // redirect() must be called OUTSIDE try/catch
  if (redirectTo) {
    redirect(redirectTo);
  }

  return { error: 'Redirect failed — please try again.' };
}
