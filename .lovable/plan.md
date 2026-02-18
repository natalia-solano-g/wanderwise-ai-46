

# Simplify Trip Form: Replace City + Country with a Single "Place" Field

## What Changes

The current form asks for **City** and **Country** as two separate fields. This will be simplified into a single **"Place"** input where users can type any destination -- a city, country, or region (e.g., "Rome", "Japan", "Southeast Asia").

## Files to Update

### 1. `src/types/voyager.ts` -- Update the TripDetails type
- Replace `city: string` and `country: string` with `place: string`
- Update `ChatContext` similarly: replace `city` and `country` with `place`

### 2. `src/components/TripForm.tsx` -- Simplify the form
- Remove the separate `city` and `country` state variables; replace with a single `place` state
- Remove the Country input field entirely
- Rename the City field to **"Where to?"** with placeholder like `"e.g. Rome, Japan, Southeast Asia..."`
- Update validation to check `place.trim()` instead of both city and country
- Send `place` in the `onSubmit` payload

### 3. `src/services/voyagerApi.ts` -- Update API call and fallback
- Send `place` instead of `city` and `country` to the edge function
- Update `transformResponse` to use `destination.city` (or a new `destination.place` field) from the webhook response for the chat context
- Update `getFallbackItinerary` to use `details.place` instead of `details.city`
- Update `ChatContext` references accordingly

### 4. `supabase/functions/generate-itinerary/index.ts` -- Update edge function
- Accept `place` instead of `city` and `country` from the request body
- Forward `place` to the n8n webhook (the n8n workflow will need to handle parsing place into the appropriate destination)

### 5. `src/components/ItineraryView.tsx` -- Update hero display
- Instead of showing `city` and `country` separately, display `place` (or use the destination data returned by the webhook, which may still contain city/country)
- The hero title and metadata line will adapt to show whatever the webhook returns

### 6. `src/pages/Index.tsx` -- No changes needed
- Already passes `TripDetails` generically to the form and API

## How the Webhook Response is Handled

The n8n webhook response still returns `destination.city` and `destination.country`. This won't change on the frontend side -- the response transformation will continue to use those fields for the itinerary view. The simplification is only on the **input** side: what the user types and what gets sent to the backend.

## Technical Details

**TripDetails type change:**
```typescript
// Before
export interface TripDetails {
  city: string;
  country: string;
  numberOfDays: number;
  month: string;
  preferences: string;
}

// After
export interface TripDetails {
  place: string;
  numberOfDays: number;
  month: string;
  preferences: string;
}
```

**Edge function payload change:**
```typescript
// Before: { city, country, number_of_days, month, preferences }
// After:  { place, number_of_days, month, preferences }
```

**ChatContext update:**
```typescript
// Before
export interface ChatContext {
  city: string;
  country: string;
  days: number;
  month: string;
}

// After
export interface ChatContext {
  place: string;
  days: number;
  month: string;
}
```

**ItineraryView hero** will use `destination.city` and `destination.country` from the webhook response (unchanged), falling back to the `place` value in the chat context if needed.

