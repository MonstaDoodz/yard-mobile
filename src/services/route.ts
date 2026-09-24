import { yardApi } from '@/lib/yard-api';
import type { Coordinates } from '@/types/booking';

type RouteEstimate = {
  distanceKm: number;
  durationMin: number;
};

export async function estimateRoute(
  pickupCoords: Coordinates,
  dropoffCoords: Coordinates,
) {
  return yardApi<RouteEstimate>('/api/route/estimate', {
    method: 'POST',
    authenticated: false,
    body: JSON.stringify({ pickupCoords, dropoffCoords }),
  });
}
