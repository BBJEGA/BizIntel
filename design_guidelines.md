# BizIntel Feedback Platform - Design Guidelines

## Design Approach

**Selected Approach:** Design System with Modern SaaS Inspiration

**Reference Products:** Linear (dashboard clarity), Notion (form interfaces), Stripe (professional trust)

**Core Principle:** Create a professional, efficient B2B SaaS platform that prioritizes data clarity, form usability, and organizational trust. The design should feel modern and capable while maintaining simplicity for quick user onboarding.

---

## Typography System

**Font Families:**
- Primary: Inter (via Google Fonts) - for UI elements, body text, and data
- Headings: Inter with tighter letter-spacing for impact

**Type Scale:**
- Hero Headlines: text-5xl md:text-6xl font-bold tracking-tight
- Page Titles: text-3xl md:text-4xl font-semibold
- Section Headers: text-2xl font-semibold
- Card Titles: text-lg font-medium
- Body Text: text-base leading-relaxed
- Labels/Metadata: text-sm font-medium
- Captions/Helper Text: text-xs

**Emphasis:**
- Use font-semibold for primary actions and important metrics
- Use font-medium for secondary hierarchy
- Maintain consistent line-height (leading-relaxed for readability)

---

## Spacing System

**Core Spacing Units (Tailwind):**
- Micro spacing: 2, 4 (for tight element relationships)
- Standard spacing: 6, 8, 12 (for component internal padding)
- Section spacing: 16, 20, 24 (for vertical rhythm)
- Large gaps: 32 (for major section separation)

**Container Strategy:**
- Max-width containers: max-w-7xl for main content
- Form containers: max-w-2xl for optimal reading width
- Dashboard cards: Use grid with gap-6

---

## Layout System

### Landing Page
**Hero Section:**
- Full viewport height (min-h-screen) with centered content
- Two-column layout on desktop: Left (60%) - headline, description, CTA buttons; Right (40%) - hero illustration/mockup image
- Stack to single column on mobile
- Include trust indicators below CTA (e.g., "Trusted by 500+ organizations")

**Features Section:**
- Three-column grid (grid-cols-1 md:grid-cols-3) with gap-8
- Each feature card: icon, title, description
- Section padding: py-24

**How It Works:**
- Numbered step cards in a horizontal flow
- Use flex with gap-12 on desktop, stack on mobile

**CTA Section:**
- Centered with generous padding (py-32)
- Large headline with primary and secondary action buttons

### Dashboard Layout
**Structure:**
- Sidebar navigation (fixed, w-64) with logo, main nav links, user profile at bottom
- Main content area with top bar showing page title and action buttons
- Use flex layout: sidebar + flex-1 main content

**Analytics Cards:**
- Grid layout (grid-cols-1 md:grid-cols-3) for metrics
- Each card: large number (text-4xl font-bold), label, trend indicator
- Simple bar chart below metrics using horizontal bars

**Feedback Lists:**
- Tab navigation for "All Complaints" and "All Suggestions"
- Table layout with columns: Message preview, Category, Date, Anonymous badge
- Pagination controls at bottom

### Form Creation Page
**Single-column layout:**
- max-w-3xl centered container
- Form fields with generous spacing (space-y-6)
- Section groupings with visual separation

### Public Feedback Form
**Centered card design:**
- max-w-2xl container
- Organization branding at top (name, form title)
- Clean form fields with clear labels
- Radio buttons for Complaint/Suggestion selection
- Checkbox for anonymous submission
- Prominent submit button

### Authentication Pages (Login/Register)
**Centered card approach:**
- max-w-md container
- Logo/brand at top
- Form with space-y-6
- Link to alternate action at bottom ("Don't have an account? Register")

---

## Component Library

### Navigation
**Top Navigation (Landing):**
- Fixed to top with backdrop blur
- Logo left, nav links center, CTA button right
- Height: h-16 with px-6 horizontal padding

**Sidebar Navigation (Dashboard):**
- Fixed sidebar with py-6 px-4
- Nav items with rounded corners (rounded-lg) and px-4 py-2 padding
- Active state with medium font weight

### Buttons
**Primary Button:**
- px-6 py-3 rounded-lg font-medium
- Larger for hero CTAs: px-8 py-4 text-lg

**Secondary Button:**
- Same sizing with border treatment
- Use border-2 for prominence

**Icon Buttons:**
- p-2 rounded-lg for compact actions

### Form Elements
**Input Fields:**
- w-full px-4 py-3 rounded-lg border-2
- Focus state with ring treatment (ring-2 ring-offset-2)
- Labels: text-sm font-medium mb-2

**Textareas:**
- Same styling as inputs
- min-h-32 for feedback forms

**Radio/Checkbox:**
- Larger touch targets (w-5 h-5)
- Align with text using flex items-center

### Cards
**Dashboard Cards:**
- Rounded corners (rounded-xl)
- Padding: p-6
- Border treatment with subtle shadow (shadow-sm)

**Feature Cards (Landing):**
- rounded-xl with p-8
- Icon container at top (w-12 h-12 rounded-lg flex items-center justify-center)

**Feedback Cards:**
- rounded-lg with p-4
- Compact design with hover elevation

### Data Display
**Metrics Cards:**
- Large number display with supporting label below
- Optional trend indicator (arrow icon + percentage)

**Charts:**
- Simple horizontal bar charts using div elements with widths
- Height: h-8 per bar with gap-3
- Labels on left, bars on right

**Tables:**
- Full width with rounded-lg container
- Header row with font-medium
- Body rows with hover state
- Cell padding: px-4 py-3

### Badges
**Status Badges:**
- Inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
- Use for "Complaint", "Suggestion", "Anonymous" labels

### Modals/Overlays
**Modal Structure:**
- Fixed overlay with backdrop blur
- Centered card (max-w-lg) with rounded-xl and p-6
- Close button in top-right corner

---

## Icons
**Library:** Heroicons (via CDN)
**Usage:**
- Navigation: 20px icons (w-5 h-5)
- Feature cards: 24px icons (w-6 h-6)
- Buttons with icons: 20px inline (w-5 h-5)
- Status indicators: 16px (w-4 h-4)

---

## Images

**Hero Section (Landing Page):**
- Large hero image showing a dashboard mockup or professional team collaborating
- Position: Right side of two-column hero layout
- Style: Subtle shadow and rounded corners (rounded-2xl)
- Aspect ratio: 16:9 or 4:3

**Feature Section Icons:**
- Use illustrative icons from Heroicons, no custom images needed

**Dashboard:**
- Organization logo placeholder in sidebar (square, 40x40px)
- No other images required - focus on data clarity

---

## Animations
**Minimal, purposeful animations:**
- Smooth transitions on hover states (transition-all duration-200)
- Fade-in for modal overlays
- No scroll animations or complex effects
- Button hover: slight scale (hover:scale-105) on CTA buttons only

---

## Accessibility
- All form inputs include proper labels and aria-labels
- Minimum touch target size: 44x44px for buttons
- Focus states visible with ring treatment
- Semantic HTML throughout (nav, main, article, section)
- Color contrast meets WCAG AA standards (handled separately from these guidelines)