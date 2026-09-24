# Yard Mobile

Customer-only native iOS/Android client for Yard.

## Foundation scope

- Expo SDK 57 + React Native + TypeScript
- Expo Router using `src/app`
- Supabase Auth persisted with React Native storage
- Staging-only Supabase runtime guard
- Customer-only route gate
- Book / Rides / Account navigation shell
- Trusted Yard API client with customer Bearer auth
- Backend service boundaries for booking, pricing, route estimation, rides, account, cancellation
- No provider, fleet, driver, dispatch, payout, admin, or onboarding code

See `docs/backend-boundaries.md` before implementing customer flows.

## Local setup

1. Use Node 22.13+.
2. Copy `.env.example` to `.env.local`.
3. Set the staging Supabase publishable key in
   `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
4. `EXPO_PUBLIC_YARD_API_BASE_URL` is set to `https://staging.yardlimo.com`.
   Before API-backed mobile testing, Vercel Deployment Protection must allow the
   mobile client to reach that staging origin without embedding a bypass secret.
5. Run `npm install`.
6. Run `npm run check`.
7. Run `npm start`.

The runtime refuses any Supabase URL other than staging project
`xsvnlmgybrrrxnccukpn` and accepts only a modern `sb_publishable_*` client key.

## Deliberately not installed yet

- `@stripe/stripe-react-native`
- Google Maps / Places native package
- global state libraries such as Zustand

Those dependencies should be added when their real flow is implemented, not as
foundation cargo-cult.
