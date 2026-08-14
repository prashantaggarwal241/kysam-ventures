# KySam Ventures — Mobile App

Official React Native mobile app for **KySam Ventures**, a Delhi-based IT consultancy.  
Five screens (Home, About, Services, Expertise, Contact) focused on lead generation and brand presence.

---

## Table of Contents

1. [Overview](#overview)
2. [Getting started](#getting-started)
3. [Folder structure](#folder-structure)
4. [Architecture & layering rules](#architecture--layering-rules)
5. [Design system](#design-system)
   - [Colors](#colors)
   - [Typography](#typography)
   - [Spacing & radius](#spacing--radius)
6. [Navigation](#navigation)
7. [Screens](#screens)
8. [Component library](#component-library)
9. [How to make changes](#how-to-make-changes)
   - [Change brand colors](#change-brand-colors)
   - [Change fonts](#change-fonts)
   - [Update copy / content](#update-copy--content)
   - [Add or rename a screen](#add-or-rename-a-screen)
   - [Add a new UI component](#add-a-new-ui-component)
   - [Adjust animations](#adjust-animations)
10. [Running the app](#running-the-app)
11. [Testing](#testing)
12. [Package inventory & licenses](#package-inventory--licenses)
13. [Code standards quick-reference](#code-standards-quick-reference)

---

## Overview

| Item | Detail |
|---|---|
| Framework | React Native via Expo (managed workflow, SDK 52) |
| Language | TypeScript — `strict: true`, no `any` |
| Navigation | Custom animated top nav bar (no bottom tabs) |
| Styling | `StyleSheet.create` + centralized theme tokens |
| Animation | `react-native-reanimated` v3 |
| SVG graphics | `react-native-svg` |
| Fonts | IBM Plex Sans (headings) + Inter (body) via `expo-font` |
| Icons | `@expo/vector-icons` (Ionicons) |
| State | Local component state — no Redux/Zustand yet |
| API layer | `services/` — typed `fetch` wrappers, not yet wired to live endpoints |

---

## Getting started

### Prerequisites

- Node.js 18+ and npm
- Expo CLI: `npm install -g expo-cli` (or use `npx expo`)
- For native device testing: Expo Go app (iOS/Android) or a simulator

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
# Interactive Expo dev server (scan QR with Expo Go)
npx expo start

# Web browser (Expo for Web)
npx expo start --web

# Android emulator
npx expo start --android

# iOS simulator (macOS only)
npx expo start --ios
```

---

## Folder structure

```
kysam-ventures/
├── App.tsx                         # Root entry point (Expo looks for this)
├── src/
│   ├── root/
│   │   ├── App.tsx                 # Font loading, SafeAreaProvider
│   │   └── RootNavigator.tsx       # Thin shell → TopNavigator
│   │
│   ├── navigation/
│   │   ├── TopNavigator.tsx        # State-based screen switcher
│   │   └── types.ts                # RouteKey, ScreenProps — shared nav types
│   │
│   ├── screens/
│   │   ├── home/HomeScreen.tsx
│   │   ├── about/AboutScreen.tsx
│   │   ├── services/ServicesScreen.tsx
│   │   ├── expertise/ExpertiseScreen.tsx
│   │   └── contact/ContactScreen.tsx
│   │
│   ├── components/
│   │   ├── ui/                     # Dumb, reusable, theme-driven only
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Chip.tsx
│   │   │   ├── IconBadge.tsx
│   │   │   ├── Logo.tsx            # SVG logo mark
│   │   │   ├── GrowthChart.tsx     # Animated bar + line chart (SVG + Reanimated)
│   │   │   ├── Marquee.tsx         # Looping horizontal scroll (Reanimated)
│   │   │   ├── SectionLabel.tsx
│   │   │   └── TextField.tsx
│   │   └── layout/
│   │       ├── TopNav.tsx          # Animated top navigation bar
│   │       ├── ScreenContainer.tsx # Safe-area wrapper + Footer auto-append
│   │       └── Footer.tsx
│   │
│   ├── theme/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── radius.ts
│   │   └── index.ts               # Single `theme` export
│   │
│   ├── features/
│   │   ├── contact/
│   │   │   ├── contact.types.ts
│   │   │   ├── contactValidation.ts
│   │   │   └── useContactForm.ts
│   │   └── services/
│   │       └── services.types.ts
│   │
│   ├── services/                   # Typed API client (not yet called from screens)
│   │   ├── apiClient.ts
│   │   ├── companyApi.ts
│   │   ├── servicesApi.ts
│   │   ├── expertiseApi.ts
│   │   └── contactApi.ts
│   │
│   ├── hooks/
│   │   └── useApi.ts
│   │
│   ├── types/
│   │   └── api.types.ts            # API response shapes (Company, Service, Expertise, Enquiry)
│   │
│   └── constants/
│       ├── config.ts               # Reads from env — never hardcodes URLs
│       └── content.ts              # All screen copy — single source of truth
│
├── .github/
│   └── copilot-instructions.md    # Architecture rules for AI assistants
├── babel.config.js
├── tsconfig.json
└── package.json
```

---

## Architecture & layering rules

```
constants/content.ts  ← copy/data
theme/                ← design tokens
        ↓
components/ui/        ← dumb, reusable; only reads theme + props
components/layout/    ← structural wrappers (TopNav, ScreenContainer, Footer)
        ↓
screens/              ← composes components; no business logic, no fetch calls
        ↓
navigation/           ← wires screens together; manages active route state
```

**Hard rules:**
- Screens only import components and hooks — never `fetch`, never raw hex colors
- `components/ui` components take props and render; they have no knowledge of domain concepts like "service" or "enquiry"
- All colors, spacing, and font sizes come from `theme/` — never a magic value in a style
- API calls live in `services/*Api.ts` only, called through hooks

---

## Design system

### Colors

All colors are defined in [`src/theme/colors.ts`](src/theme/colors.ts).

| Token | Hex | Usage |
|---|---|---|
| `navyHero` | `#0A2340` | Hero backgrounds, dark CTA band |
| `navy` | `#0F2A4A` | Primary text, dark fills |
| `navyDeep` | `#0F3A66` | Logo bar 2, accent fills |
| `blue` | `#1C87C9` | Logo bar 3, icon badges, chips |
| `blueLight` | `#4FA3D9` | Swoosh front layer |
| `blueLighter` | `#7CC3E8` | Swoosh back layer |
| `blueTintLight` | `#CFE3F3` | Light blue tint backgrounds |
| `blueTint` | `#EAF4FC` | Card/chip tinted fills |
| `amber` | `#F5A623` | Primary CTAs, active underline, counter |
| `amberOuter` | `#FFC266` | Sun outer circle, bar 4 highlight |
| `amberTint` | `#FEF3E2` | Amber chip/badge fills |
| `amberTextOnTint` | `#8A5A0B` | Text on amber tinted backgrounds |
| `amberTextOnFill` | `#442D06` | Text on solid amber buttons |
| `background` | `#FAFAF7` | App background |
| `surface` | `#FFFFFF` | Card backgrounds |
| `surfaceAlt` | `#F8F7F3` | Alternate surface |
| `border` | `#ECE9DE` | Card borders, dividers |
| `textPrimary` | `#0A2340` | Main body text |
| `textSecondary` | `#6B7280` | Supporting text |
| `textMuted` | `#9A9585` | Labels, captions |
| `textOnDark` | `#FFFFFF` | Text on dark/hero backgrounds |
| `textOnDarkMuted` | `#9DBEDD` | Muted text on dark backgrounds |

### Typography

Defined in [`src/theme/typography.ts`](src/theme/typography.ts).

| Token | Font | Weight | Usage |
|---|---|---|---|
| `fontDisplay` | IBM Plex Sans | 600 SemiBold | Headings, nav labels active, card titles |
| `fontDisplayBold` | IBM Plex Sans | 700 Bold | Hero headline, K watermark, counter number |
| `fontBody` | Inter | 400 Regular | Body copy, descriptions |
| `fontBodyMedium` | Inter | 500 Medium | Button labels, eyebrow text, section captions |

Font sizes (`typography.size`):

| Key | Value | Usage |
|---|---|---|
| `h1` | 32 | Hero headline |
| `h2` | 20 | Section headings, pull-quote |
| `h3` | 16 | Card titles, service names |
| `body` | 13 | Body paragraphs |
| `small` | 11 | Nav labels, chip text, fact labels |
| `caption` | 9.5 | Section labels (UPPERCASE) |

### Spacing & radius

`spacing` tokens: `xs(4)` · `sm(8)` · `md(12)` · `lg(16)` · `xl(18)` · `xxl(24)` · `xxxl(32)`

`radius` tokens: `sm(8)` · `md(14)` · `lg(20)` · `pill(28)`

---

## Navigation

Navigation is a **plain React state switcher** — no React Navigation tabs involved. The active screen is a `RouteKey` string in `useState`.

```
TopNavigator (useState<RouteKey>)
  └── TopNav (receives activeRoute + onNavigate)
  └── [active screen component] (receives navigate callback)
```

**`TopNav`** (`src/components/layout/TopNav.tsx`):
- Logo mark + "KYSAM VENTURES" wordmark on the left
- Five nav items with an amber animated underline (`withTiming`, 210 ms)
- On viewports narrower than **480 px** the nav items go into a horizontal `ScrollView` — no hamburger menu
- "Let's talk" pill (routes to Contact) always visible on the right
- Handles the top safe-area inset internally via `useSafeAreaInsets()`

**Screen props** — every screen receives:
```ts
interface ScreenProps {
  navigate: (route: RouteKey) => void;
}
```

---

## Screens

| Screen | File | Description |
|---|---|---|
| Home | [`src/screens/home/HomeScreen.tsx`](src/screens/home/HomeScreen.tsx) | Dark hero + K watermark, animated GrowthChart card, fact cards, live counter (0→6), service Marquee, dark CTA band |
| About | [`src/screens/about/AboutScreen.tsx`](src/screens/about/AboutScreen.tsx) | Company intro, philosophy pull-quote (amber left border), 2-column values grid |
| Services | [`src/screens/services/ServicesScreen.tsx`](src/screens/services/ServicesScreen.tsx) | 6 service cards with icon badges |
| Expertise | [`src/screens/expertise/ExpertiseScreen.tsx`](src/screens/expertise/ExpertiseScreen.tsx) | Expertise areas grid + industry chips |
| Contact | [`src/screens/contact/ContactScreen.tsx`](src/screens/contact/ContactScreen.tsx) | Email + location + mailto CTA |

---

## Component library

### `components/ui/`

| Component | Props | Purpose |
|---|---|---|
| `Button` | `label`, `onPress`, `variant?` (`primary`\|`secondary`), `disabled?` | Pill CTA button; primary = amber fill, secondary = outlined |
| `Card` | `children`, `variant?` (`surface`\|`tinted`\|`filled`), `style?` | Rounded container; surface = white border, tinted = blueTint, filled = navy |
| `Chip` | `label`, `tone?` (`blue`\|`amber`\|`neutral`), `selected?` | Tag/badge pill |
| `IconBadge` | `iconName`, `tone?` (`blue`\|`amber`), `size?` (`sm`\|`md`\|`lg`) | Circular icon container |
| `Logo` | `size?` (default 40) | SVG logo mark — three building bars, sun, swoosh |
| `GrowthChart` | `data?` (array of 0–1 normalized values, default 4 items) | Animated bar chart with amber spline; bars stagger-in on mount |
| `Marquee` | `items` (string array) | Infinite horizontal scroll of items with separator dots |
| `SectionLabel` | `children` (string) | All-caps caption label |
| `TextField` | `label`, `value`, `onChangeText`, `error?`, `multiline?`, `required?` | Labelled text input |

### `components/layout/`

| Component | Props | Purpose |
|---|---|---|
| `TopNav` | `activeRoute`, `onNavigate` | Animated top nav bar |
| `ScreenContainer` | `children`, `scrollable?`, `noFooter?` | Safe-area + scroll wrapper; auto-appends Footer unless `noFooter` |
| `Footer` | — | Copyright + tagline bar; auto-included by ScreenContainer |

---

## How to make changes

### Change brand colors

Edit **[`src/theme/colors.ts`](src/theme/colors.ts)** only.  
Every component reads from `theme.colors.*` — changing a token here propagates everywhere automatically.

```ts
// Example: darken the primary amber
amber: '#E8950F',  // was #F5A623
```

### Change fonts

1. Install the new `@expo-google-fonts/<family>` package:
   ```bash
   npx expo install @expo-google-fonts/roboto
   ```
2. Import and add it to `useFonts(...)` in [`src/root/App.tsx`](src/root/App.tsx).
3. Update the token in [`src/theme/typography.ts`](src/theme/typography.ts):
   ```ts
   fontDisplay: 'Roboto_700Bold',
   ```
   Everything that uses `theme.typography.fontDisplay` updates automatically.

### Update copy / content

All on-screen text lives in **[`src/constants/content.ts`](src/constants/content.ts)**.  
No hunting across screen files needed.

| Export | What it controls |
|---|---|
| `homeContent` | Hero eyebrow, headline, subtext, fact cards |
| `aboutContent` | Eyebrow, heading, intro paragraph, philosophy pull-quote |
| `coreValues` | Values grid on About screen |
| `services` | Six service cards (name, icon, description) |
| `expertiseAreas` | Chip list on Expertise screen |
| `industries` | Industry chip list on Expertise screen |
| `contactContent` | Email address, location |

### Add or rename a screen

1. Add the new key to `RouteKey` in [`src/navigation/types.ts`](src/navigation/types.ts):
   ```ts
   export type RouteKey = 'Home' | 'About' | ... | 'Team';
   ```
2. Create `src/screens/team/TeamScreen.tsx` — accept `ScreenProps`, use `ScreenContainer`.
3. Add the screen to [`src/navigation/TopNavigator.tsx`](src/navigation/TopNavigator.tsx):
   ```tsx
   import TeamScreen from '../screens/team/TeamScreen';
   // ...
   {activeRoute === 'Team' && <TeamScreen navigate={navigate} />}
   ```
4. Add the nav item to `NAV_ITEMS` array in [`src/components/layout/TopNav.tsx`](src/components/layout/TopNav.tsx):
   ```ts
   { route: 'Team', label: 'Team' },
   ```

### Add a new UI component

Create `src/components/ui/MyComponent.tsx`:

```tsx
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

export interface MyComponentProps {
  label: string;
}

export default function MyComponent({ label }: MyComponentProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: theme.spacing.md },
  text: {
    fontFamily: theme.typography.fontBody,
    fontSize: theme.typography.size.body,
    color: theme.colors.textPrimary,
  },
});
```

Add a render test in `src/components/ui/__tests__/MyComponent.test.tsx`.

### Adjust animations

**TopNav underline** — duration is `210 ms` in [`src/components/layout/TopNav.tsx`](src/components/layout/TopNav.tsx):
```ts
indicatorX.value = withTiming(layout.x, { duration: 210 });
```

**GrowthChart bars** — stagger delay and duration in [`src/components/ui/GrowthChart.tsx`](src/components/ui/GrowthChart.tsx):
```ts
const STAGGER_MS = 80;   // delay between bars
const DURATION_MS = 550; // each bar's grow duration
```

**Marquee speed** — pixels per second in [`src/components/ui/Marquee.tsx`](src/components/ui/Marquee.tsx):
```ts
const SPEED_PX_PER_SEC = 40; // increase to scroll faster
```

**Home screen counter** — in [`src/screens/home/HomeScreen.tsx`](src/screens/home/HomeScreen.tsx):
```ts
const COUNTER_TARGET = 6;
const COUNTER_DURATION_MS = 700;
```

---

## Running the app

| Command | What it does |
|---|---|
| `npx expo start` | Opens the Expo dev server; scan QR with Expo Go |
| `npx expo start --web` | Runs in browser via Expo for Web |
| `npx expo start --android` | Opens in Android emulator |
| `npx expo start --ios` | Opens in iOS simulator (macOS only) |
| `npm run lint` | ESLint check |
| `npm run typecheck` | TypeScript type check (no emit) |

---

## Testing

```bash
npm test           # run Jest in watch mode
npm test -- --watchAll=false  # single run (CI)
```

Tests live next to their component in `__tests__/` subdirectories.  
Current coverage: `Button`, `Card`, `Chip`, `SectionLabel`, `TextField`, `IconBadge`.

The test runner is **Jest** with the **jest-expo** preset, and components are rendered with **React Native Testing Library**.

---

## Package inventory & licenses

All licenses are **MIT** unless noted.

### Runtime dependencies

| Package | Version | License | Purpose |
|---|---|---|---|
| `expo` | ~52.0.0 | MIT | Managed React Native runtime & toolchain |
| `react` | 18.3.1 | MIT | UI rendering library |
| `react-native` | 0.76.3 | MIT | Native mobile framework |
| `react-native-reanimated` | ~3.16.1 | MIT | 60fps animations (nav underline, chart, marquee) |
| `react-native-svg` | 15.8.0 | MIT | SVG rendering (Logo, GrowthChart) |
| `react-native-safe-area-context` | 4.12.0 | MIT | Status bar / notch inset handling |
| `react-native-screens` | ~4.1.0 | MIT | Native navigation screen primitives |
| `react-native-web` | ~0.19.13 | MIT | Renders React Native components in a browser |
| `expo-font` | ~13.0.0 | MIT | Custom font loading with splash-screen integration |
| `expo-constants` | ~17.0.0 | MIT | Access to `app.json` / `app.config.ts` values |
| `expo-splash-screen` | ~0.29.0 | MIT | Keeps splash screen visible until fonts load |
| `expo-status-bar` | ~2.0.0 | MIT | Status bar style control |
| `@expo/vector-icons` | ^14.0.0 | MIT | Icon sets (Ionicons used throughout) |
| `@expo/metro-runtime` | ~4.0.1 | MIT | Metro bundler runtime for Expo web |
| `@expo-google-fonts/ibm-plex-sans` | ^0.4.1 | MIT + OFL-1.1* | IBM Plex Sans font family (display/heading type) |
| `@expo-google-fonts/inter` | ^0.2.3 | MIT | Inter font family (body type) |

> *OFL-1.1 = SIL Open Font Licence 1.1. This licence applies to the IBM Plex Sans font files themselves and permits free use, including in commercial products, with the restriction that the fonts may not be sold on their own.

### Development dependencies

| Package | Version | License | Purpose |
|---|---|---|---|
| `typescript` | ^5.3.0 | Apache-2.0 | Type checking |
| `babel-preset-expo` | ~12.0.0 | MIT | Babel transpilation preset for Expo |
| `@babel/core` | ^7.24.0 | MIT | Babel core compiler |
| `jest` | ^29.7.0 | MIT | Test runner |
| `jest-expo` | ~52.0.0 | MIT | Expo-aware Jest preset |
| `@testing-library/react-native` | ^12.4.0 | MIT | Component render testing utilities |
| `eslint` | ^8.57.0 | MIT | Linting |
| `@typescript-eslint/parser` | ^6.21.0 | MIT | TypeScript parser for ESLint |
| `@typescript-eslint/eslint-plugin` | ^6.21.0 | MIT | TypeScript-specific lint rules |
| `@react-native-community/eslint-config` | ^3.2.0 | MIT | React Native community lint rules |
| `prettier` | ^3.3.0 | MIT | Code formatting |
| `eslint-plugin-prettier` | ^5.0.0 | MIT | Runs Prettier as an ESLint rule |
| `@types/react` | ~18.3.12 | MIT | TypeScript types for React |
| `@babel/eslint-parser` | ^7.24.0 | MIT | Babel-based parser for ESLint |

---

## Code standards quick-reference

- **No magic values** in component styles — always `theme.colors.*`, `theme.spacing.*`, `theme.radius.*`
- **No `fetch` calls** outside `services/` — screens use hooks, hooks call the API layer
- **No business logic in `components/ui/`** — those components take props and render, nothing else
- **Every screen prop has an explicit interface** named `<Screen>Props`, extending `ScreenProps`
- **`strict: true`** TypeScript — no `any`, no implicit types
- **Conventional commits**: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`
- **Accessibility**: every touchable has `accessibilityRole` + `accessibilityLabel`

---

*Build · Grow · Create value*
