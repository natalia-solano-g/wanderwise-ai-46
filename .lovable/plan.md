

# n8n Webhook Integration Plan

## Overview
Connect Voyager to your n8n test webhook to generate real itineraries with live weather, history, news, and music data.

## What Will Change

### 1. Create API Service Layer
A new service file (`src/services/voyagerApi.ts`) that:
- Sends trip details to your n8n webhook
- Handles the response and maps it to our `ItineraryData` type
- Includes proper error handling with fallback to mock data

### 2. Update Index Page
Modify `src/pages/Index.tsx` to:
- Replace the mock data generator with real API calls
- Add error handling with user-friendly toast notifications
- Keep the engaging loading animation during the API call

### 3. Response Mapping
The n8n webhook returns data in snake_case format. We'll transform it to match our TypeScript types:

| n8n Response | Voyager Type |
|--------------|--------------|
| `max_temp_c` | `maxTempC` |
| `min_temp_c` | `minTempC` |
| `number_of_days` | `numberOfDays` |

## Technical Details

### API Service (`src/services/voyagerApi.ts`)
```text
+---------------------------+
|    generateItinerary()    |
+---------------------------+
          |
          v
+---------------------------+
| POST to n8n webhook       |
| - city, country           |
| - number_of_days, month   |
| - preferences             |
+---------------------------+
          |
          v
+---------------------------+
| Transform Response        |
| - Map snake_case to       |
|   camelCase               |
| - Add trip metadata       |
+---------------------------+
          |
          v
+---------------------------+
| Return ItineraryData      |
+---------------------------+
```

### Request Payload
```json
{
  "city": "London",
  "country": "United Kingdom",
  "number_of_days": 4,
  "month": "September",
  "preferences": "I love street food..."
}
```

### Expected Response
```json
{
  "weather": {
    "date": "2026-09-15",
    "condition": "Partly cloudy",
    "max_temp_c": 21,
    "min_temp_c": 11,
    "humidity": 80,
    "sunrise": "07:13 AM",
    "sunset": "07:47 PM"
  },
  "history": "Before visiting London...",
  "news": "- Breaking news item 1...",
  "songs": "1. Song - Artist\n2. Song - Artist...",
  "itinerary": "### Day 1..."
}
```

## Error Handling Strategy
1. **Network errors**: Show toast notification, fall back to mock data
2. **Invalid response**: Validate response structure, use defaults for missing fields
3. **Timeout**: Set 60-second timeout for long n8n processing

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/services/voyagerApi.ts` | Create | API service with n8n integration |
| `src/pages/Index.tsx` | Modify | Use API service instead of mock data |

## Important Notes

- **Test URL**: Using `https://natisolanog.app.n8n.cloud/webhook-test/voyager`
- **Test mode**: The n8n test webhook requires you to have the workflow open in n8n and click "Test workflow" for it to respond. For production, you'll switch to the production webhook URL.
- **No secrets needed**: Since this is a test URL and publicly accessible, we'll hardcode it initially. When moving to production, we can add it as a secure secret.

