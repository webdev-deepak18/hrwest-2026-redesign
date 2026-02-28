# Preferred Tech Stack & Implementation Rules

When generating code or UI components for HRWest, you **MUST** strictly adhere to the following technology choices to maintain a modern, bold, and interactive experience.

## Core Stack
* **Framework:** Next.js (App Router preferred, React + TypeScript)
* **Styling Engine:** Tailwind CSS (Mandatory. Do not use plain CSS or styled-components.)
* **Animations & Interactions:** React Bits / Framer Motion
* **Component Library:** shadcn/ui (Use these primitives as the base for new components)
* **Icons:** Lucide React

## Implementation Guidelines

### 1. Tailwind Usage
* Use utility classes directly in JSX.
* Utilize the color tokens defined in `design-tokens.json` (e.g., use `bg-primary text-primary-foreground` instead of hardcoded hex values).
* **Dark Mode:** Support dark mode using Tailwind's `dark:` variant modifier. The redesign leans into sleek dark modes or high-contrast modern themes.

### 2. Component Patterns
* **Interactive Elements:** Apply glassmorphism or hover animations for interactive elements like cards and buttons to make the site feel alive (e.g., `transition-transform hover:-translate-y-1`).
* **Buttons:** Primary actions must use the solid Primary color. Secondary actions should use 'Ghost' or 'Outline' variants.
* **Layout:** Use Flexbox and CSS Grid via Tailwind utilities for all layout structures. Ensure fully responsive designs.

### 3. Forbidden Patterns
* Do NOT use jQuery.
* Do NOT use Bootstrap classes.
* Do NOT create new standalone CSS files unless absolutely necessary for global custom font imports; keep styles located within component files via Tailwind.
