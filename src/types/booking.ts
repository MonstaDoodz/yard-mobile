export type BookingType = 'transfer' | 'hourly';
export type VehicleType = 'sedan' | 'van';
export type VehicleTier = 'premium' | 'luxury';
export type ZoneType = 'city' | 'airport' | 'port';

export type Coordinates = {
  lat: number;
  lng: number;
};

export type CustomerQuote = {
  vehicleType: VehicleType;
  vehicleTier: VehicleTier;
  customerCents: number;
  multiplierApplied: number;
  minimumFareApplied: boolean;
};

export type CreateBookingInput = {
  bookingType: BookingType;
  city: string;
  pickupAddress: string;
  dropoffAddress: string | null;
  pickupPlaceId: string | null;
  dropoffPlaceId: string | null;
  pickupCoords: Coordinates;
  dropoffCoords: Coordinates | null;
  date: string;
  time: string;
  hours: number | null;
  vehicleType: VehicleType;
  vehicleTier: VehicleTier;
  flightNumber: string | null;
  shipName: string | null;
};

export type CreateBookingResult = {
  id: string;
  amount: number;
  amountCents: number;
  paymentStatus: string | null;
};
