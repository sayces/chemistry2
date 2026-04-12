# Main Component

## Overview

A semantic wrapper component for the main content area of the page. Provides consistent styling and structure for primary page content.

## Location

```
src/shared/components/main/Main.tsx
```

## Usage

```tsx
import Main from "@/shared/components/main/Main";

// Basic usage
<Main>
  <h1>Page Content</h1>
  <p>Main content goes here...</p>
</Main>

// With custom content
<Main>
  <ArticleList />
  <Sidebar />
</Main>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `React.ReactNode` | - | **Yes** | Main page content |

## Features

- **Semantic HTML**: Uses `<main>` element for proper document structure
- **Consistent Styling**: Applies uniform styling across all pages
- **Simple API**: Single prop interface (children only)
- **Accessibility**: Proper ARIA landmark when styled appropriately

## Styling

Uses CSS Modules (`Main.module.scss`). The component applies:
- `styles.main` - Main container styles

## Implementation Details

```tsx
const Main = ({ children }: MainProps) => {
  return <main className={styles.main}>{children}</main>;
};
```

## Layout Integration

The Main component is typically used in page layouts alongside Header:

```tsx
// Example page layout
import Header from "@/shared/components/header/Header";
import Main from "@/shared/components/main/Main";

const PageLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
};
```

### Real Example from Project

```tsx
// src/pages/map/layout.tsx
import Header from "@/shared/components/header/Header";
import Main from "@/shared/components/main/Main";

export default function MapLayout({ children }) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
}
```

## HTML Semantics

The `<main>` element:
- Represents the dominant content of the document
- Should be unique to the document (no duplicates)
- Excludes headers, footers, navigation, sidebars
- Provides accessibility landmark for main content

## Content Guidelines

**Appropriate content for Main:**
- Page-specific components
- Article content
- Forms
- Data displays
- Interactive elements

**Inappropriate content for Main:**
- Navigation bars (use Header/Nav)
- Sidebars (create separate component)
- Footer content
- Repeated elements across pages

## Examples

### Simple Content
```tsx
<Main>
  <Typography as="h1" size="30">Welcome</Typography>
  <p>This is the main content area.</p>
</Main>
```

### Complex Layout
```tsx
<Main>
  <Section>
    <ArticleCard />
    <ArticleCard />
    <ArticleCard />
  </Section>
  <Footer />
</Main>
```

### With Interactive Elements
```tsx
<Main>
  <Columns />
  <DataVisualization />
  <ActionButtons />
</Main>
```

## Styling Customization

To modify Main component styling:

1. **Edit CSS Module**: `src/shared/components/main/Main.module.scss`
2. **Add variants**: Create `MainVariant.tsx` for different styles
3. **Extend props**: Add className prop if needed (not currently supported)

## Best Practices

1. Use Main once per page layout
2. Place Main after Header in DOM order
3. Put page-specific content inside Main
4. Don't use Main for repeated elements (nav, footer)
5. Keep Main styling consistent across pages

## Accessibility

- The `<main>` element creates an ARIA landmark
- Users can navigate to main content via screen readers
- Ensure sufficient contrast for content inside Main
- Consider skip-to-main links for keyboard navigation

## Related Components

- **Header**: Navigation and branding (used before Main)
- **Typography**: Text styling for content inside Main
- **Columns**: Interactive columns (can be rendered inside Main)

## Architecture Notes

This is a **presentational component** that:
- Has no internal state
- Accepts only children prop
- Provides consistent styling
- Enforces semantic HTML structure

The simplicity makes it easy to maintain and understand.
