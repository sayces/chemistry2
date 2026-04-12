# Columns Component

## Overview

An interactive container that renders a series of Column components with route-aware active state management. Responds to navigation changes and hover states to provide visual feedback through animated column backgrounds.

## Location

```
src/shared/components/interactiveColumns/Columns.tsx
```

## Usage

```tsx
import Columns from "@/shared/components/interactiveColumns/Columns";

// Simple usage (no props required)
<Columns />

// In page layout
const HomeLayout = () => {
  return (
    <>
      <Header />
      <Columns />
      <HomePage />
    </>
  );
};
```

## Props

This component does not accept any props. It is a stateful component that automatically manages column states based on navigation.

## Structure

The Columns component manages multiple Column instances:

```
Columns
└── Column[] (one for each nav item)
    ├── calendar column
    ├── map column
    ├── gallery column
    └── profile column
```

## Features

- **Client Component**: Marked with `"use client"` for client-side state management
- **Route-Aware**: Automatically detects current page from URL pathname
- **Hover Integration**: Responds to hover states from Navigation component
- **Animation State**: Tracks active and previous states for smooth transitions
- **Zustand Integration**: Uses `useNavigationStore` for global state management
- **Dynamic Styling**: Applies color-specific CSS classes based on active item

## State Management

The component integrates with Zustand store:

```tsx
const { hoveredItemId, previousActiveItemId, setCurrentActiveItemId } = useNavigationStore();
```

### State Flow

1. **Hover**: `setHoveredItemId()` → Columns highlights column
2. **Navigate**: `pathname` changes → Columns updates active column
3. **Track**: `setCurrentActiveItemId()` → Enables revert animation
4. **Revert**: Previous column animates back to idle state

## Implementation Details

### Active Column Detection

```tsx
const getActiveColumnIndex = (): number => {
  // Priority 1: Current pathname
  const pageIndex = navItems.findIndex((item) => item.href === pathname);
  if (pageIndex !== -1) return pageIndex;

  // Priority 2: Hovered item
  if (hoveredItemId) {
    return navItems.findIndex((item) => item.id === hoveredItemId);
  }

  // Default: No active column
  return -1;
};
```

### Active Color Mapping

Maps navigation item IDs to CSS module classes:

```tsx
const activeColorMap: Record<string, string> = {
  calendar: styles.calendarBg,
  map: styles.mapBg,
  gallery: styles.galleryBg,
  profile: styles.profileBg,
};
```

### State Synchronization

```tsx
useEffect(() => {
  // Track current active item to enable revert animation
  if (currentActiveIndex !== -1) {
    const currentItem = navItems[currentActiveIndex];
    setCurrentActiveItemId(currentItem.id);
  }
}, [pathname, currentActiveIndex]);
```

## Styling

Uses CSS Modules from two files:
- `Columns.module.scss` (imported as `containerStyles`)
  - `containerStyles.columnsContainer` - Outer container
  - `containerStyles.columnsInner` - Inner flex container
- `Column.module.scss` (imported as `styles`)
  - Background color classes: `styles.calendarBg`, `styles.mapBg`, etc.

## Navigation Items

Automatically renders columns based on `navItems` from store:

```tsx
export const navItems: NavItemConfig[] = [
  { id: "calendar", href: "/calendar", hoverColor: "calendarBg" },
  { id: "map", href: "/map", hoverColor: "mapBg" },
  { id: "gallery", href: "/gallery", hoverColor: "galleryBg" },
  { id: "profile", href: "/profile", hoverColor: "profileBg" },
];
```

## Column States

Each Column component can be in one of three states:

| State | Trigger | Visual Effect |
|-------|---------|---------------|
| `idle` | Default | No background |
| `active` | Current route or hovered | Colored background |
| `reverting` | Was active, now inactive | Animated transition back to idle |

## Examples

### Home Page Layout
```tsx
// src/pages/layout.tsx
import Columns from "@/shared/components/interactiveColumns/Columns";

export default function HomeLayout({ children }) {
  return (
    <>
      <Header />
      <Columns />
      <HomePage />
    </>
  );
}
```

### With Navigation Hover
```tsx
// User hovers navigation item
// Columns automatically highlights corresponding column
<Navigation /> // Triggers setHoveredItemId()
<Columns />    // Responds to hoveredItemId
```

## Integration with Navigation

The Columns component works in tandem with Navigation:

```
Navigation (hover/click)
    ↓
useNavigationStore (state update)
    ↓
Columns (reads state)
    ↓
Column (visual feedback)
```

## Animation Behavior

### Route Change
```
/calendar → /map
1. Map column becomes active (active state)
2. Calendar column enters reverting state
3. Calendar column returns to idle after 500ms
```

### Hover Interaction
```
Hover "gallery" in Navigation
1. hoveredItemId = "gallery"
2. Gallery column becomes active
3. Previous active column starts reverting
```

## Best Practices

1. Use Columns in layouts where navigation visualization is needed
2. Pair with Header and Navigation components for full interactivity
3. Do not wrap in additional containers unless necessary
4. Ensure Zustand store is properly initialized
5. Test animations across different browsers

## Related Components

- **Column**: Individual column element managed by Columns
- **Navigation**: Triggers hover states that Columns responds to
- **useNavigationStore**: Global state manager for navigation state

## Architecture Notes

This is a **container component** that:
- Manages multiple child Column components
- Integrates with global state (Zustand)
- Responds to route changes (Next.js navigation)
- Coordinates animation states across columns

The component is responsible for **orchestration** while Column handles **rendering**.

## Customization

To customize Columns:

### Add New Column
```tsx
// 1. Add to navItems in useNavigationStore.ts
{ id: "settings", href: "/settings", hoverColor: "settingsBg" }

// 2. Add color to activeColorMap
settings: styles.settingsBg

// 3. Add CSS in Column.module.scss
.settingsBg {
  background-color: your-color;
}
```

### Change Animation Timing
```tsx
// In Column.tsx, modify timeout
const revertTimer = setTimeout(() => {
  setAnimationState("idle");
}, 500); // Change this value
```

## Performance Considerations

- Re-renders on every route change and hover event
- Uses `useEffect` for state synchronization
- Each Column manages its own animation state
- CSS transitions handle animation (GPU-accelerated)

## Future Enhancements

Potential improvements:
- Add custom column ordering
- Support column click handlers
- Add column count prop
- Enable/disable specific columns
- Add transition duration customization
