

# Diagnose and Fix Webhook Errors

## Likely Root Cause

The most probable cause is **CORS (Cross-Origin Resource Sharing)**. Your users' browsers are blocking the direct request to `natisolanog.app.n8n.cloud` because the n8n server may not return the required CORS headers (`Access-Control-Allow-Origin`). This works in some environments (like n8n's test mode or certain browsers) but fails for end users on your published domain.

A secondary possibility is that the webhook response structure doesn't match what the validation function expects, causing a silent "Invalid response structure" error.

## Solution: Proxy Through a Backend Function

Instead of calling n8n directly from the browser, route the request through a backend function. This completely eliminates CORS issues since the request to n8n happens server-side.

```
User's Browser --> Backend Function --> n8n Webhook --> Backend Function --> User's Browser
```

## Implementation Steps

### Step 1: Create a backend function `generate-itinerary`

This function will:
- Receive the trip details from the frontend
- Forward them to the n8n webhook server-side (no CORS issues)
- Log the raw response for debugging
- Return the response back to the frontend

### Step 2: Update `src/services/voyagerApi.ts`

- Replace the direct `fetch` to n8n with a call to the new backend function
- Keep the existing validation and transformation logic
- Add detailed `console.error` logging that captures the actual response body when validation fails, so we can see exactly what n8n is returning

### Step 3: Add detailed error logging

In the validation failure case, log the raw response data so we can see exactly what shape n8n is returning. This will help catch any structure mismatches.

## Technical Details

**Backend function** (`supabase/functions/generate-itinerary/index.ts`):
- Accepts POST with `{ city, country, number_of_days, month, preferences }`
- Forwards to `https://natisolanog.app.n8n.cloud/webhook/voyager`
- Returns the n8n response as-is
- Includes error handling and logging

**Frontend service** (`src/services/voyagerApi.ts`):
- Calls the backend function via the existing client instead of calling n8n directly
- All existing validation/transform logic stays the same
- Enhanced error logging for debugging

