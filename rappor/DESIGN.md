---
name: RAPPOR
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#44474e'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#465f88'
  primary: '#000a1e'
  on-primary: '#ffffff'
  primary-container: '#002147'
  on-primary-container: '#708ab5'
  inverse-primary: '#aec7f6'
  secondary: '#115cb9'
  on-secondary: '#ffffff'
  secondary-container: '#659dfe'
  on-secondary-container: '#003370'
  tertiary: '#000e0b'
  on-tertiary: '#ffffff'
  tertiary-container: '#002722'
  on-tertiary-container: '#009a89'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#aec7f6'
  on-primary-fixed: '#001b3d'
  on-primary-fixed-variant: '#2d476f'
  secondary-fixed: '#d7e2ff'
  secondary-fixed-dim: '#acc7ff'
  on-secondary-fixed: '#001a40'
  on-secondary-fixed-variant: '#004491'
  tertiary-fixed: '#79f7e3'
  tertiary-fixed-dim: '#59dbc7'
  on-tertiary-fixed: '#00201c'
  on-tertiary-fixed-variant: '#005047'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  button:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  container-max: 1200px
  gutter: 24px
---

## Brand & Style

The design system is engineered for an educational environment that demands the rigor of academia and the efficiency of modern technology. The brand personality is **Institutional yet Innovative**, prioritizing clarity and trust to facilitate learning and administrative excellence.

The visual style is **Corporate / Modern**, leaning heavily into a refined functionalism. It avoids unnecessary decorative elements, instead using structured layouts and a restrained color palette to signal stability and professional intent. The UI aims to evoke a sense of calm authority, reducing the cognitive load for students and educators through a logic-driven interface.

## Colors

The color strategy for this design system is built upon a foundation of "Safe" institutional blues. 
- **Primary Color:** A deep navy (`#002147`) used for core branding, navigation backgrounds, and primary headings to establish immediate gravity.
- **Secondary Color:** A professional mid-tone blue used for interactive elements and highlights.
- **Tertiary/Success Color:** A bright teal (`#00a896`) represents progress, success, and completion, providing a modern "tech-forward" contrast to the classic navy.
- **Neutral Palette:** Utilizes a range of cool grays to maintain a clean, "light" mode environment that feels airy and legible.

## Typography

This design system utilizes **Inter** exclusively to ensure a systematic and utilitarian feel. The typeface’s high x-height and neutral character make it ideal for dense educational data and long-form reading.

- **Hierarchy:** We use a tight scale where weight distinguishes the purpose. Headlines are semi-bold to bold, while body copy remains at regular weight for maximum legibility.
- **Scale:** On mobile devices, large display headings scale down to prevent excessive wrapping.
- **Labels:** Small labels and captions use a slightly increased letter-spacing and semi-bold weight to maintain readability at smaller scales.

## Layout & Spacing

The layout philosophy is based on a **Fixed Grid** model for desktop to ensure content remains readable and focused, transitioning to a fluid model for mobile.

- **Rhythm:** An 8px linear scale governs all padding and margins. Generous whitespace (`xxl` units) is used between major sections to prevent visual clutter, essential for an educational context.
- **Grid:** A 12-column grid is used for desktop (1200px max-width).
- **Adaptive Rules:**
  - **Desktop:** 24px margins, 24px gutters.
  - **Tablet:** 16px margins, 16px gutters.
  - **Mobile:** 16px margins, single column reflow for cards and forms.

## Elevation & Depth

This design system uses **Tonal Layers** combined with **Ambient Shadows** to create a structured sense of depth.

- **Surface Levels:** The background uses the neutral base. Cards and containers use a pure white surface to pop against the subtle gray background.
- **Shadows:** We use low-opacity, highly diffused shadows (e.g., `0px 4px 20px rgba(0, 33, 71, 0.08)`) to lift interactive elements like cards and buttons. The shadows are slightly tinted with the Primary Navy color to ensure they feel integrated into the brand palette rather than muddy.
- **Dividers:** Use soft, 1px borders in a light gray for internal list separation where elevation is not required.

## Shapes

The shape language is consistently **Rounded**, using a 0.5rem (8px) base radius. This softens the "Safe" blue palette, making the institutional feel more approachable for students.

- **Standard Elements:** Buttons, input fields, and small cards use the base 8px radius.
- **Large Containers:** Modals and large dashboard sections use the `rounded-lg` (16px) or `rounded-xl` (24px) tokens to create a softer, more modern framing effect.

## Components

### Buttons
- **Primary:** Solid Primary Navy background with White text. 8px corner radius.
- **Success/CTA:** Solid Tertiary Teal background. Used for "Start Course" or "Submit Application."
- **Role Selection:** Large, card-style buttons with an icon, a bold label, and a subtle border that thickens and changes color to Primary Blue when selected.

### Input Fields & Forms
- **Standard Inputs:** 1px border in neutral-gray, 8px radius. On focus, the border transitions to Primary Blue with a subtle outer glow.
- **OTP Inputs:** High-contrast, individual square boxes with 8px radius. The active box features a thicker Primary Blue bottom border.

### Cards
- **Course/Module Cards:** White background, subtle ambient shadow, 8px radius. Features a Tertiary Teal progress bar at the bottom to indicate completion.

### Chips & Badges
- **Status Badges:** Small, pill-shaped elements with low-opacity backgrounds (e.g., 10% Teal for "Completed", 10% Navy for "Draft"). Text is high-contrast within the same hue.

### Lists
- **Resource Lists:** Clean, 1px bordered rows with generous vertical padding (16px) and chevron indicators to suggest drill-down actions.