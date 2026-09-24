# Yard mobile backend boundaries

Initial audit of `MonstaDoodz/lux-chauffeur-frontend` on 2026-09-24.
The customer-contract files checked on `main` and `development` are currently
identical. Vercel maps the `development` branch to `https://staging.yardlimo.com`.

## Architecture rule

`yard-mobile` is a customer presentation client. Yard's existing backend stays
authoritative for pricing, booking validation, payment state, cancellation
settlement, ride state, provider assignment, dispatch, and commissions.

## Current web flow -> mobile boundary

| Flow | Current web chain | Mobile foundation decision |
| --- | --- | --- |
| Email/password auth | `app/login/LoginClient.tsx` -> `supabase.auth.signInWithPassword()` -> Supabase Auth | Direct Supabase Auth. Persist the mobile session with React Native storage; `detectSessionInUrl: false`. |
| Google auth | `LoginClient.tsx` -> `signInWithOAuth({ provider: "google" })` -> `/auth/callback` -> direct `profiles` / `customer_fiscal_profiles` reads | Reuse Supabase Auth, but implement a native OAuth/deep-link return flow. Do not copy the browser callback literally. |
| Apple auth | `LoginClient.tsx` -> `signInWithOAuth({ provider: "apple" })` -> `/auth/callback`; web path is feature-gated | Do not enable in mobile until Yard's native Apple redirect/configuration is explicitly ready. |
| Customer profile gate | login/callback -> direct RLS reads from `profiles` and `customer_fiscal_profiles` | Direct RLS read is acceptable for customer-only session gating. |
| Booking locations | `app/book/page.tsx` -> direct `cities` / `transport_hubs` reads + `LocationAutocomplete.tsx` -> Google Maps JS Places -> direct `is_pickup_allowed` RPC for UI precheck | Build a native location adapter later. Google Maps JS is browser-only. The final booking endpoint still revalidates locations/service area, so client checks remain advisory. |
| Route estimation | booking UI -> `POST /api/route/estimate` -> server `GOOGLE_MAPS_SERVER_KEY` -> Google Routes API | Call the trusted staging API. Never put the Google server key in Expo. |
| Pricing | booking UI -> `POST /api/quote` -> `fetchYardQuote()` -> service-role Supabase -> `yard_quote()` RPC -> `toCustomerQuote()` | Call the trusted staging API. Mobile displays returned customer prices and never recomputes the fare. |
| Vehicle selection | booking page local state -> customer quote map returned by `/api/quote` | Native presentation state only. Vehicle availability/price comes from server quote results. |
| Booking creation | booking UI -> `POST /api/bookings` with customer Bearer token -> service-role auth/profile check -> city/market/hub canonicalization -> `is_pickup_allowed` -> Google Routes verification -> `yard_quote()` -> authoritative `bookings` insert | Call the trusted staging API. Do not insert `bookings` directly from mobile. |
| Initial card setup | booking UI -> protected `create-checkout-session` Edge Function -> Stripe secret/service role -> Setup-mode Checkout -> payment secret tables | Keep the Edge Function. It currently returns to web `APP_URL`; add an allow-listed mobile return surface before native checkout work. |
| Payment recovery | `/my-bookings/[id]/fix-payment` -> protected `payment-recovery` Edge Function -> Stripe PaymentIntent -> `yard_finalize_payment_recovery` RPC | Server contract is reusable. Mobile Stripe UI is deferred until the payment phase. |
| Ride list | `app/my-bookings/page.tsx` -> direct RLS `bookings` read -> extra `profiles` / `fleet_vehicles` reads -> realtime | Keep all DB calls behind `services/rides.ts`. Reuse the current RLS read initially; consider one customer read RPC only if native implementation proves too chatty. |
| Ride detail | no clean customer-specific detail endpoint; web mostly renders from the list dataset | Do not scatter direct table reads through screens. Define a detail contract when Rides is implemented. |
| Customer account | `AccountPage.tsx` -> Bearer token -> `GET/PATCH /api/account` -> server auth/service client -> `profiles` + signed avatar URL | Call the trusted staging API. |
| Avatar | account UI -> `profile-avatar-upload` Edge Function -> server validation/storage | Reuse the protected Edge Function later. |
| Account deletion | account UI -> `POST /api/account/deletion-request` -> server auth/service client + server email pipeline | Call the trusted staging API. No Resend key in mobile. |
| Cancellation | My Bookings -> `payment-cancellation` Edge Function with JWT -> server Stripe/service-role settlement logic | Reuse the Edge Function. Any fee preview on device is informational; the server decides the result. |
| Receipt PDF | invoice pipeline -> service-only `customer-ride-invoice-pdf` function -> private storage | Not mobile-callable today: the PDF function requires the service-role API key. Add/reuse an ownership-checked customer retrieval endpoint before receipt UI. |

## Secrets that never belong in Expo

- `SUPABASE_SERVICE_ROLE_KEY`
- Supabase secret keys (`sb_secret_*`)
- Stripe secret keys (`sk_*`)
- `GOOGLE_MAPS_SERVER_KEY`
- Resend API keys
- cron secrets
- SDI/OpenAPI credentials
- provider/admin internal credentials

Every `EXPO_PUBLIC_*` value is treated as public application configuration.
The mobile runtime is intentionally locked to staging Supabase project
`xsvnlmgybrrrxnccukpn` during foundation work.

## Smallest backend changes identified

### 1. Mobile Stripe return target

`create-checkout-session` derives success/cancel URLs from server `APP_URL`, so
hosted Checkout returns to the website. Before implementing mobile checkout,
extend the request with a constrained selector such as
`return_surface: "web" | "mobile"`. The function must map that selector to
server-configured allow-listed URLs/deep links. Never accept an arbitrary return
URL from the client.

### 2. Customer receipt retrieval

`customer-ride-invoice-pdf` is intentionally service-role-only. Before exposing
receipts in the app, provide an authenticated customer endpoint/function that:
validates the JWT, verifies the invoice belongs to that customer, and returns a
short-lived signed download or streams the PDF. Do not weaken the existing
service-only function.

No other backend refactor is required to start the mobile app.

## Future travel statistics

Future shareable statistics must aggregate real completed booking records.
Vehicle tier is not proof of a specific vehicle model. Model-level statistics
must use the actual fulfilled vehicle identity recorded for the ride.

## Staging transport blocker

The `development` deployment is aliased to `https://staging.yardlimo.com`, but
that preview is currently subject to Vercel Deployment Protection. A native app
cannot depend on a Vercel Authentication browser cookie, and a Protection Bypass
for Automation secret must **not** be bundled into Expo.

Before mobile calls `/api/quote`, `/api/bookings`, `/api/route/estimate`, or
`/api/account` on staging, make the staging API origin reachable by the app. The
smallest option is a Vercel Deployment Protection Exception for the staging
alias if the Yard plan supports it. Otherwise, expose a dedicated unprotected
staging API origin/project while keeping authorization inside the Yard endpoints.
Do not solve this by placing `x-vercel-protection-bypass` in `EXPO_PUBLIC_*`.
