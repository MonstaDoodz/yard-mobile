import { supabase } from '@/lib/supabase';

export const CUSTOMER_PAYMENT_STATES = [
  'setup_pending',
  'card_saved',
  'authorization_scheduled',
  'authorization_processing',
  'payment_action_required',
  'authorized',
  'capture_processing',
  'capture_failed',
  'paid',
  'canceled',
] as const;

const RIDE_LIST_COLUMNS = [
  'id',
  'pickup_at',
  'booking_type',
  'status',
  'payment_status',
  'city',
  'pickup_address',
  'dropoff_address',
  'hours',
  'vehicle_type',
  'vehicle_tier',
  'customer_total_cents',
  'estimated_gross',
  'driver_id',
  'vehicle_id',
  'created_at',
].join(',');

export async function listCustomerRides() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('An authenticated Yard customer is required.');

  const { data, error } = await supabase
    .from('bookings')
    .select(RIDE_LIST_COLUMNS)
    .eq('customer_id', user.id)
    .in('payment_status', [...CUSTOMER_PAYMENT_STATES])
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}
