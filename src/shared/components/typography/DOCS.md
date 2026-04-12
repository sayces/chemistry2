# Typography Component

## Overview

A flexible, type-safe typography component that provides consistent text styling across the application. Supports multiple HTML elements, sizes, and color themes through a polymorphic component pattern.

## Location

```
src/shared/components/typography/Typography.tsx
```

## Usage

```tsx
import Typography from "@/shared/components/typography/Typography";

// Basic paragraph
<Typography>Hello World</Typography>

// Heading with specific size
<Typography as="h1" size="30">Main Heading</Typography>

// Colored text
<Typography color="toxic">Highlighted text</Typography>

// Custom element with size
<Typography as="strong" size="20" color="black">
  Important text
</Typography>

// With custom className
<Typography className={styles.customText}>
  Custom styled text
</Typography>

// With HTML attributes
<Typography as="label" htmlFor="input-id">
  Form Label
</Typography>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `as` | `ElementType` | `"p"` | No | HTML element to render (h1-h6, p, span, strong, em, label, etc.) |
| `children` | `ReactNode` | `undefined` | No | Text content or nested elements |
| `className` | `string` | `undefined` | No | Additional CSS class names |
| `size` | `"04"` \| `"08"` \| `"10"` \| `"16"` \| `"20"` \| `"26"` \| `"30"` | `undefined` | No | Predefined font size variant |
| `color` | `"toxic"` \| `"white"` \| `"black"` | `undefined` | No | Color theme variant |
| `style` | `React.CSSProperties` | `undefined` | No | Inline styles |
| `...rest` | Component props | - | No | All props of the rendered element (type-safe) |

## Size Variants

| Size | Usage | Typical Use Case |
|------|-------|------------------|
| `"04"` | `size="04"` | Smallest text, captions |
| `"08"` | `size="08"` | Small text, annotations |
| `"10"` | `size="10"` | Secondary text |
| `"16"` | `size="16"` | Body text, paragraphs |
| `"20"` | `size="20"` | Subheadings |
| `"26"` | `size="26"` | Section headings |
| `"30"` | `size="30"` | Page titles, hero headings |

## Color Variants

| Color | Usage | Description |
|-------|-------|-------------|
| `"toxic"` | `color="toxic"` | Accent/highlight color |
| `"white"` | `color="white"` | White text (dark backgrounds) |
| `"black"` | `color="black"` | Black text (light backgrounds) |

## Features

- **Polymorphic Component**: Dynamically renders different HTML elements while maintaining type safety
- **Type Safety**: Full TypeScript support with generic types
- **Size System**: Predefined scale for consistent typography
- **Color Themes**: Semantic color variants
- **Flexible**: Supports any HTML element with proper typing
- **Extensible**: Easy to add new sizes, colors, or variants

## Styling

Uses CSS Modules (`Typography.module.scss`). The component applies:
- `styles.typography` - Base typography styles
- `styles.size-{size}` - Size-specific styles (e.g., `styles.size-30`)
- `styles.color-{color}` - Color-specific styles (e.g., `styles.color-toxic`)

Class names are conditionally merged:
```tsx
const classNames = [
  styles.typography,
  size && styles[`size-${size}`],
  color && styles[`color-${color}`],
  className,
]
  .filter(Boolean)
  .join(" ");
```

## Implementation Details

### Polymorphic Pattern
```tsx
const Typography = <E extends ElementType = "p">(props: TypographyProps<E>) => {
  const { as: Component = "p", children, ...rest } = props;
  
  return <Component className={classNames} {...rest}>
    {children}
  </Component>;
};
```

This pattern:
- Uses generic type `E` for element type
- Defaults to `"p"` element
- Preserves type safety for element-specific props
- Allows HTML attribute inference (e.g., `htmlFor` for label)

### Type Definitions

```tsx
type Size = "04" | "08" | "10" | "16" | "20" | "26" | "30";
type Color = "toxic" | "white" | "black";

interface TypographyOwnProps<E extends ElementType = "p"> {
  as?: E;
  children?: ReactNode;
  className?: string;
  size?: Size;
  color?: Color;
}

type TypographyProps<E extends ElementType> = TypographyOwnProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof TypographyOwnProps<E>>;
```

## Examples

### Page Title
```tsx
<Typography as="h1" size="30" color="toxic">
  Chemistry
</Typography>
```

### Section Heading
```tsx
<Typography as="h2" size="26">
  Our Services
</Typography>
```

### Body Text
```tsx
<Typography as="p" size="16">
  This is the main content paragraph.
</Typography>
```

### Form Label
```tsx
<Typography as="label" size="16" htmlFor="email-input">
  Email Address
</Typography>
```

### Highlighted Text
```tsx
<Typography as="strong" size="20" color="toxic">
  Important Notice
</Typography>
```

### Caption
```tsx
<Typography as="span" size="08" color="white">
  Last updated: April 2026
</Typography>
```

## Usage in Project

### Logo Component
```tsx
// src/shared/components/header/logo/Logo.tsx
<Typography as="h1" size="30" className={logoClassName}>
  Chemistry
</Typography>
```

### Link Component
```tsx
// src/shared/components/link/Link.tsx
<a href={href} className={classNames}>
  <Typography as="h1">{children}</Typography>
</a>
```

## Extending Typography

To add new variants:

### 1. Add New Size
```tsx
// Update type
type Size = "04" | "08" | "10" | "16" | "20" | "26" | "30" | "40";

// Add CSS in Typography.module.scss
.size-40 {
  font-size: 40px;
  line-height: 1.2;
}
```

### 2. Add New Color
```tsx
// Update type
type Color = "toxic" | "white" | "black" | "gray";

// Add CSS in Typography.module.scss
.color-gray {
  color: #666;
}
```

## Best Practices

1. **Use semantic elements**: `as="h1"` for headings, `as="p"` for paragraphs
2. **Stick to size scale**: Use predefined sizes instead of custom font-size
3. **Use color variants**: Prefer color prop over custom color styles
4. **Maintain hierarchy**: Use appropriate heading levels (h1 → h2 → h3)
5. **Accessibility**: Ensure sufficient color contrast with background
6. **Consistency**: Use Typography for all text content

## Common Patterns

### Heading Hierarchy
```tsx
<Typography as="h1" size="30">Page Title</Typography>
<Typography as="h2" size="26">Section</Typography>
<Typography as="h3" size="20">Subsection</Typography>
<Typography as="p" size="16">Content</Typography>
```

### Emphasis
```tsx
<Typography as="em" size="16">
  Emphasized text
</Typography>

<Typography as="strong" size="16" color="toxic">
  Strong emphasis with color
</Typography>
```

## Accessibility

- Uses semantic HTML elements based on `as` prop
- Headings maintain document outline
- Color variants should meet WCAG contrast ratios
- Screen readers interpret elements correctly (h1, p, strong, etc.)

## Related Components

- **Link**: Wraps content with Typography automatically
- **Logo**: Uses Typography for brand rendering
- **Button**: Contains Typography for label styling

## Performance Notes

- Lightweight component with minimal overhead
- CSS Modules enable efficient class name generation
- No runtime calculations, pure rendering
- Type checking at compile time only
