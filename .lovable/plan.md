
# Fix: Webhook Data Mapping Issue

## Problem Identified
The n8n webhook is now returning data in a **newer format** where `city` and `country` are nested inside a `destination` object, but the application's validation and transformation logic still expects them at the root level.

### Current webhook formats being returned:

**Old format (Mexico City):**
```json
{
  "city": "Mexico City",
  "country": "Mexico",
  "temperature": "...",
  "packing": "markdown...",
  ...
}
```

**New format (Rome):**
```json
{
  "trip_id": "trip_xxx",
  "destination": {
    "city": "Rome",
    "country": "Italy",
    "duration": 3,
    "month": "May"
  },
  "overview": { ... },
  "itinerary": [ ... ],
  "playlist": []
}
```

### Why you're seeing template data:
1. The `validateResponse()` function checks for `item.city` and `item.country` at the root level
2. In the new format, these are inside `destination`, so validation **fails**
3. When validation fails, the app throws an error and uses fallback/template data

---

## Solution

Update `src/services/voyagerApi.ts` to handle both response structures:

### 1. Update the interface to include the new format fields
Add optional `trip_id` and `destination` fields to support the newer structure.

### 2. Fix the validation function
Make it flexible to accept either:
- `city`/`country` at root level, OR
- `city`/`country` inside `destination` object

### 3. Update the transform function
Extract `city` and `country` from whichever location they exist (root or `destination`).

---

## Technical Details

### Interface Changes
```text
interface N8nWebhookItem {
  // New format fields
  trip_id?: string;
  destination?: {
    city: string;
    country: string;
    duration?: number;
    month?: string;
  };
  // Old format fields (keep for backward compatibility)
  city?: string;
  country?: string;
  ...
}
```

### Validation Changes
```text
function validateResponse(data: unknown): data is N8nWebhookResponse {
  if (!Array.isArray(data) || data.length === 0) return false;
  const item = data[0] as Record<string, unknown>;
  
  // Check for city/country at root OR inside destination
  const hasRootLocation = typeof item.city === 'string' && typeof item.country === 'string';
  const hasDestination = item.destination && 
    typeof (item.destination as any).city === 'string' &&
    typeof (item.destination as any).country === 'string';
  
  return (hasRootLocation || hasDestination) && Array.isArray(item.itinerary);
}
```

### Transform Changes
Extract city/country from the correct location:
```text
const city = webhookData.city || webhookData.destination?.city || details.city;
const country = webhookData.country || webhookData.destination?.country || details.country;
```

---

## Files to Modify

| File | Change |
|------|--------|
| `src/services/voyagerApi.ts` | Update interface, validation, and transform logic |

---

## Expected Outcome
After this fix:
- The Overview tab will show the actual historical context and news from the webhook
- The packing list will display real weather data (temp_min, temp_max, humidity, etc.)
- Both old and new webhook formats will continue to work
