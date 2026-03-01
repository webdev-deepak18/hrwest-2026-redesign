---
name: brand-identity
description: Provides the single source of truth for HRWest brand guidelines, design tokens, technology choices, and voice/tone. Use this skill whenever generating UI components, styling applications, writing copy, or creating user-facing assets to ensure brand consistency for the HRWest website redesign.
---

# Brand Identity & Guidelines

**Brand Name:** HRWest

This skill defines the core constraints for visual design and technical implementation for the HRWest brand. You must adhere to these guidelines strictly to maintain consistency across the entire Next.js application.

## Reference Documentation

Depending on the task you are performing, consult the specific resource files below. Do not guess brand elements; always read the corresponding file.

### For Visual Design & UI Styling
If you need exact colors, fonts, border radii, or spacing values, read:
👉 **[`resources/design-tokens.json`](resources/design-tokens.json)**

### For Coding & Component Implementation
If you are generating code, choosing libraries, or structuring UI components, read the technical constraints here:
👉 **[`resources/tech-stack.md`](resources/tech-stack.md)**

### For Copywriting & Content Generation
If you are writing marketing copy, error messages, documentation, or user-facing text, read the persona guidelines here:
👉 **[`resources/voice-tone.md`](resources/voice-tone.md)**

---

## ⚠️ MANDATORY: Accent Color Usage Rules

> These rules apply to **every page and every section** without exception. Failure to apply them is a brand consistency bug.

The HRWest palette has two highlight colors. You **must use both** — not just `primary`:

| Token | Value | Role |
|---|---|---|
| `primary` | `#8b5cf6` (violet-500) | Primary CTA buttons, eyebrow pill text, pulsing dot, main icon color |
| `accent` | `#a78bfa` (violet-400) | Secondary highlights — see rules below |

### Rule 1 — Headline gradient **always** uses `accent`
Any highlighted/gradient span inside a headline **must** use this exact gradient:
```
bg-gradient-to-r from-accent via-primary to-[#c084fc]
```
Never use plain `text-primary` on a headline highlight span.

### Rule 2 — Secondary text labels use `text-accent`
- Speaker/person **role** labels → `text-accent`
- Secondary "view all" / navigation links → `text-accent`
- MapPin and secondary icons → `text-accent`
- Metric suffix characters (e.g. `+`) → `#a78bfa` (accent)

### Rule 3 — Hover states use `accent` not `primary`
- Card hover border → `hover:border-accent/30`
- Card inner hover glow → `rgba(167,139,250,0.08)` (accent at low opacity)
- List bullet dots on qualifying sections → `bg-accent`

### Brand Motif Pattern (required above eyebrow on major sections)
The "four dots" legacy motif must be placed _above_ the eyebrow pill on major section headers. It is imported from `@/components/ui/brand-motif`.
```tsx
<motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="mb-8"
>
    <BrandMotif size={6} gap={10} />
</motion.div>
```

### Eyebrow Pill Pattern (required on every section)
Every content section must start with an eyebrow pill following this pattern:
```tsx
<span className="glass inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-primary shadow-lg shadow-primary/10">
    <IconName className="h-4 w-4" />
    <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
    Section Label
</span>
```

### Ambient Glow Pattern (required on every section)
Every section must have a radial ambient glow as first child:
```tsx
<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(139,92,246,0.07),transparent)]" />
```
