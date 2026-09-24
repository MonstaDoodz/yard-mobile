import { getClientEnv } from '@/lib/env';
import { supabase } from '@/lib/supabase';

type YardApiOptions = Omit<RequestInit, 'headers'> & {
  headers?: Record<string, string>;
  authenticated?: boolean;
};

export class YardApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly body: unknown,
  ) {
    super(message);
    this.name = 'YardApiError';
  }
}

export async function yardApi<T>(
  path: `/${string}`,
  options: YardApiOptions = {},
): Promise<T> {
  const baseUrl = getClientEnv().yardApiBaseUrl;
  if (!baseUrl) {
    throw new Error(
      'EXPO_PUBLIC_YARD_API_BASE_URL is not configured. Set the actual Yard staging API origin before calling trusted Next.js endpoints.',
    );
  }

  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...options.headers,
  };

  if (options.body && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  if (options.authenticated !== false) {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      throw new Error('An authenticated Yard customer session is required.');
    }

    headers.Authorization = `Bearer ${session.access_token}`;
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get('content-type') ?? '';
  const body = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      body && typeof body === 'object' && 'error' in body
        ? String((body as { error: unknown }).error)
        : `Yard API request failed with ${response.status}`;
    throw new YardApiError(message, response.status, body);
  }

  return body as T;
}
