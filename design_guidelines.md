# BizIntel Enterprise Feedback Platform - Design Guidelines

## Design Approach

**Selected Approach:** Design System with Modern SaaS Inspiration

**Reference Products:** Linear (dashboard clarity), Notion (form interfaces), Stripe (professional trust)

**Core Principle:** Create a professional, efficient B2B SaaS platform prioritizing data clarity, form usability, and organizational credibility. The design balances modern aesthetics with immediate usability for enterprise users.

---

## Color System

**Primary Palette:**
- Vibrant Orange: #B45309 (HSL 24 95% 35%) - primary CTAs, brand accents, success metrics
- Dark Charcoal: #1F2937 (sidebar background, navigation, primary text)
- White: #FFFFFF (main backgrounds, card surfaces)
- Light Gray: #F3F4F6 (secondary surfaces, subtle backgrounds, borders)

**Supporting Colors:**
- Dark Gray: #374151 (body text, secondary elements)
- Medium Gray: #6B7280 (supporting text, labels)
- Pale Gray: #E5E7EB (dividers, borders)
- Deep Orange: #9A3412 (HSL 24 95% 32%) - hover states, darker accents

**Semantic Colors:**
- Success: Vibrant Orange (#FF8C42)
- Warning: #F59E0B
- Error: #EF4444
- Info: Dark Charcoal (#1F2937)

**Logo Integration:**
- The BizIntel Enterprise logo features an orange/red gradient with a lightbulb and growth chart
- Logo colors: Orange (#FF8C42), Red-Orange gradient, Yellow highlights (#FCD34D)
- Logo is displayed prominently in sidebar and landing page navigation

**Application Strategy:**
- Dark charcoal sidebar with white text and orange highlights for active states
- White main content areas
- Light gray (#F3F4F6) for card backgrounds on white surfaces
- Vibrant orange (#B45309 / HSL 24 95% 35% - darkened for WCAG AA compliance) for primary CTAs, success metrics, positive trends
- Dark charcoal for secondary buttons with border treatment
- All orange/white combinations maintain 4.5:1+ contrast ratio (WCAG AA compliant)

---

## Typography System

**Font Family:** Inter (Google Fonts - weights: 400, 500, 600, 700)

**Type Scale:**
- Hero Headlines: text-5xl md:text-6xl font-bold tracking-tight (navy blue)
- Page Titles: text-3xl md:text-4xl font-semibold (navy blue)
- Section Headers: text-2xl font-semibold (navy blue)
- Card Titles: text-lg font-semibold (dark gray)
- Body Text: text-base leading-relaxed (dark gray)
- Labels: text-sm font-medium (medium gray)
- Captions: text-xs (medium gray)

**Hierarchy Emphasis:**
- Bold navy headings create strong information hierarchy
- Medium gray labels provide subtle guidance
- Consistent line-height (leading-relaxed) for readability in data-heavy interfaces

---

## Spacing System

**Core Tailwind Units:** 2, 4, 6, 8, 12, 16, 20, 24, 32

**Application:**
- Micro: 2, 4 (tight element relationships, icon spacing)
- Standard: 6, 8, 12 (component padding, form field gaps)
- Section: 16, 20, 24 (vertical rhythm, card spacing)
- Major: 32 (section separation, page margins)

**Container Strategy:**
- max-w-7xl for dashboard main content
- max-w-2xl for forms and centered content
- max-w-md for authentication pages

---

## Layout System

### Landing Page

**Hero Section:**
- Full viewport (min-h-screen) two-column layout
- Left (55%): Dark charcoal headline, dark gray description, CTA buttons (orange primary + charcoal secondary), trust indicator ("Trusted by 500+ enterprises")
- Right (45%): Large hero image showing dashboard interface mockup with subtle shadow and rounded-2xl corners
- Logo displayed in top navigation with brand name
- Background: White with subtle light gray accent element
- Mobile: Stack single column, image below content

**Features Section:**
- Three-column grid (grid-cols-1 md:grid-cols-3 gap-8)
- Light gray background cards with white hover elevation
- Each card: Orange icon container (rounded-lg), dark charcoal title, dark gray description
- Padding: py-24

**How It Works:**
- Four numbered step cards in horizontal flow with connecting lines
- White cards on light gray section background
- Navy step numbers in green circular containers
- Desktop flex layout, mobile stack

**Social Proof Section:**
- Two-column layout: Left (testimonial quotes in white cards), Right (metrics grid showing usage statistics)
- Navy company logos
- py-20 section spacing

**CTA Section:**
- Centered on navy blue background with white text
- Large headline, supporting text, dual CTAs (green primary, white outline secondary)
- py-32 generous padding

### Dashboard Layout

**Sidebar Navigation:**
- Fixed left sidebar (w-64) with dark charcoal background
- BizIntel Enterprise logo (40x40px) and white text
- Navigation items: white text with orange background on active state
- Rounded-lg hover states with lighter charcoal background
- Organization name displayed at bottom in orange-tinted container
- Responsive: Hamburger menu on mobile (<768px), always visible on desktop

**Top Bar:**
- White background with pale gray bottom border
- Page title (navy, text-2xl font-semibold) left
- Action buttons right (green primary button)
- Height: h-16

**Main Content:**
- Light gray background (#F3F4F6)
- White card containers with rounded-xl and shadow-sm
- Grid layouts with gap-6

**Analytics Cards:**
- Total Feedback: Full-width card
- Complaints and Suggestions: Side-by-side grid (grid-cols-2) even on mobile
- White cards: Large charcoal number (text-4xl font-bold), medium gray label, orange trend indicator with arrow
- Bar chart section below: horizontal bars with orange fill, labels in dark gray

**Feedback Lists:**
- White container with rounded-xl
- Tab navigation with navy active state and green underline
- Table with pale gray header, white rows
- Hover state: light gray background
- Badges: Green for "Suggestion", navy for "Complaint", medium gray for "Anonymous"

### Form Creation Page

**Layout:**
- max-w-3xl centered on light gray background
- White card container with rounded-xl
- Section groupings with navy headings
- Form fields: white backgrounds, pale gray borders, green focus rings
- Space-y-6 for field spacing
- Green primary button, navy secondary button at bottom

### Public Feedback Form

**Layout:**
- max-w-2xl centered white card on light gray page background
- Organization branding: Navy company name (text-2xl font-bold), medium gray form title
- Clean form fields with navy labels
- Radio buttons for type selection with green active state
- Green checkbox for anonymous submission
- Large green submit button (w-full)
- Subtle shadow-lg on card

### Authentication Pages

**Layout:**
- max-w-md centered white card
- Navy logo/brand lockup at top
- Form with space-y-6, green focus states
- Green primary button
- Navy link to alternate action ("Don't have an account? Register")
- Light gray page background

---

## Component Library

### Buttons
- **Primary:** Orange background (#B45309 / HSL 24 95% 35%), white text, px-6 py-3 rounded-lg font-medium, hover: deeper orange (#9A3412 / HSL 24 95% 32%)
- **Secondary:** Charcoal border-2, charcoal text, same sizing, hover: charcoal background with white text
- **Hero CTA:** px-8 py-4 text-lg for landing page
- **Buttons on Images:** Backdrop blur (backdrop-blur-md) with white/10 background

### Form Elements
- **Inputs:** White background, pale gray border-2, px-4 py-3 rounded-lg, green focus ring-2
- **Labels:** Navy text-sm font-medium mb-2
- **Textareas:** min-h-32, same styling as inputs
- **Radio/Checkbox:** Green when checked, w-5 h-5

### Cards
- **Dashboard:** White background, rounded-xl, p-6, shadow-sm, hover: shadow-md
- **Feature:** Light gray background, rounded-xl, p-8, white hover
- **Metrics:** Large navy number, green trend arrows

### Navigation
- **Sidebar:** Dark charcoal background, white text, orange background on active state
- **Tabs:** Charcoal active with orange bottom border-b-2

### Badges
- Inline-flex px-3 py-1 rounded-full text-xs font-medium
- Complaint: Charcoal background, white text
- Suggestion: Orange background, white text
- Anonymous: Medium gray background, white text

### Data Visualizations
- **Bar Charts:** Orange filled bars (varying opacity for depth), height h-8, gap-3
- **Trend Indicators:** Orange up arrows, red down arrows, with percentages

---

## Icons

**Library:** Lucide React
**Sizes:** w-5 h-5 (navigation, buttons), w-6 h-6 (features), w-4 h-4 (inline status)
**Colors:** Match parent context - orange in features, white in sidebar, charcoal in content
**Logo:** BizIntel Enterprise logo (40x40px) with orange/red gradient, lightbulb, and growth chart

---

## Images

**Hero Section (Landing):**
- Large dashboard mockup image showing BizIntel interface with analytics and feedback management
- Positioned right side of hero two-column layout
- Style: Subtle shadow-2xl, rounded-2xl corners
- Shows: Navy sidebar, analytics cards, feedback table - professional screenshot aesthetic

**Feature Icons:**
- Use Lucide React icons within orange circular containers - no custom images needed

**Logo:**
- BizIntel Enterprise logo displayed in sidebar header (40x40px) and landing page navigation
- Logo features orange/red gradient with lightbulb and growth chart imagery

**Dashboard:**
- Organization name displayed at bottom of sidebar
- No user avatar needed

---

## Animations

**Minimal Approach:**
- Hover transitions: transition-all duration-200
- Button hover: slight shadow increase on cards
- Green CTA buttons: hover:scale-105 transform
- Modal overlays: fade-in with backdrop-blur
- No scroll animations or parallax effects

---

## Accessibility

- Minimum 44x44px touch targets
- Orange/Charcoal color contrast meets WCAG AA (4.5:1 minimum)
- Focus rings (orange ring-2) visible on all interactive elements
- Semantic HTML structure (nav, main, section, article)
- All form inputs include proper labels with for attributes
- aria-label on all icon buttons for screen readers
- Keyboard navigation fully supported (Escape key, Tab, Enter)
- Responsive mobile sidebar with hamburger menu and multiple close methods