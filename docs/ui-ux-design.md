# UI/UX Design Guidelines - BloodCare PWA

## 1. Visual Identity & Gen-Z Aesthetic

### 1.1 Design Philosophy
The UI is designed to be highly engaging, approachable, and appealing to Gen-Z. It moves away from sterile medical designs and instead uses a playful, "gamified" approach with cute micro-interactions and soft, rounded elements (squircle shapes, glassmorphism).

### 1.2 Color Schemes
#### Dark Theme (Default)
- **Background**: `#1A1A24` (Soft Dark Blue/Purple tint)
- **Card / Surface Background**: `rgba(255, 255, 255, 0.05)` with blur (Glassmorphism)
- **Primary Accent**: `#FF6B6B` (Vibrant Coral/Heart Red)
- **Secondary Accent**: `#FF8E8B` (Pastel Pink)
- **Text Primary**: `#FFFFFF`
- **Text Secondary**: `#A0AEC0`
- **Border / Divider**: `rgba(255, 255, 255, 0.1)`

#### Light Theme
- **Background**: `#F4F7FE` (Soft Pastel Blue)
- **Card / Surface Background**: `#FFFFFF` with soft, colorful drop shadows
- **Primary Accent**: `#FF4757` (Punchy Red)
- **Secondary Accent**: `#FFA502` (Playful Orange)
- **Text Primary**: `#2D3436`
- **Text Secondary**: `#636E72`
- **Border / Divider**: `#DFE4EA`

---

## 2. Animations & Micro-Interactions (Playful / "Cute" Vibe)

### 2.1 Mascot & Hero Animation
- **Beating Heart Mascot**: A cute 2D vector or lightweight 3D heart character at the top of the dashboard. It gently floats (y-axis translation) and has a heartbeat scaling animation.
- **Reaction States**: If the check result is "Normal", the mascot smiles and shoots confetti. If "Hypertension", it shows a surprised/concerned cute expression.

### 2.2 UI Element Animations
- **Buttons**: Bouncy / elastic spring animations on hover and tap (`transform: scale(0.95)` on active, springing back on release).
- **Page Transitions**: Smooth slide and fade transitions when opening the hamburger drawer or viewing history.
- **Inputs**: Glowing animated borders when an input field is focused.

---

## 3. Layout Structure

### 3.1 Fixed Header
- **Position**: Sticky / Fixed Top (`top: 0`, `z-index: 1000`).
- **Left Side**:
  - Application Icon.
  - Main Title: **BloodCare** (Using a rounded, friendly, modern sans-serif font like 'Nunito' or 'Quicksand').
  - Sub-tagline: *'Guard Your Heart Health'* (Small text).
- **Right Side**:
  - Hamburger Menu Icon button (`☰`) with a soft hover highlight.

### 3.2 Hamburger Drawer Items
Drawer opens smoothly with an elastic bounce.
1. 👤 **Create Account**
2. ✏️ **Edit Account**
3. 📜 **History**
4. 🌓 **Theme**
5. 🌐 **Language**

### 3.3 Dashboard Content (Main View)
- **4 Input Form Grid**: Soft rounded input fields with playful placeholder text.
  1. Systolic input (`number`, required).
  2. Diastolic input (`number`, required).
  3. Pulse / BPM input (`number`, optional).
  4. Account Dropdown (`select`, optional).
- **Primary Action**: Chunky, vibrant gradient button: **"Check Now"** with a subtle pulsating glow.
- **Result Panel**:
  - Pops up with a spring animation.
  - Category Badge with bright, friendly colors.
  - **Results & Recommendations**: Displayed in conversational, encouraging language.

### 3.4 History View Card Design
Cards look like collectible items or widgets with soft shadows and rounded corners.
```
+-------------------------------------------------------------+
|  [Profile Name]                     [Category Color Badge]  |
|  📅 2026-09-03 14:30                                        |
|                                                             |
|  SYS / DIA : 120 / 80 mmHg          PULSE: 72 BPM           |
|  STATUS    : Normal                 [Cute Emoji Icon]       |
+-------------------------------------------------------------+
```

### 3.5 Fixed / Bottom Footer
- Centered text with padding.
- Text: `❤️ Track daily, live healthy. Made with care for your heart.`
- Clean, non-intrusive muted styling.