

# Fix Client-Side Timeout for Slow n8n Responses

## Problem
The n8n webhook takes ~27 seconds to respond. The browser/Supabase client aborts the connection before the response arrives, causing a "Failed to fetch" error even though the edge function succeeds.

## Solution
Add an `AbortController` with a longer timeout (90 seconds) to the Supabase function invocation call.

## File to Update

**`src/services/voyagerApi.ts`** — Update the `generateItinerary` function to pass a custom fetch signal with a 90-second timeout:

```typescript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 90000); // 90 seconds

const { data, error } = await supabase.functions.invoke('generate-itinerary', {
  body: { place, number_of_days, month, preferences },
  // @ts-ignore - signal is supported but not in types
  signal: controller.signal,
});

clearTimeout(timeoutId);
```

If the `signal` option isn't supported by the Supabase client, we'll instead use a raw `fetch` call to the edge function URL with proper headers and the abort signal, bypassing `supabase.functions.invoke()`.

## Why This Fixes It
The default browser fetch timeout (~30s) is shorter than n8n's processing time (~27s). By explicitly setting a 90-second timeout, we give n8n enough time to complete.

