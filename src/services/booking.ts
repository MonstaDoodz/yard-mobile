import { yardApi } from '@/lib/yard-api';
import type {
  CreateBookingInput,
  CreateBookingResult,
} from '@/types/booking';

export async function createBooking(input: CreateBookingInput) {
  return yardApi<CreateBookingResult>('/api/bookings', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}
