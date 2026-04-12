# Component Standards & Conventions

## Overview

This document defines the standards, conventions, and best practices for creating and maintaining reusable components in the Chemistry2 project. All team members should follow these guidelines to ensure consistency, maintainability, and quality across the codebase.

## Table of Contents

1. [Architecture](#architecture)
2. [File Structure](#file-structure)
3. [Component Types](#component-types)
4. [Naming Conventions](#naming-conventions)
5. [Props Interface](#props-interface)
6. [TypeScript Standards](#typescript-standards)
7. [Styling Standards](#styling-standards)
8. [Client vs Server Components](#client-vs-server-components)
9. [Component API Design](#component-api-design)
10. [Documentation Standards](#documentation-standards)
11. [Code Organization](#code-organization)
12. [Accessibility Standards](#accessibility-standards)
13. [Performance Guidelines](#performance-guidelines)
14. [Testing Guidelines](#testing-guidelines)
15. [Review Checklist](#review-checklist)

---

## Architecture

### Feature-Sliced Design (FSD)

Components follow a layered architecture inspired by Feature-Sliced Design:

```
src/
├── shared/           # Reusable primitives
│   └── components/   # UI components (Button, Typography, etc.)
├── widgets/          # Composite components (NavigationColumns)
├── pages/            # Page-level components
└── app/              # Next.js App Router
```

### Dependency Flow

```
App → Pages → Widgets → Shared Components
```

**Rules:**
- Lower layers **cannot** import from higher layers
- Shared components must be framework-agnostic
- Each layer can only depend on layers below it

---

## File Structure

### Component Folder Pattern

Each component should have its own folder with the following structure:

```
src/shared/components/ComponentName/
├── ComponentName.tsx          # Component implementation
├── ComponentName.module.scss  # Component styles
├── DOCUMENTATION.md           # Component documentation
└── index.ts                   # Re-export (optional)
```

### Example

```
src/shared/components/button/
├── Button.tsx
├── Button.module.scss
├── DOCUMENTATION.md
└── index.ts
```

### Index File

When a folder contains multiple related components, use `index.ts` for clean exports:

```tsx
// src/shared/components/header/index.ts
export { default as Header } from './Header';
export { default as Logo } from './logo/Logo';
export { default as Navigation } from './navigation/Navigation';
```

---

## Component Types

### 1. Presentational Components

Pure components that only handle rendering and styling.

**Example:**
```tsx
const Main = ({ children }: MainProps) => {
  return <main className={styles.main}>{children}</main>;
};
```

**Characteristics:**
- No internal state
- Props-only interface
- Consistent output for given input
- Easy to test and reuse

### 2. Container Components

Components that manage state, orchestrate children, or integrate with stores.

**Example:**
```tsx
const Columns = () => {
  const { hoveredItemId } = useNavigationStore();
  // State management and orchestration
  return <div>{/* columns */}</div>;
};
```

**Characteristics:**
- Manages state or side effects
- Integrates with stores (Zustand)
- Responds to route changes
- Coordinates multiple child components

### 3. Composite Components

Components that compose other components together.

**Example:**
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

**Characteristics:**
- Combines multiple components
- Defines layout structure
- May not have its own styles
- Delegates behavior to children

---

## Naming Conventions

### Component Files

- **PascalCase**: `Button.tsx`, `Typography.tsx`
- **Match component name**: File name = Component name
- **Singular nouns**: `Button` not `Buttons`

### Component Folders

- **camelCase**: `button/`, `typography/`, `interactiveColumns/`
- **Descriptive**: Name should indicate purpose
- **Avoid generic names**: Not `common/`, `utils/`

### Props Interface

```tsx
// ✅ Good
interface ButtonProps {
  text?: string;
  onClick?: () => void;
}

// ✅ Good - extending HTML props
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

// ❌ Bad - suffix "Interface"
interface ButtonPropsInterface { }

// ❌ Bad - unclear name
interface Props { }
interface Config { }
```

### CSS Module Classes

- **camelCase**: `navButton`, `logoContainer`
- **BEM-inspired**: Use descriptive, scoped names
- **State classes**: `active`, `disabled`, `hovered`

```scss
// ✅ Good
.button { }
.navButton { }
.active { }
.calendarBg { }

// ❌ Bad - too generic
.container { }  // Might conflict
.wrapper { }    // Might conflict
```

---

## Props Interface

### Required vs Optional

```tsx
interface LinkProps {
  children: React.ReactNode;        // Required (no ?)
  href: string;                      // Required
  target?: "_blank" | "_self";      // Optional
  className?: string;                // Optional
}
```

### Prop Order

1. Content props (`children`, `text`, `title`)
2. Action props (`onClick`, `onHover`, `onChange`)
3. Configuration props (`disabled`, `type`, `size`)
4. Styling props (`className`, `style`)
5. HTML props (`href`, `id`, `aria-*`)

### Boolean Props

- Default to `false` when possible
- Use positive names: `disabled`, `active`, `visible`
- Avoid negations: Not `notVisible`, use `hidden`

```tsx
interface ColumnProps {
  isActive?: boolean;        // ✅ Good
  isPreviousActive?: boolean; // ✅ Good
  notActive?: boolean;        // ❌ Bad
}
```

### Children Prop

Always type as `React.ReactNode`:

```tsx
interface ButtonProps {
  children?: React.ReactNode;  // ✅ Good
  children?: any;               // ❌ Bad
  children?: React.ReactElement; // ❌ Restrictive
}
```

---

## TypeScript Standards

### Strict Typing

```tsx
// ✅ Good - explicit types
const Button = ({ text, onClick }: ButtonProps) => { };

// ❌ Bad - implicit any
const Button = ({ text, onClick }) => { };
```

### Generic Components

For polymorphic components, use generics:

```tsx
interface TypographyOwnProps<E extends ElementType = "p"> {
  as?: E;
  children?: ReactNode;
  size?: Size;
}

type TypographyProps<E extends ElementType> = TypographyOwnProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof TypographyOwnProps<E>>;

const Typography = <E extends ElementType = "p">(props: TypographyProps<E>) => {
  // Implementation
};
```

### Type Exports

Export types when they might be useful to consumers:

```tsx
// ✅ Export component types
export type ButtonProps = { ... };
export type NavItemId = "calendar" | "map" | "gallery" | "profile";

// ✅ Export enums/unions
export type TypographySize = "04" | "08" | "16" | "30";
```

### Avoid `any`

```tsx
// ✅ Good
img?: string | StaticImageData;

// ❌ Bad
img?: any;
```

---

## Styling Standards

### CSS Modules

Always use CSS Modules for component styling:

```tsx
import styles from "./Button.module.scss";

const Button = () => {
  return <button className={styles.button}>Click</button>;
};
```

### Class Name Merging

For custom className props, merge properly:

```tsx
// ✅ Good - proper merging
const classNames = [styles.button, className].filter(Boolean).join(" ");

// ✅ Good - using template literal
const className = `${styles.base} ${customClass}`;

// ❌ Bad - overwrites styles
const className = `${styles.button} ${className}`; // className might be undefined
```

### Conditional Classes

```tsx
// ✅ Good - conditional class application
const classNames = [
  styles.typography,
  size && styles[`size-${size}`],
  color && styles[`color-${color}`],
  className,
].filter(Boolean).join(" ");
```

### SCSS Organization

```
src/shared/styles/
├── _variables.scss    # Design tokens (colors, spacing, typography)
├── _mixins.scss       # Reusable mixins
├── _base.scss         # Base/reset styles
└── _theme.scss        # Theme-specific styles
```

### Naming Convention (BEM-inspired)

```scss
// Block
.columns { }

// Element (nested)
.columns__inner { }

// Modifier/state
.column_active { }
.column_reverting { }
```

---

## Client vs Server Components

### When to Use `"use client"`

**Client Component** (needs interactivity):
- Event handlers (onClick, onChange)
- State (useState, useReducer)
- Effects (useEffect)
- Browser APIs (window, document)
- Custom hooks with state/effects

**Examples:**
```tsx
'use client';  // Button needs onClick handlers
const Button = ({ onClick }: ButtonProps) => { };

'use client';  // Columns needs route state
const Columns = () => { };
```

### Server Components (Default)

**Server Component** (static/rendering only):
- No interactivity
- No hooks
- No browser APIs
- Just rendering and styling

**Examples:**
```tsx
// No 'use client' - just renders children
const Main = ({ children }: MainProps) => {
  return <main className={styles.main}>{children}</main>;
};
```

### Rules

1. **Minimize client components**: Use only when necessary
2. **Push client boundaries down**: Make leaf components client, keep parents server
3. **Client composition**: Pass server components as children/props to client components

---

## Component API Design

### Principles

#### 1. Minimal Interface

```tsx
// ✅ Good - minimal props
<Main>{content}</Main>

// ❌ Bad - unnecessary props
<Main className="custom" id="main-content" data-testid="main">
  {content}
</Main>
```

#### 2. Sensible Defaults

```tsx
// ✅ Good - has defaults
const Button = ({ 
  type = "button",      // Defaults to button
  disabled = false,     // Defaults to false
  ...props 
}: ButtonProps) => { };
```

#### 3. Composable API

```tsx
// ✅ Good - components compose well
<Header />
<Columns />
<Main>{content}</Main>

// Components work together through shared state
```

#### 4. Avoid Boolean Props Proliferation

```tsx
// ❌ Bad - too boolean props
<Modal 
  showHeader={true}
  showFooter={true}
  showClose={true}
  isClosable={true}
  isCentered={false}
/>

// ✅ Good - use variants or configuration
<Modal variant="full" />
// or
<Modal config={{ header: true, footer: true }} />
```

---

## Documentation Standards

### DOCUMENTATION.md Structure

Every reusable component must have `DOCUMENTATION.md` with:

```markdown
# Component Name

## Overview
Brief description of purpose and functionality

## Location
File path in project

## Usage
Code examples showing common use cases

## Props
Table of all props with types, defaults, and descriptions

## Features
Key capabilities and characteristics

## Styling
CSS module classes and customization

## Implementation Details
Important technical decisions or patterns

## Examples
Real-world usage examples from project

## Best Practices
Recommendations for usage

## Related Components
Links to related component documentation
```

### Component Header Comment

For complex components, add header comment:

```tsx
/**
 * Button - Interactive button with optional image support
 * 
 * @example
 * <Button text="Click" onClick={handleClick} />
 * <Button img={icon} alt="Menu" onHover={handleHover} />
 */
const Button = ({ text, onClick }: ButtonProps) => { };
```

---

## Code Organization

### Import Order

```tsx
// 1. React and framework imports
import { useState, useEffect } from "react";
import Image from "next/image";

// 2. External libraries
import { create } from "zustand";

// 3. Internal imports (by layer)
import Typography from "@/shared/components/typography/Typography";
import { useNavigationStore } from "@/shared/store/useNavigationStore";

// 4. Style imports
import styles from "./Button.module.scss";

// 5. Type imports (if needed)
import type { ButtonProps } from "./types";
```

### Component Structure

```tsx
// 1. Directive (if client component)
'use client';

// 2. Imports (in order)
import { useState } from "react";
import styles from "./Component.module.scss";

// 3. Type definitions
interface ComponentProps {
  prop1?: string;
}

// 4. Constants
const CONFIG = { ... };

// 5. Component
const Component = ({ prop1 }: ComponentProps) => {
  // Hooks
  const [state, setState] = useState();
  
  // Handlers
  const handler = () => { };
  
  // Render
  return <div>{/* JSX */}</div>;
};

// 6. Export
export default Component;
```

### JSX Formatting

```tsx
// ✅ Good - clean JSX
const Button = () => (
  <button 
    className={styles.button}
    onClick={onClick}
    disabled={disabled}
  >
    {img && <Image src={img} alt={alt} width={20} height={20} />}
    {text && <span>{text}</span>}
    {children}
  </button>
);

// ❌ Bad - inconsistent formatting
const Button = () => (
  <button className={styles.button} onClick={onClick} disabled={disabled}>
  {img&&<Image src={img} alt={alt} width={20} height={20}/>}
  {text && <span>{text}</span>}
      {children}
  </button>
);
```

---

## Accessibility Standards

### Semantic HTML

```tsx
// ✅ Good - semantic elements
<button onClick={onClick}>Click</button>
<a href="/about">About</a>
<main>{content}</main>
<nav>{links}</nav>

// ❌ Bad - divs for everything
<div onClick={onClick}>Click</div>
<div href="/about">About</div>
```

### ARIA Attributes

```tsx
// ✅ Good - accessible button
<Button 
  aria-label="Close dialog"
  onClick={onClose}
>
  <Icon name="close" />
</Button>

// ✅ Good - disabled state
<Button disabled aria-disabled={true}>
  Submit
</Button>
```

### Keyboard Navigation

- All interactive elements must be keyboard accessible
- Use `tabIndex` when needed
- Implement keyboard shortcuts for common actions

### Focus Management

```tsx
// ✅ Good - focus handling
const Input = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  return <input ref={inputRef} />;
};
```

---

## Performance Guidelines

### Memoization

Use `React.memo` for pure components:

```tsx
const Button = React.memo(({ text, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{text}</button>;
});
```

### Avoid Inline Object Creation

```tsx
// ❌ Bad - creates new object every render
const style = { color: isActive ? 'red' : 'gray' };
<div style={style} />

// ✅ Good - memoized or CSS classes
<div className={isActive ? styles.active : styles.inactive} />
```

### Lazy Loading

For heavy components:

```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});
```

### CSS Performance

- Use CSS Modules (efficient class names)
- Avoid inline styles
- Minimize CSS specificity wars
- Use CSS custom properties for theming

---

## Testing Guidelines

### Unit Tests

Test component rendering and props:

```tsx
describe('Button', () => {
  it('renders with text', () => {
    render(<Button text="Click" />);
    expect(screen.getByText('Click')).toBeInTheDocument();
  });

  it('calls onClick handler', () => {
    const handleClick = jest.fn();
    render(<Button text="Click" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Tests

Test component interactions:

```tsx
describe('Columns', () => {
  it('highlights active column based on route', () => {
    render(<Columns />, { wrapper: RouterWrapper });
    expect(screen.getByTestId('calendar-column')).toHaveClass('active');
  });
});
```

### Visual Tests

- Test different states (hover, active, disabled)
- Test responsive behavior
- Test with different themes

---

## Review Checklist

Before merging component changes, verify:

### Code Quality
- [ ] TypeScript types are correct and complete
- [ ] No `any` types used
- [ ] Props interface is well-designed
- [ ] Component follows single responsibility principle
- [ ] Code is properly formatted and linted

### API Design
- [ ] Props have sensible defaults
- [ ] Required props are truly required
- [ ] Component is easy to use
- [ ] API is consistent with similar components

### Performance
- [ ] No unnecessary re-renders
- [ ] Expensive calculations are memoized
- [ ] Images are optimized
- [ ] CSS is efficient

### Accessibility
- [ ] Semantic HTML is used
- [ ] ARIA attributes are correct
- [ ] Keyboard navigation works
- [ ] Focus management is proper
- [ ] Color contrast meets WCAG standards

### Testing
- [ ] Unit tests cover happy path
- [ ] Edge cases are tested
- [ ] Integration tests exist for complex components
- [ ] All tests pass

### Documentation
- [ ] DOCUMENTATION.md exists and is complete
- [ ] Props table is accurate
- [ ] Examples are helpful
- [ ] Best practices are documented

### Styling
- [ ] CSS Modules are used
- [ ] Class names follow conventions
- [ ] Styles are scoped properly
- [ ] No global style pollution

---

## Quick Reference

### Creating a New Component

```bash
# 1. Create component folder
mkdir src/shared/components/newcomponent

# 2. Create files
touch src/shared/components/newcomponent/NewComponent.tsx
touch src/shared/components/newcomponent/NewComponent.module.scss
touch src/shared/components/newcomponent/DOCUMENTATION.md
touch src/shared/components/newcomponent/index.ts
```

### Component Template

```tsx
'use client'; // Only if needed

import styles from "./Component.module.scss";

interface ComponentProps {
  prop1?: string;
  children?: React.ReactNode;
}

const Component = ({ prop1, children }: ComponentProps) => {
  return (
    <div className={styles.component}>
      {children}
    </div>
  );
};

export default Component;
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-04-11 | Initial component standards |

---

## Related Documentation

- [Button Component](./button/DOCUMENTATION.md)
- [Typography Component](./typography/DOCUMENTATION.md)
- [Link Component](./link/DOCUMENTATION.md)
- [Main Component](./main/DOCUMENTATION.md)
- [Header Component](./header/DOCUMENTATION.md)
- [Columns Component](./interactiveColumns/DOCUMENTATION.md)
