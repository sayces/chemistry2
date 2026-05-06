# Link Component

## Overview

A styled link component that wraps anchor tags with Typography for consistent text styling. Provides external link support with configurable security attributes.

## Location

```
src/shared/components/link/Link.tsx
```

## Usage

```tsx
import Link from "@/shared/components/link/Link";

// Basic internal link
<Link href="/about">About Page</Link>

// External link with target
<Link href="https://example.com" target="_blank" rel="noopener noreferrer">
  External Site
</Link>

// Download link
<Link href="/files/document.pdf" download>
  Download Document
</Link>

// With custom styling
<Link href="/contact" className={styles.customLink}>
  Contact Us
</Link>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `React.ReactNode` | - | **Yes** | Link text/content |
| `href` | `string` | - | **Yes** | URL the link points to |
| `target` | `"_blank"` \| `"_self"` \| `"_parent"` \| `"_top"` | `undefined` | No | Where to open the link |
| `rel` | `string` | `undefined` | No | Relationship attribute for security/SEO |
| `download` | `string` | `undefined` | No | Triggers file download (optional filename) |
| `className` | `string` | `undefined` | No | Additional CSS class names |

## Features

- **Typography Integration**: Automatically wraps content with `<Typography as="h1">` for consistent styling
- **External Link Support**: Full support for external URLs with `target` and `rel` attributes
- **Download Support**: Native HTML5 download attribute support
- **Flexible Content**: Can contain any React nodes as children
- **Customizable**: Accepts className for custom styling

## Styling

Uses CSS Modules (`Link.module.scss`). The component applies:
- `styles.link` - Base link styles
- Custom `className` prop for additional styling

Class names are merged using:
```tsx
const classNames = [className, styles.link].filter(Boolean).join(" ");
```

## Implementation Details

```tsx
// Uses native <a> tag (not Next.js Link)
<a
  href={href}
  target={target}
  rel={rel}
  download={download}
  className={classNames}
>
  <Typography as="h1">{children}</Typography>
</a>
```

### Typography Wrapper
All link content is automatically wrapped with Typography component using `as="h1"`, ensuring:
- Consistent font sizing across links
- Unified color theming
- Proper text rendering

## Security Best Practices

When using `target="_blank"`, always include `rel="noopener noreferrer"`:

```tsx
// ✅ Good
<Link href="https://example.com" target="_blank" rel="noopener noreferrer">
  External Site
</Link>

// ❌ Bad - security vulnerability
<Link href="https://example.com" target="_blank">
  External Site
</Link>
```

## Examples

### Navigation Link
```tsx
<Link href="/services">Our Services</Link>
```

### External Resource
```tsx
<Link 
  href="https://docs.example.com" 
  target="_blank" 
  rel="noopener noreferrer"
>
  View Documentation
</Link>
```

### File Download
```tsx
<Link href="/files/catalog.pdf" download="Chemistry-Catalog-2026.pdf">
  Download Catalog
</Link>
```

### Styled Link
```tsx
<Link href="/pricing" className={styles.primaryLink}>
  View Pricing
</Link>
```

## Differences from Next.js Link

This component uses a standard `<a>` tag instead of Next.js `<Link>`:
- **Pros**: Simpler implementation, full HTML anchor feature support
- **Cons**: No automatic client-side navigation optimization
- **Use Case**: Best for external links, downloads, or when Typography integration is needed

For internal navigation with client-side routing, consider using Next.js Link directly with Typography component.

## Related Components

- **Typography**: Used internally for text styling
- **Button**: Alternative interactive element (Button has onClick, Link has href)
- **Header**: Contains navigation that uses Button (not Link) for navigation items

## Best Practices

1. Always provide descriptive children for accessibility
2. Use `rel="noopener noreferrer"` with `target="_blank"`
3. Use meaningful `download` filenames for file links
4. Prefer this component for links that need Typography styling
5. Use Next.js `<Link>` for performance-critical internal navigation

## Accessibility

- Renders semantic `<a>` element
- Ensure children provide meaningful text for screen readers
- Consider adding `aria-label` for icon-only links (if needed in future)
