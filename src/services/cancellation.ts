import { getClientEnv } from '@/lib/env';
import { supabase } from '@/lib/supabase';

export async function cancelCustomerBooking(bookingId: string) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.access_token) {
    throw new Error('An authenticated Yard customer session is required.');
  }

  const { supabaseUrl } = getClientEnv();
  const response = await fetch(
    `${supabaseUrl}/functions/v1/payment-cancellation`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        action: 'customer_cancel',
        booking_id: bookingId,
      }),
    },
  );

  const body = await response.json();
  if (!response.ok) {
    throw new Error(
      body?.error ? String(body.error) : 'Customer cancellation failed.',
    );
  }

  return body;
}
