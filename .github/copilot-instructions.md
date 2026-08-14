# KySam Ventures — Web App
## Copilot Repository Instructions

> Place this file at `.github/copilot-instructions.md` in the repo root.
> GitHub Copilot (VS Code + Chat) reads it automatically as project context.

---

## 1. Project summary

**Web application** for **KySam Ventures**, a Delhi-based IT consultancy. Five core screens:
Home, About, Services, Expertise, Contact. Primary goal is lead generation — the
Contact screen posts enquiries to a backend API.

This is a **web-only** app built with React Native for Web (Expo). It runs in any
browser and is responsive from mobile-width (375 px) to wide desktop (1440 px+).
It is NOT distributed as a native iOS/Android app — there are no native builds.

Do not add screens, features, or backend endpoints beyond what's explicitly
requested. Do not introduce new libraries without asking first.

---

## 2. Tech stack (fixed — do not substitute)

| Layer | Choice |
|---|---|
| Platform | **Web only** — `expo export --platform web` builds a static SPA |
| Framework | React Native for Web via Expo (managed workflow, SDK 52, `output: 'single'`) |
| Language | TypeScript, `strict: true` |
| Navigation | Custom top nav bar (`components/layout/TopNav.tsx`) with animated sliding underline — NOT React Navigation tabs. Horizontal ScrollView on narrow (<480 px) viewports, never a hamburger menu. |
| Layout | `PageWrapper` (`components/layout/PageWrapper.tsx`) centers content at max **1280 px** with `paddingHorizontal: 16`. Full-bleed sections (hero, CTA band) are plain Views that contain a `PageWrapper` for their text. |
| Animation | `react-native-reanimated` (nav underline, growth chart bars/line, marquee, counters) |
| Graphics | `react-native-svg` (logo mark, growth chart) |
| Styling | `StyleSheet.create` + centralized theme tokens (no styled-components, no NativeWind, no inline hex/px) |
| HTTP | `fetch` wrapped in a single typed API client (no axios unless a real need appears) |
| Forms | Local component state + a shared validation util (no Formik/RHF for this small a form set) |
| Fonts | IBM Plex Sans (display/headings, weights 600/700), Inter (body, weights 400/500) via `expo-font`; spinner shown while loading |
| Icons | `@expo/vector-icons` (Ionicons outline set) |
| Testing | Jest + React Native Testing Library |
| Linting | ESLint (`@react-native`, `@typescript-eslint`) + Prettier |

---

## 3. Folder structure

```
App.tsx                       # Root entry: font loading + ActivityIndicator, registerRootComponent
src/
  root/
    App.tsx                   # SafeAreaProvider wrapper
    RootNavigator.tsx         # → TopNavigator

  navigation/
    TopNavigator.tsx          # useState<RouteKey> state switcher
    types.ts                  # RouteKey, ScreenProps

  screens/
    home/HomeScreen.tsx       # dark hero (full-bleed) + floating GrowthChart card + fact cards + counter + Marquee + dark CTA band (full-bleed)
    about/AboutScreen.tsx     # intro + philosophy pull-quote + 2-col values grid
    services/ServicesScreen.tsx
    expertise/ExpertiseScreen.tsx
    contact/ContactScreen.tsx

  features/
    contact/
      useContactForm.ts
      contactValidation.ts
      contact.types.ts
    services/
      services.types.ts

  components/
    ui/                       # dumb, reusable, theme-driven only
      Button.tsx
      Card.tsx
      Chip.tsx
      IconBadge.tsx
      TextField.tsx
      SectionLabel.tsx
      Logo.tsx                # SVG logomark — 3 bars, 2-circle sun, 2-layer swoosh
      GrowthChart.tsx         # animated bar/line chart (SVG + Reanimated)
      Marquee.tsx             # looping horizontal scroll (Reanimated)
    layout/
      TopNav.tsx              # full-width bar; inner row maxWidth 1280 + alignSelf center
      ScreenContainer.tsx     # ScrollView shell + auto Footer; NO padding (PageWrapper does it)
      PageWrapper.tsx         # centered max-width wrapper — use this inside every screen
      Footer.tsx              # full-width border; inner row maxWidth 1280 + alignSelf center

  theme/
    colors.ts
    typography.ts
    spacing.ts                # also exports maxContentWidth = 1280
    radius.ts
    index.ts                  # single `theme` export; also re-exports maxContentWidth

  services/
    apiClient.ts
    companyApi.ts
    servicesApi.ts
    expertiseApi.ts
    contactApi.ts

  hooks/
    useApi.ts

  types/
    api.types.ts

  constants/
    config.ts
    content.ts                # ALL screen copy — single source of truth
```

**Rule of thumb:** if Copilot generates a screen file with a `fetch(...)` call
or a raw hex color, that's wrong — route it through `services/` and `theme/`.
If it adds content padding directly to a screen, that's wrong — use `PageWrapper`.

---

## 4. Design tokens

### Colors (`theme/colors.ts`)

```ts
export const colors = {
  navyHero: '#0A2340',   // hero backgrounds, dark CTA band
  navy: '#0F2A4A',
  navyDeep: '#0F3A66',
  blue: '#1C87C9',
  blueLight: '#4FA3D9',
  blueLighter: '#7CC3E8',
  blueTintLight: '#CFE3F3',
  blueTint: '#EAF4FC',
  amber: '#F5A623',      // primary CTAs, active underline, counter
  amberOuter: '#FFC266',
  amberTint: '#FEF3E2',
  amberTextOnTint: '#8A5A0B',
  amberTextOnFill: '#442D06',
  background: '#FAFAF7',
  surface: '#FFFFFF',
  surfaceAlt: '#F8F7F3',
  border: '#ECE9DE',
  textPrimary: '#0A2340',
  textSecondary: '#6B7280',
  textMuted: '#9A9585',
  textOnDark: '#FFFFFF',
  textOnDarkMuted: '#9DBEDD',
} as const;
```

