# CLAUDE.md — Ecoflo Customer App Prototype

## Role & Behavior

You are building a high-fidelity prototype for an internal stakeholder presentation.
Your goal is to inspire a product team and communicate a clear vision — not to build
production infrastructure.

**Before starting any work or making any changes:**
- Present a clear to-do list and wait for validation
- Flag anything that will consume significant tokens or time
- Ask for confirmation if a decision has significant downstream impact

---

## What We're Building

**Product:** Ecoflo — a customer-facing mobile-first web app for septic system owners.
**Brand:** Ecoflo by Premier Tech Water and Environment.
**Prototype goal:** Inspire the internal team, create vision, explain key features.
**Audience:** Internal stakeholders only (not for customer release).
**Inspiration:** Tesla App — light mode, minimalist, clean UX, premium feel.

The prototype tells a complete customer story from first contact to ongoing ownership.
Every screen exists within a single linear journey. The tutorial guides the viewer
through that journey step by step.

---

## Customer Journey — The Spine of the Prototype

The prototype is structured around this exact journey. Every screen maps to a stage.
**Do not reorganize or split by feature type.** The journey IS the navigation.

```
Stage 1  -> System Configurator       (find my system)
Stage 2  -> Create Account            (sign up)
Stage 3  -> Schedule Soil Analysis    (first appointment)
Stage 4  -> Soil Report + Pricing     (review and approve)
Stage 5  -> Schedule Installation     (book the install)
Stage 6  -> Installation Complete     (invoice, docs, maintenance schedule)
Stage 7  -> Product Dashboard         (ongoing ownership hub)
Stage 8  -> Book Maintenance          (schedule + technician + report + pay)
Stage 9  -> Buy Parts                 (e-commerce + install option)
```

Stages 1-6 are the **pre-ownership flow** (new customer).
Stages 7-9 are the **post-ownership flow** (existing system owner).

For the prototype, the app launches at Stage 1 and the tutorial walks through all 9 stages.
A returning user (already has a system) lands directly at Stage 7.

---

## Tutorial / Guide System

### Concept
Floating coach mark bubbles that appear on each screen and guide the viewer through
the customer journey. Inspired by Google Maps first-use tips. Each bubble explains
what the user sees and what the next step is, framed as the customer's experience --
not as UI documentation.

### Behavior
- Bubbles appear automatically when entering each new stage for the first time
- Each bubble highlights a relevant element on screen via a soft spotlight overlay
- **Skip button on every bubble** -- dismisses the current tip, no more bubbles shown on this screen
- Bubbles do not auto-advance -- user taps "Next" to move to the next tip
- Once skipped or completed, bubbles do not reappear (state persisted in localStorage)
- Maximum 2 bubbles per screen -- one to explain the context, one to explain the CTA

