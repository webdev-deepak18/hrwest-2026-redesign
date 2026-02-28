---
name: redesigning-hrwest-website
description: Redesigns the HRWest website using Next.js, React Bits, and Tailwind CSS to create a modern, bold, and interactive user experience. Use when the user requests a website redesign, mentions HRWest, or asks for Next.js and Tailwind integrations.
---

# Redesigning HRWest Website

## When to use this skill
- User asks to redesign the HRWest website or specific pages.
- Requests involve modernizing the UI with bold colors, interactive elements, or animations.
- The tech stack mentioned includes Next.js, React Bits, and Tailwind CSS.
- Working on the HRWest 2026 redesign project.

## Workflow
- [ ] **Analyze Requirements**: Review the requested page or component against the HRWest website flow (Home, Program, Attend, Why Sponsor, Testimonials).
- [ ] **Design System Setup**: Ensure Tailwind config includes bold, modern color palettes, typography (e.g., Inter, Outfit), and interactive utilities.
- [ ] **Component Implementation**: Build React components using Tailwind for styling and React Bits/Framer Motion for micro-interactions and animations.
- [ ] **Page Assembly**: Compose the components within Next.js pages/app router.
- [ ] **Validation Loop**: Run Next.js dev server and check for hydration errors, responsive design issues, and animation glitches.

## Instructions
- Prioritize high-impact aesthetics. Do not use generic colors; prefer curated, vibrant palettes.
- Apply glassmorphism or hover animations for interactive elements (buttons, cards).
- Use `npm run dev` for local validation and checking responsive design across different viewports.
- When scaffolding new interactive components, use the following React template:

```tsx
import React from 'react';

export default function ModernCard({ title, children }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 shadow-2xl transition-transform hover:-translate-y-1 hover:shadow-cyan-500/20">
      <h3 className="mb-4 text-2xl font-bold tracking-tight text-white">{title}</h3>
      <div className="text-slate-300">
        {children}
      </div>
    </div>
  );
}
```

## Resources
- Use `npx create-next-app@latest` for scaffolding if starting fresh.
- Reference modern UI libraries and React Bits for specific rich animations.
