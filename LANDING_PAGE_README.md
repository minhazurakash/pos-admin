# POS Software - Landing Page & Onboarding Flow

## 🎉 Project Overview

A modern, beautifully animated landing page and onboarding flow for a Point of Sale (POS) cloud software, built with Next.js, TypeScript, Tailwind CSS v4, and Framer Motion.

## ✨ Features Implemented

### 1. **Landing Page** (`/`)

#### Hero Section

- Eye-catching headline: "Setup your POS software in just 1 minute"
- Compelling sub-headline about being a smart, fast, and secure solution
- Prominent "Try Now" CTA button that navigates to onboarding
- Smooth entrance animations using Framer Motion
- Animated background shapes with gradient effects
- Scroll indicator animation

#### Features Section

Six core POS features presented with animated cards:

- **Sales & Invoice Management** - Professional invoicing and payment tracking
- **Inventory Tracking** - Real-time stock management with alerts
- **Customer & Supplier Management** - Comprehensive contact management
- **Multi-user & Role Access** - Secure role-based permissions
- **Reports & Analytics** - Business intelligence and insights
- **Cloud Based & Secure** - Enterprise-grade security and accessibility

Each feature card includes:

- Animated icon with hover rotation effect
- Card hover effects (lift and shadow)
- Staggered entrance animations

#### Pricing Section

Three pricing tiers in Bangladeshi Taka (BDT):

1. **Basic** - ৳499/month
   - Single outlet
   - Basic sales & inventory
   - Limited reports
   - Email support

2. **Standard** - ৳799/month (Most Popular)
   - Multiple outlets
   - Advanced inventory
   - Sales & profit reports
   - Staff management
   - Priority support

3. **Premium** - ৳999/month
   - Unlimited outlets
   - Full analytics dashboard
   - Role & permission system
   - API access
   - 24/7 premium support

Features:

- "Most Popular" badge animation
- "Try Now" button on each card
- Package selection passed via query params
- Hover effects and animations

### 2. **Onboarding Flow** (`/onboarding`)

Multi-step animated form with 3 steps:

#### Step 1: Company Information

- Company Name (required field)
- Smooth form validation

#### Step 2: Basic User Information

- Full Name (required)
- Email (required)
- Phone Number (required)
- Input validation

#### Step 3: Package Selection

- Free (default)
- Basic
- Standard
- Premium
- Visual selection with radio-style UI
- Highlights selected package
- Pre-selects package from URL query params

Features:

- Animated step indicator showing progress
- Smooth transitions between steps with Framer Motion
- Back/Next navigation
- Form validation with disabled states
- Responsive design

### 3. **Setup Animation**

After completing onboarding:

- Full-screen animated loader
- Spinning progress indicator
- "Setting up your POS..." message
- Animated progress bar
- 5-second duration
- Automatic redirect to `/dashboard`

### 4. **Dashboard Page** (`/dashboard`)

Success landing page featuring:

- Welcome message with success icon
- Quick stats cards (Sales, Products, Customers)
- Next steps guidance
- Hover animations on stat cards
- Clean, congratulatory design

## 🎨 Design Features

- **Modern SaaS Aesthetic**: Clean, professional design with premium feel
- **Gradient Backgrounds**: Subtle multi-color gradients throughout
- **Smooth Animations**: Framer Motion for all transitions and interactions
- **Responsive Design**: Mobile-first approach, works on all screen sizes
- **Tailwind CSS v4**: Latest Tailwind with custom utility classes
- **Interactive Elements**: Hover states, click animations, smooth transitions
- **Accessibility**: Proper semantic HTML and ARIA attributes

## 📁 File Structure

```
src/
├── components/
│   └── landing/
│       ├── Button.tsx           # Reusable animated button component
│       ├── FeatureCard.tsx      # Feature display card with animations
│       └── PricingCard.tsx      # Pricing tier card with CTA
│
├── pages/
│   ├── _app.tsx                 # App wrapper (simplified for landing pages)
│   ├── index.tsx                # Landing page
│   ├── onboarding.tsx           # Multi-step onboarding form
│   └── dashboard.tsx            # Success/dashboard placeholder
│
└── styles/
    └── globals.css              # Global styles with Tailwind v4
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ or Bun
- Next.js 16.1.1
- Tailwind CSS v4
- Framer Motion 12.23.26

### Installation

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

Visit `http://localhost:3000` to see the landing page.

## 🔧 Technical Implementation

### Animations

All animations use **Framer Motion** with:

- `initial` - Starting state
- `animate` - Target state
- `whileHover` - Hover interactions
- `whileInView` - Scroll-triggered animations
- `transition` - Animation timing and easing

### Navigation Flow

```
Landing Page (/)
    ↓ [Try Now]
Onboarding (/onboarding?package=standard)
    ↓ [Complete Setup]
Loading Animation (5s)
    ↓
Dashboard (/dashboard)
```

### Query Parameters

Package selection from pricing cards is passed via URL:

```
/onboarding?package=basic
/onboarding?package=standard
/onboarding?package=premium
```

### Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎯 Key Components

### Button Component

Reusable button with variants:

- `primary` - Gradient blue button
- `secondary` - Gray button
- `outline` - Bordered button

Sizes: `sm`, `md`, `lg`

### FeatureCard Component

Displays feature with icon, title, and description.
Includes:

- Entrance animation
- Hover lift effect
- Icon rotation on hover

### PricingCard Component

Shows pricing tier with features list.
Includes:

- Optional "Most Popular" badge
- Animated feature checkmarks
- CTA button with navigation

## 💡 Customization

### Colors

Modify the color scheme in Tailwind classes:

- Primary: `blue-600`, `indigo-600`
- Accents: `green-500`, `purple-600`
- Backgrounds: `gray-50`, `blue-50`

### Animations

Adjust animation timing in Framer Motion props:

```typescript
transition={{ duration: 0.8, delay: 0.2 }}
```

### Content

Update text content directly in the page components:

- Headings in `index.tsx`
- Features array in `index.tsx`
- Pricing plans in `index.tsx`
- Form labels in `onboarding.tsx`

## 📱 Pages Overview

### `/` - Landing Page

- Hero section with CTA
- Features grid (6 features)
- Pricing table (3 tiers)
- Footer

### `/onboarding` - Onboarding Flow

- Step 1: Company name
- Step 2: User details
- Step 3: Package selection
- Loading animation
- Auto-redirect

### `/dashboard` - Dashboard

- Welcome message
- Quick stats
- Next steps guide

## 🎨 UI/UX Highlights

- **Gradient Backgrounds**: Subtle, animated gradient backgrounds
- **Floating Elements**: Background shapes that rotate and scale
- **Card Shadows**: Elevated cards with dynamic shadows
- **Smooth Transitions**: All state changes animated
- **Visual Feedback**: Hover states on all interactive elements
- **Progress Indicators**: Clear step-by-step guidance
- **Loading States**: Engaging loading animations
- **Success States**: Celebratory completion screens

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill existing processes
killall node
# or on Windows
taskkill /F /IM node.exe

# Clean .next folder
rm -rf .next
```

### Tailwind Classes Not Working

Ensure `globals.css` is imported in `_app.tsx`:

```typescript
import '../styles/globals.css';
```

### Animations Not Smooth

Check that Framer Motion is properly installed:

```bash
bun add framer-motion
```

## 📄 License

This is a demo project for POS software landing page and onboarding.

## 🤝 Contributing

Feel free to customize and extend based on your needs!

---

**Built with ❤️ using Next.js, TypeScript, Tailwind CSS v4, and Framer Motion**
