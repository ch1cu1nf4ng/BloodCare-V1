# Features & Business Logic - BloodCare PWA

## 1. Feature Specifications

### 1.1 Dashboard & Instant Measurement Input
- **Systolic Input**: Mandatory numeric input (mmHg).
- **Diastolic Input**: Mandatory numeric input (mmHg).
- **Pulse / Heart Rate (BPM)**: Optional numeric input.
- **Account / Profile Selector**: Dropdown menu populated from created profiles. Optional to select.
- **"Check Now" Button**: Evaluates systolic/diastolic values immediately, displaying calculated results, health recommendations, and potential consequences if left untreated.

### 1.2 User Account / Profile Management
- **Create Profile**:
  - Fields: Name (Unique identifier, string) and Date of Birth (`YYYY-MM-DD`).
  - Validation: Prevents duplicate profile names.
- **Edit / Delete Profile**:
  - Allows editing Name and Date of Birth.
  - Deletes profile along with associated measurement history upon confirmation.

### 1.3 Measurement History
- Displays record cards containing:
  - Account Name.
  - Full Timestamp (Date and Time: `YYYY-MM-DD HH:mm`).
  - Systolic / Diastolic values and Pulse (if available).
  - Classification Status (Category with visual color coding).
- **Filter**: Dropdown/selector to filter history entries by specific account profile.

### 1.4 Theme Switcher
- Modes: Dark (Default) and Light.
- Toggle available via the Hamburger Navigation Drawer.
- Persisted in client storage.

### 1.5 Internationalization (i18n)
- Supported Languages: English (Default) and Bahasa Indonesia.
- Dynamic text replacement across UI components upon language change.

---

## 2. Business Logic & Rules

### 2.1 History Storage Logic
- **Condition A (Account Selected)**:
  - If a valid Profile/Account is selected from the dropdown:
  - The measurement **MUST** be saved to History with a timestamp (`YYYY-MM-DD HH:mm`), regardless of whether Pulse/BPM is filled or left blank.
- **Condition B (No Account Selected / Anonymous Check)**:
  - If the Account selector is left empty/unselected:
  - The measurement is treated as a Quick Check.
  - The system displays calculated Results, Recommendations, and Health Risks, but **DOES NOT** save the entry to History.

### 2.2 Blood Pressure Classification Algorithm

Evaluated according to standard clinical guidelines (AHA/ESH standards):

| Category | Systolic (mmHg) | Condition | Diastolic (mmHg) | Category Severity / Color |
| :--- | :--- | :--- | :--- | :--- |
| **Normal** | < 120 | AND | < 80 | Green (`#2e7d32`) |
| **Elevated / Prehypertension** | 120 - 129 | AND | < 80 | Yellow/Amber (`#f57f17`) |
| **Hypertension Stage 1** | 130 - 139 | OR | 80 - 89 | Orange (`#e65100`) |
| **Hypertension Stage 2** | ≥ 140 | OR | ≥ 90 | Red (`#c62828`) |
| **Hypertensive Crisis** | > 180 | OR | > 120 | Dark Red / Crimson (`#880e4f`) |

*Note: If Systolic and Diastolic fall into different categories, the higher severity category is selected.*

---

## 3. Localization Matrix (i18n)

| Key | English (en) | Bahasa Indonesia (id) |
| :--- | :--- | :--- |
| `app_jargon` | Guard Your Heart Health | Jaga Kesehatan Jantung Anda |
| `footer_text` | ❤️ Track daily, live healthy. Made with care for your heart. | ❤️ Pantau harian, hidup sehat. Dibuat dengan kepedulian untuk jantung Anda. |
| `nav_create_acc` | Create Account | Buat Akun |
| `nav_edit_acc` | Edit Account | Edit Akun |
| `nav_history` | History | Riwayat |
| `nav_theme` | Theme | Tema |
| `nav_language` | Language | Bahasa |
| `btn_check` | Check Now | Cek Sekarang |
| `lbl_systolic` | Systolic (mmHg) | Sistolik (mmHg) |
| `lbl_diastolic` | Diastolic (mmHg) | Diastolik (mmHg) |
| `lbl_pulse` | Pulse (BPM) [Optional] | Denyut Nadi (BPM) [Opsional] |
| `lbl_account` | Select Profile [Optional] | Pilih Profil [Opsional] |


## 4. Dynamic Results & Content Variation (Anti-Monotonous)

To ensure the app feels engaging and avoids repetitive static text after clicking "Check Now", the system uses a randomized response array for each blood pressure category.

### 4.1 Dynamic Response Arrays
When a measurement is classified, the app will randomly select one message from the corresponding category array:

- **Normal (Green)**
  - "Cakep! Tekanan darahmu stabil banget. Pertahankan pola hidup sehatmu, ya!"
  - "Wah, jantungmu lagi seneng nih. Tetap rileks dan jaga makan!"
  - "Perfect score! Tekanan darah normal, kamu siap jalani hari dengan maksimal."

- **Elevated / Prehypertension (Yellow)**
  - "Hmm, agak naik sedikit nih. Coba kurangi begadang dan minum air putih yang cukup ya."
  - "Lampu kuning! Yuk, mulai perhatikan asupan garam dan sempatkan jalan kaki santai."
  - "Sedikit di atas normal. Jangan lupa rehat sebentar kalau lagi banyak pikiran."

- **Hypertension Stage 1 & 2 (Orange/Red)**
  - "Tekanan darahmu lagi tinggi. Kurangi stres, tarik napas dalam, dan pertimbangkan untuk konsultasi."
  - "Whoa, angka ini butuh perhatian. Kurangi garam ekstra dan jangan lupa istirahat yang bener!"
  - "Waktunya slow down. Jaga pola makan dan periksakan ke dokter jika terus menerus tinggi, ya."

### 4.2 UI/Reaction Integration
Along with the dynamic text, the mascot/UI elements will also randomize subtle micro-interactions:
- **Normal**: Confetti pop, Mascot smiling, or a gentle "Thumbs up" bounce.
- **Elevated/High**: Mascot showing a soft "sweat drop" or a gentle pulsing warning glow on the result card.