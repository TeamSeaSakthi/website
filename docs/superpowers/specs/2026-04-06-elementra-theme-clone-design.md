# SeaSakthi Multi-Page Website - Elementra Theme Clone

## Overview
Clone the Elementra digital agency theme's visual design and apply it to Team Sea Sakthi's content across 6 pages. Clean HTML/CSS/JS — no WordPress/Elementor.

## Design Tokens

### Colors
- Primary: `#FF6600` (orange)
- Hover: `#E55B00`
- Background: `#FFFFFF`, Alt: `#F6F4F1`
- Text: `#494945`, Headings: `#181817`, Meta: `#7A7A74`
- Border: `#DDDBD8`
- Dark sections: `#121212` bg, `#FCFBF8` text

### Typography
- Body: "DM Sans", 16px, weight 400, line-height 1.625
- Headings: "Plus Jakarta Sans", weight 600
- H1: 57px (line-height 1.1), H2: 47px, H3: 35px, H4: 28px, H5: 23px, H6: 19px

### Spacing & Radius
- Page max-width: 1290px
- Grid gap: 30px
- Button: padding 18px 40px, border-radius 30px
- Cards/images: border-radius 26px
- Inputs: border-radius 10px

## File Structure
```
/home/ragul/SeaSakthi/
├── index.html          # Home
├── about.html          # About
├── boats.html          # Boats/Editions
├── gallery.html        # Gallery + Articles
├── team.html           # Team + Alumni
├── contact.html        # Contact
├── css/
│   └── theme.css       # All styles (replaces style.css)
├── js/
│   └── main.js         # All JS (replaces script.js)
├── fonts/              # (existing)
├── assets/             # (existing, unchanged)
└── favicon.ico         # (existing)
```

## Shared Components

### Header (all pages)
- Fixed position, dark background (#181817)
- Logo left, nav center (Home, About, Boats, Gallery, Team, Contact), CTA button right
- Mobile: hamburger menu with slide-in overlay
- Active page highlighted in orange

### Footer (all pages)
- 3-column links: Discover (Blog, Brochure, Challenge, Crowdfunding, Institution), Social (LinkedIn, Instagram, X), Info (Privacy, Terms)
- Email signup form
- Address: KCT Garage, Kumaraguru College of Technology, Coimbatore
- Phone: +91 75300 09152
- Copyright 2025

## Page Layouts

### 1. Home (index.html)
1. **Hero**: Full-screen video bg (landing.mov), "Future of Yachting" heading with character animation, scroll-down indicator
2. **Marquee**: Scrolling text "innovation / sustainability / propulsion"
3. **About Preview**: 2-col — left: "Who Are We" text + mission snippet + "Learn More" link to about.html; right: team photo
4. **Feature Cards**: 3 numbered cards (01 Precision Propulsion, 02 Eco-Smart Cockpit, 03 AR Navigation) with descriptions + arrow links to boats.html
5. **Editions Accordion**: Image accordion showing Yali 3.0, 2.0, 1.0 with hover-reveal specs
6. **Sponsors Grid**: Logo grid (SBM, Thriveni, Cosmos, etc.) with fade-in animation
7. **CTA**: Dark section, "Support Our Journey to Monaco" + button linking to Milaap

### 2. About (about.html)
1. **Hero**: "About Team Sea Sakthi" with bg image
2. **Institution**: 2-col — text about KCT (40 years) + campus image
3. **MEBC**: 2-col — photo + description of Monaco Energy Boat Challenge
4. **Mission/Vision**: 2 feature cards (mission + vision text)
5. **Countdown**: Timer to July 2, 2025 + "Learn More" link to MEBC site
6. **Patrons**: Cards for 6 patrons (Shri Shankar Vanavarayar, H.E. Jawad Ashraf, etc.)

### 3. Boats (boats.html)
1. **Hero**: "Our Boats" with YALI 4.0 subtitle
2. **Yali 4.0 Showcase**: Description text + 6 feature cards in grid (Propulsion, Cockpit, AR Nav, PDU, Safety, Performance)
3. **Previous Editions**: Image accordion or slider for Yali 3.0/2.0/1.0 with spec tables (engine, weight, max speed, key features)
4. **Open Source**: Kit 1.0 description + download button

### 4. Gallery (gallery.html)
1. **Hero**: "Gallery & News"
2. **Gallery Tabs**: 2024 / 2023 toggle buttons
3. **Photo Grid**: Masonry-style grid with existing photos
4. **Articles**: 3 featured articles (The Hindu, YourCoimbatore, Times of India) + sidebar with 4 more

### 5. Team (team.html)
1. **Hero**: "Our Team"
2. **Current Team Grid**: 4-col grid, each card: square photo (from /assets/members/), name, role, LinkedIn link. Hover zoom effect.
3. **Alumni Toggle**: "View Past Members" button
4. **Alumni Tabs**: Yali 1.0 / 2.0 / 3.0 batch selector with alumni cards

### 6. Contact (contact.html)
1. **Hero**: "Get In Touch"
2. **Contact Form**: Name, email, message fields + submit button
3. **Info Grid**: Address card, phone card, email card
4. **Social Links**: LinkedIn, Instagram, X
5. **Brochure**: Download button for brochure.pdf

## Animations
- GSAP ScrollTrigger for fade-in-up on section entry
- Character-stagger animation on hero headings
- Marquee continuous scroll
- Hover zoom on team/gallery images
- Smooth page transitions via CSS

## Dependencies (CDN)
- Google Fonts: DM Sans, Plus Jakarta Sans
- GSAP 3 + ScrollTrigger
- Swiper (for carousels/accordions)
- Font Awesome 5
- No jQuery, Bootstrap, or other heavy frameworks

## Existing Assets Reused
- `/assets/logo.png` - header logo
- `/assets/landing.mov` - hero video
- `/assets/2024/`, `/assets/2023/` - gallery photos
- `/assets/members/` - team member photos
- `/assets/alumni/` - alumni photos
- `/assets/patrons/` - patron photos
- `/assets/logo/` - sponsor logos
- `/assets/pictures/` - news/article images
- `/assets/yali*.png` - boat images
- `/assets/brochure.pdf` - downloadable brochure
- `/favicon.ico`
