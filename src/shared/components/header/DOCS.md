# Header Component

## Overview

The main application header component that combines Logo and Navigation components. Provides consistent branding and navigation across all pages in the Chemistry application.

## Location

```
src/shared/components/header/Header.tsx
```

## Usage

```tsx
import Header from "@/shared/components/header/Header";

// Simple usage (no props required)
<Header />
```

## Props

This component does not accept any props. It is a stateless component that automatically renders the Logo and Navigation.

## Structure

The Header component is composed of:

```
Header
├── Logo (logo/Logo.tsx)
└── Navigation (navigation/Navigation.tsx)
```

## Features

- **Client Component**: Marked with `"use client"` for client-side interactivity
- **Consistent Layout**: Provides uniform header across all pages
- **Integrated Navigation**: Automatically includes the Navigation component with route-aware behavior
- **Dynamic Logo**: Logo component responds to current route and navigation state
- **Semantic HTML**: Uses `<header>` element for proper document structure

## Styling

Uses CSS Modules (`Header.module.scss`). The component applies:
- `styles.header` - Container styles for the header element

## Implementation Details

```tsx
const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <Navigation />
    </header>
  );
};
```

## Layout Integration

The Header is typically used in page layouts:

```tsx
// Example page layout
const PageLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
};
```

## Related Routes

The Header appears on all routes:
- `/` - Home page
- `/calendar` - Calendar page
- `/map` - Map page
- `/gallery` - Gallery page
- `/profile` - Profile page

## Related Components

- **Logo**: Renders the "Chemistry" brand with route-aware coloring
- **Navigation**: Renders navigation buttons with icons for different sections
- **Main**: Semantic main content wrapper (often used together with Header)

## Architecture Notes

The Header is a **composite component** that orchestrates sub-components:
- Delegates branding to `Logo` component
- Delegates navigation to `Navigation` component
- Uses Zustand store (`useNavigationStore`) indirectly through child components for state management
- Responds to route changes via `usePathname` hook in child components

## Best Practices

1. Use Header at the top of every page layout
2. Do not wrap Header in additional containers unless necessary
3. Header styles should be defined in `Header.module.scss`
4. For custom headers, create a separate component instead of modifying this one

## Customization

To customize the header appearance:
- Edit `src/shared/components/header/Header.module.scss`
- Modify the structure by creating a variant component (e.g., `HeaderCustom.tsx`)

## Future Enhancements

Potential improvements:
- Add sticky header functionality
- Add search bar integration
- Add user profile dropdown
