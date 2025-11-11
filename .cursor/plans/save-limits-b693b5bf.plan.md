<!-- b693b5bf-34c4-41fc-85f7-eafef16232c5 57044cf4-d4ce-4fa3-8c68-685016deca52 -->
# Progressive Disclosure UX Implementation

## Overview

Implement a clean, progressive disclosure UI that separates free and premium features clearly, with different experiences for non-subscribers vs subscribers.

## Design Principles

1. **Free features always visible** - Save/Load Config JSON (no subscription needed)
2. **Premium features clearly marked** - Show with lock icons for non-subscribers
3. **Different layouts** - Non-subscribers see upgrade prompts, subscribers see clean tools
4. **Single source of truth** - One clear "Subscribe" CTA, not multiple confusing messages

---

## Component Changes

### 1. Create New ActionMenu Component

**File:** `src/components/ActionMenu.tsx` (NEW)

Create a dropdown menu component that shows different options based on subscription status.

**Non-Subscriber Menu:**

- ✓ Save Config (JSON) - Free
- ✓ Load Config - Free
- 🔒 Save to Account - Shows "Subscribe Required"
- 🔒 Export PNG - Shows "Subscribe Required"

**Subscriber Menu:**

- Export PNG
- Save Config (JSON)
- Load Config

Use a library like Headless UI or build custom dropdown with proper accessibility.

### 2. Update WallpaperCreator Top Bar

**File:** `src/components/WallpaperCreator.tsx`

**Non-Subscriber View:**

```
Left: ← Back | Design Name (editable)
Right: [Actions ▼] dropdown button
```

Remove the "Save" button, replace with dropdown that contains all actions.

**Subscriber View:**

```
Left: ← Back | Design Name (editable)
Right: [3/10 designs] | Auto-saved 2:30 PM (status text, no button)
```

Auto-save handles saving automatically, no manual save button needed.

### 3. Update Bottom Export Bar

**File:** `src/components/ExportBar.tsx`

**Non-Subscriber View:**

```
Left: [Continue Editing] (secondary button, just closes any modals)
Right: [⭐ Subscribe - $3.95/mo] (prominent primary button)
```

Remove Download, Save Config, Load Config buttons - they're in the dropdown now.

**Subscriber View:**

```
Center: [Download PNG] (large primary button)
Right: (Actions dropdown moved to top, so nothing here OR small settings icon)
```

Clean, focused on the main action: downloading the wallpaper.

### 4. Enhance UpgradeModal

**File:** `src/components/UpgradeModal.tsx`

Update modal to show which feature triggered it:

- "Save to Account requires subscription"
- "Export PNG requires subscription"

Include benefits list and clear upgrade CTA.

---

## Implementation Steps

### Step 1: Create ActionMenu Component

Create `src/components/ActionMenu.tsx`:

**Props:**

- `isSubscribed: boolean`
- `onSaveToAccount: () => void` (triggers save or upgrade modal)
- `onExportPNG: () => void` (triggers export or upgrade modal)
- `onSaveConfig: () => void` (always works)
- `onLoadConfig: () => void` (always works)
- `canExport: boolean` (design is complete)

**Features:**

- Dropdown using Headless UI or custom implementation
- Lock icons for premium features when not subscribed
- Tooltips explaining each action
- Click handlers that show upgrade modal for non-subscribers

### Step 2: Refactor WallpaperCreator Top Bar

**Changes to `WallpaperCreator.tsx`:**

1. Remove manual save button completely
2. For non-subscribers: Add ActionMenu dropdown on right
3. For subscribers: Show design count + auto-save status (no button)
4. Update auto-save to be more visible/reliable for subscribers
5. Pass upgrade modal state and handlers to ActionMenu

### Step 3: Simplify ExportBar

**Changes to `ExportBar.tsx`:**

1. Remove Save/Load Config buttons (moved to ActionMenu)
2. For non-subscribers: Show "Subscribe - $3.95/mo" button
3. For subscribers: Show only "Download PNG" button
4. Remove all the confusing conditional text
5. Accept `isSubscribed` as prop from parent

### Step 4: Update WallpaperCreator Layout

**Changes to `WallpaperCreator.tsx`:**

1. Pass `isSubscribed` prop to ExportBar
2. Integrate ActionMenu into top bar
3. Update upgrade modal to accept context (which feature triggered it)
4. Ensure all handlers properly route through subscription checks

### Step 5: Visual Polish

**UI Improvements:**

- Lock icons (🔒) for premium features
- Checkmarks (✓) for free features  
- Subtle background colors to group free vs premium
- Clear "Requires Subscription" badges
- Tooltips explaining each feature

---

## File Structure

**New files:**

- `src/components/ActionMenu.tsx`

**Modified files:**

- `src/components/WallpaperCreator.tsx`
- `src/components/ExportBar.tsx`
- `src/components/UpgradeModal.tsx` (optional enhancement)

---

## User Flows

### Non-Subscriber Flow:

1. User enters `/create`
2. Top right shows [Actions ▼] dropdown
3. Clicking dropdown shows:

   - Save Config (free) ✓
   - Load Config (free) ✓
   - Save to Account 🔒
   - Export PNG 🔒

4. Clicking locked features shows upgrade modal
5. Bottom shows "Subscribe - $3.95/mo" button
6. Free features work without restriction

### Subscriber Flow:

1. User enters `/create`
2. Top right shows "3/10 designs | Auto-saved 2:30 PM"
3. Design auto-saves every 30 seconds
4. Bottom shows "Download PNG" button
5. Optional: Actions menu in top bar for Config save/load
6. All features work seamlessly

---

## Key Design Decisions

1. **Remove manual save button for subscribers** - Auto-save is sufficient
2. **Consolidate actions in dropdown** - Reduces clutter
3. **Clear premium markers** - Lock icons make it obvious
4. **Single upgrade CTA** - "Subscribe" button, not multiple messages
5. **Free features always accessible** - Save/Load Config don't require subscription

---

## Testing Checklist

- [ ] Non-subscriber can save/load config JSON
- [ ] Non-subscriber sees upgrade modal for premium features
- [ ] Subscriber sees auto-save status
- [ ] Subscriber can download PNG
- [ ] Subscriber can save/load config
- [ ] Design count displays correctly
- [ ] Upgrade modal shows correct context
- [ ] All buttons have proper disabled states

### To-dos

- [ ] Create ActionMenu dropdown component with free/premium feature separation
- [ ] Refactor WallpaperCreator top bar to use ActionMenu for non-subscribers, status display for subscribers
- [ ] Simplify ExportBar to show only primary CTA based on subscription status
- [ ] Enhance UpgradeModal to show context of which feature triggered it
- [ ] Add lock icons, tooltips, and visual indicators for free vs premium features