# Architecture Overview - BloodCare PWA

## 1. System Architecture
BloodCare is designed as a Lightweight Progressive Web Application (PWA) containerized using Docker and served via Nginx. The application architecture ensures high availability, offline capability, and client-side data persistence.

```
+-----------------------------------------------------------------------+
|                            Docker Host                                |
|                                                                       |
|   +-------------------+       +-----------------------------------+   |
|   |   Nginx Service   | ----> |         Frontend Service          |   |
|   |  (Reverse Proxy)  |       | (PWA: HTML5 / CSS3 / ES6 / SW)    |   |
|   +-------------------+       +-----------------------------------+   |
|             |                                   |                     |
|             | Port 80/443                       v                     |
|             v                         Local Storage / IndexedDB       |
|       Client Browser                  (Client-side Persistence)       |
+-----------------------------------------------------------------------+
```

---

## 2. Tech Stack & Infrastructure

- **Frontend**: HTML5, Modern CSS (CSS Custom Properties for Themes), Vanilla JavaScript (ES6+), Service Worker for offline capability.
- **PWA Capabilities**: Web App Manifest (`manifest.json`), Offline Caching, Responsive Layout.
- **Web Server / Reverse Proxy**: Nginx (Alpine-based image) handling routing, caching headers, and SSL termination.
- **Containerization**: Docker & Docker Compose orchestrating environment delivery.
- **Data Storage**: Client-side Browser Storage (`localStorage` or `IndexedDB`) for user profiles, measurement history, and preferences (Theme, Language).

---

## 3. Directory & File Structure

```
bloodcare/
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── backend/                  # Reserved for future API expansions
├── docs/                     # Technical & Design Documentation
│   ├── architecture.md
│   ├── features-and-logic.md
│   └── ui-ux-design.md
└── frontend/
    ├── index.html
    ├── manifest.json
    ├── sw.js
    ├── css/
    │   └── styles.css
    ├── js/
    │   ├── app.js
    │   ├── store.js
    │   ├── i18n.js
    │   └── logic.js
    └── icons/
        ├── apple-touch-icon.png
        ├── icon-192.png
        ├── icon-512.png
        └── icon-maskable-512.png
```

---

## 4. Docker & Containerization Details

### Dockerfile
Uses an optimized Nginx Alpine base image serving static assets and proxying requests as needed.

### docker-compose.yml
Defines services, port mappings (e.g., `80:80`, `443:443`), volume mounts for Nginx configuration, and frontend static assets.

---

## 5. Offline & PWA Strategy

1. **Service Worker (`sw.js`)**:
   - Caches static assets (`index.html`, CSS, JS, Icon PNGs).
   - Serves cached responses when offline.
2. **App Manifest (`manifest.json`)**:
   - Defines application identity, icons, standalone display mode, background color, and theme color.