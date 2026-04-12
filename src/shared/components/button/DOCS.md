# Button Component

## Overview

A versatile button component that supports text, images, icons, and custom children elements. Provides hover, click, and leave event handlers with optional image rendering using Next.js Image component.

## Location

```
src/shared/components/button/Button.tsx
```

## Usage

```tsx
import Button from "@/shared/components/button/Button";

// Basic button with text
<Button text="Click Me" onClick={() => console.log("Clicked")} />

// Button with image/icon
<Button img={iconSrc} alt="Menu icon" onClick={handleClick} />

// Button with both image and text
<Button 
  text="Submit" 
  img={submitIcon} 
  type="submit" 
  onClick={handleSubmit}
/>

// Button with custom children
<Button onClick={handleClick}>
  <CustomContent />
</Button>

// Disabled button
<Button text="Disabled" disabled />
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `text` | `string` | `undefined` | No | Button label text |
| `onClick` | `() => void` | `undefined` | No | Click event handler |
| `onHover` | `() => void` | `undefined` | No | Mouse enter event handler |
| `onLeave` | `() => void` | `undefined` | No | Mouse leave event handler |
| `disabled` | `boolean` | `false` | No | Disables the button when true |
| `className` | `string` | `undefined` | No | Additional CSS class names |
| `type` | `"button"` \| `"submit"` \| `"reset"` | `"button"` | No | HTML button type |
| `img` | `string` \| `any` | `undefined` | No | Image source (works with Next.js Image) |
| `children` | `React.ReactNode` | `undefined` | No | Custom content inside button |
| `alt` | `string` | `undefined` | No | Alt text for the image |
| `style` | `React.CSSProperties` | `undefined` | No | Inline styles |

## Features

- **Client Component**: Marked with `'use client'` directive for interactivity
- **Image Support**: Built-in Next.js Image integration with configurable dimensions (20x20)
- **Event Handlers**: Supports click, hover (mouse enter), and leave (mouse leave) events
- **Flexible Content**: Can render text, image, children, or any combination
- **Accessibility**: Supports standard HTML button attributes (type, disabled)
- **Customizable**: Accepts className and style props for custom styling

## Styling

Uses CSS Modules (`Button.module.scss`). The component applies:
- `styles.button` - Base button styles
- `styles.label` - Text label styles
- Custom `className` prop for additional styling
- Custom `style` prop for inline styles

## Implementation Details

```tsx
// Event handlers use optional chaining for safety
const onClickHandler = () => onClick?.()
const onMouseEnterHandler = () => onHover?.()
const onMouseLeaveHandler = () => onLeave?.()
```

## Examples

### Navigation Button
```tsx
<Button 
  img={calendarIcon}
  alt="calendar"
  className={styles.navButton}
  onHover={() => setHoveredItemId('calendar')}
  onLeave={() => setHoveredItemId(null)}
/>
```

### Submit Button
```tsx
<Button 
  text="Submit Form" 
  type="submit"
  onClick={handleSubmit}
/>
```

### Icon Button with Tooltip
```tsx
<Button 
  img={infoIcon}
  onHover={() => setShowTooltip(true)}
  onLeave={() => setShowTooltip(false)}
/>
```

## Best Practices

1. Always provide `alt` text when using images for accessibility
2. Use `type="submit"` for form submission buttons
3. Use `disabled` prop instead of conditional rendering for disabled states
4. Prefer `className` over `style` for reusable styles
5. Use meaningful `alt` descriptions for screen readers

## Related Components

- **Link**: For navigation links with typography
- **Typography**: For text content with consistent styling
- **Navigation**: Uses Button for navigation items
