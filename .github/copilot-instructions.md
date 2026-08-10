# KySam Ventures — React Native App
## Copilot Repository Instructions

> Place this file at `.github/copilot-instructions.md` in the repo root.
> GitHub Copilot (VS Code + Chat) reads it automatically as project context.

---

## 1. Project summary

Mobile app for **KySam Ventures**, a Delhi-based IT consultancy. Five core screens:
Home, About, Services, Expertise, Contact. Primary goal is lead generation — the
Contact screen posts enquiries to a backend API. This is v1: keep scope small,
keep the architecture clean and expandable.

Do not add screens, features, or backend endpoints beyond what's explicitly
requested. Do not introduce new libraries without asking first.

---

## 2. Tech stack (fixed — do not substitute)

| Layer | Choice |
|---|---|
| Framework | React Native (Expo, managed workflow) |
| Language | TypeScript, `strict: true` |
| Navigation | React Navigation (bottom tabs + native stack) |
| Styling | `StyleSheet.create` + centralized theme tokens (no styled-components, no NativeWind, no inline hex/px) |
| HTTP | `fetch` wrapped in a single typed API client (no axios unless a real need appears) |
| Forms | Local component state + a shared validation util (no Formik/RHF for this small a form set) |
| Fonts | Space Grotesk (display), Inter (body) via `expo-font` |
| Icons | `@expo/vector-icons` (Tabler-style outline set, or `react-native-vector-icons` if unavailable) |
| Testing | Jest + React Native Testing Library |
| Linting | ESLint (`@react-native`, `@typescript-eslint`) + Prettier |

---

## 3. Folder structure

Mirrors the backend's "modular monolith" approach from the FRS — organized by
feature, not by file type, so each screen's logic stays together and nothing
reaches across boundaries it shouldn't.

```
src/
  app/
    App.tsx                 # entry, providers only
    RootNavigator.tsx

  navigation/
    TabNavigator.tsx
    types.ts                 # route param types, no `any`

  screens/
    home/
      HomeScreen.tsx          # composes components only, no business logic
    about/
      AboutScreen.tsx
    services/
      ServicesScreen.tsx
    expertise/
      ExpertiseScreen.tsx
    contact/
      ContactScreen.tsx

  features/
    contact/
      useContactForm.ts       # form state + validation, no UI
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
    layout/
      ScreenContainer.tsx     # safe area + background wrapper
      TabBar.tsx

  theme/
    colors.ts
    typography.ts
    spacing.ts
    radius.ts
    index.ts                  # single `theme` export, everything above composed here

  services/
    apiClient.ts               # one fetch wrapper: base URL, headers, error shape
    companyApi.ts
    servicesApi.ts
    expertiseApi.ts
    contactApi.ts

  hooks/
    useApi.ts                  # generic loading/error/data hook

  types/
    api.types.ts                # shapes matching the backend FRS (Company, Service, Expertise, Enquiry)

  constants/
    config.ts                   # reads from env, never hardcodes URLs

  assets/
    fonts/
    logo/
```

**Rule of thumb:** if Copilot generates a screen file with a `fetch(...)` call
or a raw hex color inside it, that's wrong — stop and route it through
`services/` and `theme/` instead.

---

## 4. Design tokens

These come directly from the approved mockups and the KySam logo. Define them
once in `theme/`, never restate the raw values anywhere else in the app.

```ts
// theme/colors.ts
export const colors = {
  navy: '#0F2A4A',
  navyDeep: '#154C82',
  blue: '#1C87C9',
  blueLight: '#7CB4DE',
  blueTintLight: '#CFE3F3',
  blueTint: '#EAF4FC',
  amber: '#F5A623',
  amberTint: '#FEF3E2',
  amberTextOnTint: '#8A5A0B',
  amberTextOnFill: '#442D06',
  background: '#FAFAF7',
  surface: '#FFFFFF',
  border: '#ECE9DE',
  textPrimary: '#0F2A4A',
  textSecondary: '#4E5761',
  textMuted: '#7A7563',
  navInactive: '#B4AF9E',
} as const;
```

```ts
// theme/typography.ts
export const typography = {
  fontDisplay: 'SpaceGrotesk_600SemiBold',
  fontDisplayMedium: 'SpaceGrotesk_500Medium',
  fontBody: 'Inter_400Regular',
  fontBodyMedium: 'Inter_500Medium',
  size: { h1: 23, h2: 18, h3: 15, body: 13, small: 11, caption: 9.5 },
} as const;
```

