

# Update for Simplified Webhook Format

## What Changed

The n8n webhook no longer returns `historical_context` in the overview. The new structure is:

```text
overview: {
  packing: { weather: {...}, items: [...] },
  current_news: [...]
}
```

## Files to Update

| File | Change |
|------|--------|
| `src/types/voyager.ts` | Make `historical_context` optional in `OverviewData` |
| `src/components/tabs/OverviewTab.tsx` | Conditionally render the Historical Context card only when data exists |
| `src/services/voyagerApi.ts` | Remove `historical_context` from the fallback function |

## Detailed Changes

### 1. Update Type Definition

**File:** `src/types/voyager.ts`

Change `historical_context` from required to optional:

```text
export interface OverviewData {
  packing: PackingData;
  historical_context?: string;  // Now optional
  current_news: string[];
}
```

### 2. Update Overview UI Component

**File:** `src/components/tabs/OverviewTab.tsx`

Only render the Historical Context card when the field exists:

```text
{/* History Card - only show if historical_context exists */}
{historical_context && (
  <motion.div ...>
    <div className="flex items-center gap-3 mb-4">
      <span className="text-3xl">🏛️</span>
      <h3 className="text-xl font-black uppercase">Historical Context</h3>
    </div>
    <p className="text-muted-foreground leading-relaxed">{historical_context}</p>
  </motion.div>
)}
```

Also update the grid layout so the News card spans full width when there's no History card.

### 3. Update Fallback Function

**File:** `src/services/voyagerApi.ts`

Remove `historical_context` from the `getFallbackItinerary()` function to match the new format.

## Layout Adjustment

When `historical_context` is missing:
- The Packing card will be on the left
- The News card will span the full width below it

This keeps the UI clean without an empty card.