### Typography (`theme/typography.ts`)

```ts
export const typography = {
  fontDisplay: 'IBMPlexSans_600SemiBold',
  fontDisplayBold: 'IBMPlexSans_700Bold',
  fontBody: 'Inter_400Regular',
  fontBodyMedium: 'Inter_500Medium',
  size: { h1: 32, h2: 20, h3: 16, body: 13, small: 11, caption: 9.5 },
} as const;
```

### Spacing & layout (`theme/spacing.ts`)

```ts
export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 18, xxl: 24, xxxl: 32 } as const;
export const maxContentWidth = 1280 as const; // content width cap for all centered sections
```

### Radius (`theme/radius.ts`)

```ts
export const radius = { sm: 8, md: 14, lg: 20, pill: 28 } as const;
```

Every component in `components/ui` consumes `theme`, never a raw value.

---

## 5. Web layout rules

### PageWrapper — the single layout primitive

```tsx
// Every screen wraps its content:
<ScreenContainer>
  <PageWrapper>
    {/* content here */}
  </PageWrapper>
</ScreenContainer>
```

`PageWrapper` provides `maxWidth: 1280, alignSelf: 'center', paddingHorizontal: 16`.
`ScreenContainer` has **no padding** — it is purely a scroll shell.

### Full-bleed sections (hero, CTA band)

Full-bleed sections must NOT be inside the PageWrapper — they go directly inside
`ScreenContainer` so their background extends edge-to-edge. Their text content
uses a PageWrapper internally:

```tsx
{/* Full-bleed dark hero */}
<View style={styles.hero}>          {/* backgroundColor extends full width */}
  <PageWrapper style={styles.heroContent}>
    <Text style={styles.heading}>...</Text>
  </PageWrapper>
</View>
```

Never use `marginHorizontal: -theme.spacing.lg` to escape padding — that was
the old mobile-only approach. Full-bleed is achieved by placing the View outside
any padded container.

### Responsive breakpoints

| Breakpoint | Behavior |
|---|---|
| < 480 px | TopNav items in horizontal ScrollView |
| 480 px – 1280 px | TopNav items inline; content fills width |
| > 1280 px | Content capped at 1280 px and centered; nav bar background extends full width |

---

## 6. Coding standards

### Separation of concerns
- Screens compose, they don't fetch or calculate.
- `components/ui` takes props and renders — no domain knowledge.
- No direct `fetch` outside `services/`.
- Validation in `features/*/validation.ts`, not inline.
- Navigation types centralized in `navigation/types.ts`.

### TypeScript
- `strict: true`, no `any`, no implicit `any`.
- Every component has an explicit `<Component>Props` interface.
- Prefer `type` for unions/aliases, `interface` for object shapes.

### Styling
- `StyleSheet.create` at the bottom of each file.
- No magic numbers — import from `theme/`.
- No inline style objects except for truly dynamic per-render values.
- `maxContentWidth` from `theme` — never hardcode `1280` in a component.

### Naming
- Components: `PascalCase.tsx`.
- Hooks: `useCamelCase.ts`.
- Non-component modules: `camelCase.ts`.
- Types/interfaces: `PascalCase`, no `I` prefix.

### Config & secrets
- All env values come from `.env` via `app.config.ts` — never hardcoded.
- `constants/config.ts` is the only file that reads env — everything else imports from there.

### Error handling
- API errors use a consistent shape (`{ success: false, message }`).
- Screens show friendly messages, not `error.toString()`.

### Testing
- Every `components/ui` component has a render test.
- `useContactForm` and `contactValidation` have unit tests.

### Accessibility
- Every touchable has `accessibilityLabel` and `accessibilityRole`.
- Form fields have associated labels.
- Do not lighten text colors without checking contrast.

### Git hygiene
- Conventional commits (`feat:`, `fix:`, `refactor:`, `chore:`).
- No commented-out code, no `console.log` in committed code.

---

## 7. Running & deploying

```bash
# Dev (opens browser at localhost:8081)
npm start

# Production build → dist/ (static SPA)
npm run build

# Type check
npm run typecheck

# Docker (multi-stage: Node build → nginx serve)
docker build -t kysam-ventures .
docker run -p 80:80 kysam-ventures
```

The `Dockerfile` at the repo root builds the SPA and serves it with nginx.
All paths fall back to `index.html` for client-side routing.

---

## 8. Build order (history + current state)

| Step | Status | Description |
|---|---|---|
| 1 | ✅ Done | Scaffold Expo + TypeScript + theme tokens |
| 2 | ✅ Done | `components/ui` kit: Button, Card, Chip, IconBadge, TextField, SectionLabel |
| 3 | ✅ Done | `services/` API layer + typed `*Api.ts` modules (inert scaffolding) |
| 4 | ✅ Done | Navigation shell + 5 screens with static content |
| 5 | ✅ Done | Animated `TopNav`, Logo SVG, GrowthChart, Marquee, Footer; Home + About rebuilt |
| 6 | ✅ Done | Web-only adaptation: PageWrapper layout system, maxContentWidth, removed native deps |
| 7 | Next | Services/Expertise/Contact visual polish; wire Contact form to live API |