```ts
// theme/spacing.ts
export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 18, xxl: 24, xxxl: 32 } as const;

// theme/radius.ts
export const radius = { sm: 8, md: 14, lg: 20, pill: 28 } as const;
```

Every component in `components/ui` consumes `theme`, never a raw value.
This is what "standard stylesheet" means in practice: one source of truth,
every screen inherits it, changing a brand color means editing one file.

---

## 5. Coding standards — what to instruct Copilot to follow

Paste these as ground rules; Copilot Chat should treat them as non-negotiable
for this repo.

### Separation of concerns / no tight coupling
- **Screens compose, they don't fetch or calculate.** A screen file imports
  components and a hook, renders them, and does nothing else.
- **No business logic in `components/ui`.** Those components take props and
  render — they don't know what a "service" or "enquiry" is.
- **No direct `fetch`/`axios` calls outside `services/`.** Every API call is a
  named function in `services/*Api.ts` with a typed return, imported by hooks
  or screens — never inlined.
- **Validation lives in `features/*/*.validation.ts`**, not inside JSX or
  inline handlers.
- **Navigation types are centralized** in `navigation/types.ts` — no
  stringly-typed route names scattered across screens.

### TypeScript
- `strict: true`, no `any`, no implicit `any`.
- Every component has an explicit `Props` interface, named `<Component>Props`.
- Shared API/domain shapes live in `types/api.types.ts` and mirror the backend
  FRS exactly (`Company`, `Service`, `Expertise`, `Enquiry`, `EnquiryStatus`).
- Prefer `type` for unions/aliases, `interface` for object shapes/props.

### Styling
- `StyleSheet.create` at the bottom of each component file.
- No magic numbers for color, spacing, or radius — import from `theme/`.
- No inline style objects except for truly dynamic, per-render values
  (e.g. an animated width) — and even those should reference theme tokens
  for color/spacing.

### Naming
- Components: `PascalCase.tsx`, filename matches the exported component.
- Hooks: `useCamelCase.ts`.
- Non-component modules (services, utils, validation): `camelCase.ts`.
- Types/interfaces: `PascalCase`, no `I` prefix (`Service`, not `IService`).

### Config & secrets
- All environment-specific values (API base URL, keys) come from `.env` via
  `expo-constants` / `app.config.ts` — never hardcoded, never committed.
- `constants/config.ts` is the only file that reads `process.env` /
  `Constants.expoConfig.extra` — everything else imports from there.

### Error handling
- API errors return a consistent shape (`{ success: false, message }`, matching
  the backend's error contract in the FRS) — never let a raw exception reach
  the UI. Screens show a friendly message, not `error.toString()`.

### Testing
- Every component in `components/ui` gets a render test.
- `useContactForm` and `contactValidation` get unit tests, including invalid
  email, empty required fields, and message length limits.

### Accessibility
- Every touchable has `accessibilityLabel` and `accessibilityRole`.
- Form fields have associated labels, not just placeholder text.
- Color contrast follows the theme as designed — don't lighten text colors
  for "polish" without checking contrast.

### Git / PR hygiene
- Conventional commits (`feat:`, `fix:`, `refactor:`, `chore:`).
- One feature/screen per branch and PR where practical.
- No commented-out code, no console.log left in committed code.

---

## 6. Build order (suggested prompts to give Copilot, in sequence)

1. "Scaffold the Expo + TypeScript project with the folder structure and
   theme tokens from `.github/copilot-instructions.md`, no screens yet."
2. "Build the `components/ui` kit: Button, Card, Chip, IconBadge, TextField,
   SectionLabel — theme-driven, no business logic, with render tests."
3. "Build `services/apiClient.ts` and the typed `*Api.ts` modules for
   company, services, expertise, and contact endpoints, matching the FRS
   error/response shapes."
4. "Build the bottom tab navigator with the 5 screens as empty containers
   using `ScreenContainer`."
5. "Build the Home screen using only components from `components/ui`."
6. Repeat per screen: Services, Expertise, About, then Contact (Contact last —
   it depends on `useContactForm` + `contactApi`).

Building the UI kit and API layer before any screen is what prevents the
tight coupling — screens are wired against contracts that already exist.
