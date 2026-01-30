

# Simplify API Service for New Webhook Format Only

## Current Situation

The `voyagerApi.ts` file currently has hybrid support for both old (markdown strings) and new (structured objects) webhook formats. This includes:
- Multiple parsing functions for markdown strings
- Conditional logic to detect format type
- Legacy fields in the interface

## New Webhook Format (Final)

```text
{
  "trip_id": "trip_xxx",
  "destination": {
    "city": "Rome",
    "country": "Italy", 
    "duration": 3,
    "month": "May"
  },
  "overview": {
    "packing": {
      "weather": { condition, temp_min, temp_max, humidity, sunrise, sunset },
      "items": [...]
    },
    "historical_context": "...",
    "current_news": [...]
  },
  "itinerary": [...],
  "playlist": [
    { "title": "O sole mio", "artist": "Traditional (Pavarotti, Caruso)" },
    ...
  ]
}
```

## Changes to Make

### File: `src/services/voyagerApi.ts`

| Section | Action |
|---------|--------|
| **Interface** | Remove all legacy fields (`city`, `country`, `temperature`, `packing` string, `history`, `news`, `songs`). Keep only new format fields. |
| **Parsing functions** | Delete `parsePackingItems()`, `parseNewsItems()`, `parseSongs()` - approximately 60 lines of code |
| **Validation** | Simplify to check only for `destination` object and `overview` object |
| **Transform** | Remove all format detection and fallback logic. Direct mapping only. |

### Simplified Interface

```text
interface N8nWebhookItem {
  trip_id: string;
  destination: {
    city: string;
    country: string;
    duration: number;
    month: string;
  };
  overview: OverviewData;
  itinerary: DayItinerary[];
  playlist: PlaylistSong[];
}
```

### Simplified Validation

```text
function validateResponse(data: unknown): data is N8nWebhookResponse {
  if (!Array.isArray(data) || data.length === 0) return false;
  const item = data[0] as Record<string, unknown>;
  
  const destination = item.destination as Record<string, unknown> | undefined;
  
  return Boolean(
    destination &&
    typeof destination.city === 'string' &&
    typeof destination.country === 'string' &&
    item.overview &&
    Array.isArray(item.itinerary)
  );
}
```

### Simplified Transform

```text
function transformResponse(webhookData: N8nWebhookItem, details: TripDetails): ItineraryData {
  const { destination, overview, itinerary, playlist } = webhookData;
  
  return {
    overview,
    itinerary,
    playlist: playlist || [],
    chat: {
      initial_message: `Hi! I'm your Voyager assistant. I've prepared a ${destination.duration}-day itinerary for your trip to ${destination.city}. Feel free to ask me anything about your trip!`,
      context: {
        city: destination.city,
        country: destination.country,
        days: destination.duration,
        month: destination.month,
      },
    },
  };
}
```

## Code to Remove

- Lines 46-64: `parsePackingItems()` function
- Lines 66-84: `parseNewsItems()` function  
- Lines 86-109: `parseSongs()` function
- Lines 130-167: Old format handling in `transformResponse()`
- Lines 171-178: Old format playlist handling

## Expected Outcome

- Clean, maintainable code with ~70 fewer lines
- Direct 1:1 mapping between webhook and internal types
- No regex parsing overhead
- Playlist displays correctly with structured data from webhook

