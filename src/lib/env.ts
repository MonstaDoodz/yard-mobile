import {
  YARD_STAGING_SUPABASE_PROJECT_REF,
  YARD_STAGING_SUPABASE_URL,
} from '@/constants/environment';

type ClientEnv = {
  supabaseUrl: string;
  supabasePublishableKey: string;
  yardApiBaseUrl: string | null;
};

function required(name: string, value: string | undefined): string {
  const normalized = value?.trim();
  if (!normalized) {
    throw new Error(`Missing required public environment variable: ${name}`);
  }
  return normalized;
}

function assertClientSafeSupabaseKey(key: string): void {
  if (!key.startsWith('sb_publishable_')) {
    throw new Error(
      'Refusing to start: yard-mobile requires a Supabase publishable key (sb_publishable_*). Secret, service-role, and legacy keys are not accepted.',
    );
  }
}

function normalizeBaseUrl(value: string | undefined): string | null {
  const normalized = value?.trim();
  if (!normalized) return null;
  return normalized.replace(/\/+$/, '');
}

export function getClientEnv(): ClientEnv {
  const supabaseUrl = required(
    'EXPO_PUBLIC_SUPABASE_URL',
    process.env.EXPO_PUBLIC_SUPABASE_URL,
  );
  const supabasePublishableKey = required(
    'EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
    process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );

  if (supabaseUrl !== YARD_STAGING_SUPABASE_URL) {
    throw new Error(
      `Refusing to start: yard-mobile is staging-only and must use Supabase project ${YARD_STAGING_SUPABASE_PROJECT_REF}.`,
    );
  }

  assertClientSafeSupabaseKey(supabasePublishableKey);

  return {
    supabaseUrl,
    supabasePublishableKey,
    yardApiBaseUrl: normalizeBaseUrl(process.env.EXPO_PUBLIC_YARD_API_BASE_URL),
  };
}
