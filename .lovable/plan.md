

# Fix Afternoon Label Overflow

## Problem

The "🌤️ Afternoon" label is wrapping to two lines because the container width (`w-24` = 96px) is too narrow for the longer word "Afternoon" compared to "Morning" and "Evening".

## Solution

Increase the width of the time period label containers from `w-24` (96px) to `w-28` (112px) to accommodate all labels on a single line.

## File to Update

**`src/components/tabs/DayByDayTab.tsx`** - Lines 36, 46, and 56

Change `w-24` to `w-28` for all three time period containers (Morning, Afternoon, Evening) to keep them consistent:

```text
// Before (Line 36, 46, 56)
<div className="w-24 shrink-0">

// After
<div className="w-28 shrink-0">
```

## Alternative Option

If you prefer even more room, `w-32` (128px) would provide additional breathing room for the labels.

