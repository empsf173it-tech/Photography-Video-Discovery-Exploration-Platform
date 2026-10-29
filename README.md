# Aura & Light — Editorial Photography Studio Template

A commercial-grade, premium responsive website template designed for family, portrait, maternity, newborn, and lifestyle photographers. Built with modern editorial aesthetic principles, custom typography systems, and lightweight local configurations.

## Features

- **Theme Toggler**: Persisted theme toggler (Dark & Light modes) across all pages using local storage.
- **Client Dashboard Workspace**: Fully custom, responsive, tabbed dashboard mockup available under `login.html`. Select "Bypass with Demo Account" to login instantly.
- **Secure Client Gallery**: Password-protected proof gallery concept inside `portfolio-details.html`. Enter passcode `client2026` to unlock high-resolution images, mark favorites, trigger slideshow mode, and download albums.
- **Interactive Lightbox**: Modern, lightweight, customized lightbox overlay included in portfolio views.
- **Photoshoot Booking Widget**: UI-based session reservation engine in service-details.

## File Structure

```
/photography-studio/
│
├── index.html
├── home-2.html
├── services.html
├── service-details.html
├── portfolio.html
├── portfolio-details.html
├── blog.html
├── blog-details.html
├── contact.html
├── login.html
├── signup.html
├── 404.html
│
├── assets/
│   ├── css/
│   │   ├── bootstrap.min.css  (Bootstrap 5 responsive layout grid only)
│   │   ├── style.css          (Primary light-mode styling systems)
│   │   ├── dark.css           (Dark mode custom overrides)
│   │   └── animations.css     (Keyframe animations, reveals & clip-paths)
│   │
│   ├── js/
│   │   ├── main.js             (Mobile navbar, filters, lightboxes)
│   │   ├── theme-toggle.js     (Persisted local theme management)
│   │   ├── client-dashboard.js (Client gallery unlocks, dashboard panels)
│   │   └── animations.js       (GSAP motion and fallbacks)
│   │
│   ├── images/                 (All category images stored locally)
│   ├── icons/
│   └── fonts/
│
└── README.md
```

## Design System

### Typography
- **Headings**: *Playfair Display* (serif, elegant italic accentuation)
- **Body Text**: *Inter* (sans-serif, 1rem base size, 1.7 line height)
- **Highlights & Pricing**: *Manrope* (sans-serif, bold tabular numerals)

### Color Palette

#### Light Mode
- Primary: `#1F2937` (Charcoal)
- Secondary: `#6B7280` (Slate Gray)
- Accent: `#D4AF37` (Soft Gold)
- Highlight: `#C08457` (Warm Bronze)
- Background: `#FAFAF8`
- Surface: `#FFFFFF`
- Text Primary: `#111827`
- Text Secondary: `#4B5563`

#### Dark Mode
- Background: `#020617`
- Surface: `#111827`
- Glass Surface: `rgba(255,255,255,0.06)`
- Accent: `#E9C46A`
- Highlight: `#FBBF24`
- Text Primary: `#F8FAFC`
- Text Secondary: `#CBD5E1`

---
*Created by Antigravity IDE Agent for ThemeForest commercial quality compliance.*
