import { yardApi } from '@/lib/yard-api';
import type {
  BookingType,
  CustomerQuote,
  ZoneType,
} from '@/types/booking';

type QuoteInput = {
  city: string;
  bookingType: BookingType;
  zoneType: ZoneType;
  distanceKm: number | null;
  hours: number | null;
};

export async function getCustomerQuotes(input: QuoteInput) {
  return yardApi<{ quotes: CustomerQuote[] }>('/api/quote', {
    method: 'POST',
    authenticated: false,
    body: JSON.stringify(input),
  });
}