### Visual Style
- White card bubble with a small directional arrow pointing to the highlighted element
- Soft dark overlay (20% opacity) covering the rest of the screen
- Highlighted element has a green border glow (#64A70B at 60% opacity)
- Bubble contains: short title (bold), 1-2 sentence description, "Next" button (green), "Skip" text link (muted)
- Bubble max width: 280px, positioned to avoid obscuring the highlighted element
- Smooth fade-in animation (200ms ease)

### Tutorial Content (by stage)

**Stage 1 -- System Configurator**
- Bubble 1 (on the question cards):
  - Title: "Find your perfect system"
  - Text: "Answer 3 quick questions about your property. We use your answers to recommend the right Ecoflo system for your specific situation."
- Bubble 2 (on the CTA after result):
  - Title: "Your system is selected"
  - Text: "Based on your answers, we've identified the ideal system. Ready to move forward? Let's create your account."

**Stage 2 -- Create Account**
- Bubble 1 (on the form):
  - Title: "One account for everything"
  - Text: "Your Ecoflo account links your property, your system, your appointments, and your invoices -- all in one place."

**Stage 3 -- Schedule Soil Analysis**
- Bubble 1 (on the calendar):
  - Title: "Your first step on the ground"
  - Text: "A soil analysis determines exactly which system model fits your lot. Pick a date and we'll send a technician."
- Bubble 2 (on the technician card):
  - Title: "Meet your technician"
  - Text: "You'll know who's coming before they arrive -- name, photo, and estimated arrival time."

**Stage 4 -- Soil Report + Pricing**
- Bubble 1 (on the report card):
  - Title: "Your soil report is ready"
  - Text: "The analysis confirms your system recommendation and gives you everything your municipality needs for the permit."
- Bubble 2 (on the pricing breakdown):
  - Title: "No surprises"
  - Text: "Your installation price is fixed and itemized. Review it, approve it, and we handle the rest."

**Stage 5 -- Schedule Installation**
- Bubble 1 (on the calendar):
  - Title: "Book your installation day"
  - Text: "Installation typically takes one day. Choose a date that works for you -- we'll confirm with a reminder 48 hours before."

**Stage 6 -- Installation Complete**
- Bubble 1 (on the invoice card):
  - Title: "Your system is in the ground"
  - Text: "Pay your invoice directly in the app. Your receipt, warranty documents, and system specs are saved here permanently."
- Bubble 2 (on the maintenance schedule):
  - Title: "Never miss a maintenance"
  - Text: "Your maintenance schedule is set automatically based on your system model. We'll remind you when it's time."

**Stage 7 -- Product Dashboard**
- Bubble 1 (on the health score):
  - Title: "Your system at a glance"
  - Text: "The health score reflects your system's current status based on age, last service, and filter condition. Green means you're good."
- Bubble 2 (on the quick actions):
  - Title: "Everything from here"
  - Text: "Book a service, order parts, review history, or contact support -- all reachable in one tap from your dashboard."

**Stage 8 -- Book Maintenance**
- Bubble 1 (on the service type selector):
  - Title: "Schedule your annual maintenance"
  - Text: "Routine maintenance keeps your system performing at its best and your warranty valid."
- Bubble 2 (on the post-service report):
  - Title: "Service complete"
  - Text: "After every visit, you receive a detailed report and your invoice directly in the app. Pay in one tap."

**Stage 9 -- Buy Parts**
- Bubble 1 (on the product grid):
  - Title: "Parts made for your system"
  - Text: "The catalog is filtered to show only parts compatible with your Ecoflo model. No guesswork."
- Bubble 2 (on the install option at checkout):
  - Title: "Install it yourself or let us do it"
  - Text: "For parts that require a technician, you can add an installation appointment at checkout -- no separate booking needed."

---

## Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| Frontend | React (Vite) | Fast setup, component reuse, modern DX |
| Styling | Tailwind CSS | Utility-first, rapid iteration |
| Routing | React Router v6 | SPA navigation between screens |
| Mock data | Static JSON / JS fixtures | No backend needed for prototype |
| Auth (fake) | Hardcoded session state | Simulate logged-in user, no real auth |
| E-commerce state | React Context + localStorage | Cart persistence across screens |
| Tutorial state | localStorage | Track which bubbles have been seen |
| Deployment | Vercel | Zero config, instant shareable URL |
| Repo | GitHub | Version control, Vercel integration |

**No backend required.** All data is mocked. No Supabase or real DB for this prototype.

---

## Branding

### Logo
File provided: `Ecoflo-R_Logo-RGB.png`
Place at: `public/logo.png`

The logo exists in two versions from the brand guidelines:
- **Color version:** Green wordmark on white background -- use this as the default
- **Reversed version:** White wordmark on green background -- use for dark/green headers if needed

**Logo usage rules (from official brand guidelines):**
- Never change the color (must stay #64A70B green or pure black/white)
- Never deform or stretch
- Never add an outline
- Never place on a background that affects readability
- Maintain clearance space of X/3 on all sides (X = logo height)
- Minimum size with registered symbol: 9mm / 0.375" high

### Official Color
This is the ONLY brand green. Use it consistently. Do not approximate.

```
Pantone:  369 C (coated) / 376 U (uncoated)
HEX:      #64A70B
RGB:      100, 167, 11
CMYK:     58 / 0 / 100 / 4
```

### Full Color Palette (CSS variables)

```css
/* === BRAND === */
--color-brand:          #64A70B;   /* Official Ecoflo green -- Pantone 369 C */
--color-brand-dark:     #4D7E08;   /* Darker green for hover states */
--color-brand-light:    #EDF5DC;   /* Very light green for tinted backgrounds */
--color-brand-muted:    #8FC445;   /* Lighter green for secondary accents */

/* === NEUTRALS === */
--color-bg:             #FFFFFF;   /* Page background -- pure white */
--color-surface:        #F7F8F5;   /* Card/surface background -- very slightly warm white */
--color-surface-alt:    #EEEEE9;   /* Alternate surface for contrast */
--color-border:         #E2E4DC;   /* Subtle borders */
--color-text:           #1A1A1A;   /* Primary text -- near black */
--color-text-secondary: #5C5F52;   /* Secondary/muted text */
--color-text-disabled:  #A8ABA0;   /* Disabled state text */

/* === SEMANTIC === */
--color-success:        #64A70B;   /* Healthy state -- same as brand green */
--color-warning:        #F59E0B;   /* Attention needed -- amber */
--color-danger:         #DC2626;   /* Critical alert -- red */
--color-info:           #3B82F6;   /* Informational -- blue */

/* === TUTORIAL === */
--color-overlay:        rgba(0, 0, 0, 0.22);     /* Spotlight backdrop */
--color-bubble-glow:    rgba(100, 167, 11, 0.55); /* Coach mark highlight border */
```

### Typography

The brand guidelines do not specify a typeface beyond the logo itself (which uses a custom
geometric sans). For the app UI, use the following Google Fonts pairing:

```
Display / Headings:  "Plus Jakarta Sans" -- weights 600, 700
Body / UI:           "Plus Jakarta Sans" -- weights 400, 500
```

Import in index.html:
```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Rationale: Plus Jakarta Sans is geometric, clean, and close in spirit to the Ecoflo
logo letterforms. It reads well at small sizes on mobile. It avoids the generic
Inter/Roboto look without feeling off-brand.

### Typography Scale

```css
--text-xs:   0.75rem;   /* 12px -- labels, badges */
--text-sm:   0.875rem;  /* 14px -- secondary text, captions */
--text-base: 1rem;      /* 16px -- body */
--text-lg:   1.125rem;  /* 18px -- section headers */
--text-xl:   1.25rem;   /* 20px -- card titles */
--text-2xl:  1.5rem;    /* 24px -- page titles */
--text-3xl:  1.875rem;  /* 30px -- hero numbers (health score, price) */
```

### Visual Style Rules

- **Light mode only.** No dark mode in this prototype.
- **Generous white space.** Prefer breathing room over density.
- **Rounded corners:** 12px for cards, 8px for buttons and inputs, 999px for pills/badges.
- **Shadows:** Use soft shadows over harsh borders.
  - Cards: `box-shadow: 0 1px 4px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)`
  - Elevated (modals, bubbles): `box-shadow: 0 8px 32px rgba(0,0,0,0.12)`
- **Icons:** Lucide React. Stroke weight 1.5px. Size 20px for UI icons, 24px for nav icons.
- **No decorative gradients.** Brand green is used flat. Gradients only if purposeful.
- **Primary button:** Background #64A70B, white text, 12px radius, 48px height on mobile.
- **Secondary button:** White background, #64A70B border and text, same sizing.
- **Photography:** Unsplash placeholder images. Prefer outdoor/nature/rural settings that
  match the Ecoflo brand context (properties, fields, technicians outdoors).

---

## Design Principles

- **Mobile-first.** Every screen designed at 390px width first.
- **One action per screen.** Clear primary CTA always visible.
- **Journey over features.** Navigation follows the customer story, not feature categories.
- **Status is always visible.** System health and current journey stage are never buried.
- **Frictionless booking.** Max 3 steps for any appointment.
- **Trusted commerce.** Clear pricing, delivery estimate, and install option at checkout.

---

## Screen Inventory

### Stage 1 -- System Configurator
**File:** `src/pages/Configurator.jsx`

A 3-question wizard followed by a system recommendation result screen.

**Questions:**
1. "What type of property?" -- Primary Residence / Cottage or Seasonal / Small Commercial
2. "How many bedrooms (or equivalent users)?" -- 1-2 / 3-4 / 5+
3. "What do you know about your soil?" -- Unknown (need a test) / Sandy or Permeable / Clay or Dense / High water table

**Result (always auto-selects the same system for prototype simplicity):**
```json
{
  "recommended": "Ecoflo Compact Biofilter EC-5",
  "reasons": [
    "Ideal for primary residences with 3-4 bedrooms",
    "Works in a wide range of soil conditions",
    "Uses 50% less space than traditional systems",
    "Energy-free, no mechanical components"
  ],
  "filterType": "Coconut husk (coco) -- 100% natural and compostable",
  "warrantyYears": 10
}
```

CTA: "This is my system -- Create my account"

---

### Stage 2 -- Create Account
**File:** `src/pages/CreateAccount.jsx`

Form fields: First name, Last name, Email, Password, Phone.
Property address field (optional for prototype).
CTA: "Create my Ecoflo account" -- advances to Stage 3, no email verification.

---

### Stage 3 -- Schedule Soil Analysis
**File:** `src/pages/BookSoilAnalysis.jsx`

BookingCalendar component + time slot picker.
Available slots: weekdays only, 9:00 AM and 1:00 PM, across the next 3 weeks.
After slot selection: TechnicianCard appears (Name: "Marc Bouchard", rating: 4.9, photo placeholder).
CTA: "Confirm appointment"
Success state: confirmation card + reference "SOIL-2026-0042".

---

### Stage 4 -- Soil Report + Pricing
**File:** `src/pages/SoilReport.jsx`

Mock report:
```json
{
  "reportDate": "2026-04-10",
  "soilType": "Sandy loam -- moderate permeability",
  "recommendation": "Ecoflo Compact Biofilter EC-5 confirmed",
  "permitReady": true,
  "pricing": {
    "system": 8400,
    "installation": 3200,
    "permit": 350,
    "total": 11950,
    "currency": "CAD"
  }
}
```

Show report summary card, then itemized pricing breakdown.
CTA: "Approve and schedule installation"

---

### Stage 5 -- Schedule Installation
**File:** `src/pages/BookInstallation.jsx`

Same BookingCalendar pattern.
2-person crew card after slot selection (names + photo placeholders).
Note: "Installation typically takes 6-8 hours. We'll send a reminder 48h before."
CTA: "Confirm installation date"
Success reference: "INST-2026-0088"

---

### Stage 6 -- Installation Complete
**File:** `src/pages/InstallationComplete.jsx`

Post-install hub. Four cards stacked vertically:

1. **Invoice** -- $11,950 CAD. "Pay now" opens PaymentForm. Success animation after fake delay.
2. **Documents** -- Three DocumentCards: System Specs (PDF, 1.2 MB), Warranty Certificate (PDF, 0.8 MB), Municipality Permit Copy (PDF, 2.1 MB). Fake download animation on tap.
3. **Support** -- Phone, email, "Start a chat" (all non-functional display only).
4. **Maintenance Schedule** -- "First service due: March 2027. Annual thereafter."

Bottom CTA: "Go to my dashboard" -- sets hasSystem = true in localStorage, advances to Stage 7.

---

### Stage 7 -- Product Dashboard
**File:** `src/pages/Dashboard.jsx`

Returning users land here directly. Ownership hub.

Sections top to bottom:
- Greeting: "Good morning, Marie"
- HealthRing: 92/100, green, label "Your system is healthy"
- NotificationBanner: "Filter renewal due in approximately 14 months" (info)
- System info card: model, install date, serial, address
- Next maintenance card: "March 15, 2027" + "Book now" shortcut
- Quick actions row: Book Maintenance / Buy Parts / View History / Contact Support
- History timeline: Installation (May 2026), Filter inspection (Oct 2026), Annual maintenance (Mar 2027)

Mock data:
```json
{
  "customer": "Marie Tremblay",
  "system": {
    "model": "Ecoflo Compact Biofilter EC-5",
    "installed": "2026-05-03",
    "serial": "EC5-2026-04821",
    "address": "247 Chemin du Lac, Saint-Sauveur, QC",
    "status": "healthy",
    "healthScore": 92,
    "lastMaintenance": "2026-05-03",
    "nextMaintenance": "2027-03-15",
    "filterRenewalDue": "2041-05-03"
  }
}
```

---

### Stage 8 -- Book Maintenance
**File:** `src/pages/BookMaintenance.jsx`

Step 1 -- Service type (ServiceCard grid):
- Annual Maintenance (highlighted as recommended)
- Filter Inspection
- Repair / Diagnostic
- Emergency Call

Step 2 -- BookingCalendar + slot.

Step 3 -- Confirm. Reference: "MAINT-2027-0031".

Post-service view (via "View completed service" in history):
- TechnicianCard: Marc Bouchard, findings: "System performing normally. Filter in good condition."
- Invoice: $185 CAD. "Pay now" button with PaymentForm.

---

### Stage 9 -- Buy Parts
**Files:** `src/pages/PartsStore.jsx`, `ProductDetail.jsx`, `Cart.jsx`, `Checkout.jsx`, `OrderConfirmation.jsx`

Catalog pre-filtered to EC-5 compatible parts:
```json
[
  { "id": "CAF-065", "name": "Charcoal Air Filter 65",               "price": 70.00,  "category": "Filters",       "inStock": true,  "diyFriendly": true  },
  { "id": "CAF-090", "name": "Charcoal Air Filter 90",               "price": 82.00,  "category": "Filters",       "inStock": true,  "diyFriendly": true  },
  { "id": "CAF-300", "name": "Charcoal Air Vent Filter 300",         "price": 100.00, "category": "Filters",       "inStock": true,  "diyFriendly": false },
  { "id": "LID-QT",  "name": "1/4 Turn Replacement for Plastic Lid", "price": 23.00,  "category": "Lids & Risers", "inStock": true,  "diyFriendly": true  },
  { "id": "INS-MA",  "name": "Insulation Panel -- Main Access",       "price": 49.00,  "category": "Accessories",   "inStock": true,  "diyFriendly": false },
  { "id": "CAF-100P","name": "Charcoal Air Filter 100P",             "price": 56.00,  "category": "Filters",       "inStock": false, "diyFriendly": true  }
]
```

Show "Compatible with your EC-5" badge on every product card.

**Checkout -- 3 sections:**
1. Delivery address (pre-filled: 247 Chemin du Lac, Saint-Sauveur, QC)
2. Installation option (only for diyFriendly: false items):
   - Toggle: "I'll install it myself" / "Book a technician (+$85)"
   - If technician: inline mini calendar appears to pick a date
3. Payment: fake card form, visual only

Shipping: $12.99 flat under $100, free over $100.

**Order Confirmation:**
- Order: "ECO-2026-8821"
- Items + quantities
- Delivery: "3-5 business days"
- If technician booked: install appointment date
- CTA: "Back to dashboard"

---

## Navigation Structure

**Stages 1-6 (pre-ownership):**
Progress bar fixed at top. Shows "Step X of 6" + stage label.
No bottom nav.

**Stages 7-9 (post-ownership):**
Bottom nav fixed, always visible.
Tabs: Dashboard / My System / Book Service / Parts Store / Account
Active: #64A70B filled icon + green underline indicator.

---

## Reusable Components

| Component | Description |
|---|---|
| `CoachMark` | Floating bubble with spotlight overlay, title, text, Next + Skip |
| `ProgressBar` | Top bar for stages 1-6 |
| `BottomNav` | Fixed bottom nav for stages 7-9 |
| `StatusBadge` | healthy / warning / critical color-coded pill |
| `HealthRing` | SVG ring showing score 0-100 |
| `BookingCalendar` | Reusable calendar + slot picker (stages 3, 5, 8) |
| `TechnicianCard` | Name, photo placeholder, star rating |
| `ServiceCard` | Icon + label + description for service type selection |
| `ProductCard` | Parts catalog item with compatibility badge and stock status |
| `StepIndicator` | Dot-based wizard progress indicator |
| `PaymentForm` | Fake card input, 1.5s delay, success animation |
| `NotificationBanner` | Dismissible banner (info / warning / critical) |
| `SectionHeader` | Page title + optional subtitle |
| `DocumentCard` | Fake downloadable file with icon, name, size |
| `TimelineItem` | Single entry in system history |

---

## State Management

**JourneyContext:**
- `currentStage` (1-9)
- `hasSystem` (boolean -- false until Stage 6 complete)
- `tutorialSeen` (object keyed by stage -- persisted to localStorage)

**CartContext:**
- `items` (array: product + quantity)
- `technicianInstall` (boolean per item)
- `installDate` (chosen date if technician option selected)

**Reset:** Account page has "Reset prototype demo" button -- clears all localStorage,
returns to Stage 1. Essential for re-running the demo during presentations.

---

## File Structure

```
ecoflo-app/
├── public/
│   └── logo.png                     <- Ecoflo-R_Logo-RGB.png (use on white bg)
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── CoachMark.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── BottomNav.jsx
│   │   ├── StatusBadge.jsx
│   │   ├── HealthRing.jsx
│   │   ├── BookingCalendar.jsx
│   │   ├── TechnicianCard.jsx
│   │   ├── ServiceCard.jsx
│   │   ├── ProductCard.jsx
│   │   ├── StepIndicator.jsx
│   │   ├── PaymentForm.jsx
│   │   ├── NotificationBanner.jsx
│   │   ├── SectionHeader.jsx
│   │   ├── DocumentCard.jsx
│   │   └── TimelineItem.jsx
│   ├── data/
│   │   ├── customer.json
│   │   ├── system.json
│   │   ├── parts.json
│   │   ├── history.json
│   │   └── tutorial.js
│   ├── context/
│   │   ├── CartContext.jsx
│   │   ├── JourneyContext.jsx
│   │   └── TutorialContext.jsx
│   ├── pages/
│   │   ├── Configurator.jsx
│   │   ├── CreateAccount.jsx
│   │   ├── BookSoilAnalysis.jsx
│   │   ├── SoilReport.jsx
│   │   ├── BookInstallation.jsx
│   │   ├── InstallationComplete.jsx
│   │   ├── Dashboard.jsx
│   │   ├── BookMaintenance.jsx
│   │   ├── PartsStore.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   └── OrderConfirmation.jsx
│   ├── styles/
│   │   └── tokens.css               <- All CSS variables defined above
│   ├── App.jsx
│   └── main.jsx
├── index.html                       <- Google Fonts import here
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## Deployment

1. Push to GitHub repo: `ecoflo-app`
2. Connect to Vercel -- auto-deploy on push to `main`
3. Share Vercel URL with stakeholders

---

## Prototype Constraints

- All data is mocked -- no API calls, no backend
- No real payments, no booking confirmation emails
- Mobile viewport (390px) is the primary design target
- Desktop layout is a bonus, not a requirement
- Animations: subtle -- page entrance transitions, smooth stage advances
- Fake data renders instantly -- no loading spinners
- Payment form shows 1.5s fake processing then success state

---

## Success Criteria

A stakeholder can:
1. Open the link on their phone
2. Complete the 3-question configurator and see their recommended system
3. Walk through all 9 stages guided by coach mark bubbles
4. Reach the dashboard and immediately understand ongoing ownership
5. Book a maintenance and complete a parts purchase with the technician install option
6. Hit "Reset demo" and run the full flow again for a second viewer

---

## Token / Effort Flags

Claude must flag before starting any of these:
- Adding animation libraries beyond CSS transitions (e.g. Framer Motion)
- Building a full desktop layout beyond basic responsive scaling
- Adding real email or SMS notifications
- Expanding the parts catalog beyond the 6 mock products listed
- Adding more than 2 screens beyond what is listed above
- Implementing any real payment processor, even in test mode
