# ⚜️ La Belle France 

URL:-https://belle-france-journey.vercel.app

> A luxury French culture and language school project — built as a React single-page application showcasing France's regions, landmarks, cuisine, and cultural heritage.

----

## 📖 About the Project

**La Belle France** is a school French language project website designed to showcase France's rich culture, history, iconic landmarks, and regional diversity. All content is written in English and intended for educational purposes.

The project integrates French language learning, cultural research, and web development into a single cohesive experience — reinforcing vocabulary, grammar, and written expression through authentic, real-world content.

> *"This project allowed us to integrate linguistic, cultural, and technical competencies into a single meaningful and practical learning experience."*

---

## ✨ Features

### Pages
| Route | Description |
|-------|-------------|
| `/` | Home — Ken Burns hero, facts ticker, featured region cards, interactive SVG map, photo gallery with lightbox |
| `/regions` | 6 regions (Île-de-France, Provence, Brittany, Normandy, Loire Valley, Alsace) with descriptions, fun facts, and attraction cards |
| `/map` | Interactive 3D extruded map of France (React Three Fiber) with clickable region markers and info panels |
| `/cuisine` | 6 French dishes with category filters, pronunciation tooltips, and 3 wine region cards |
| `/landmarks` | 6 landmark cards + historical timeline (1163–1889) |
| `/about` | Learning outcomes, animated skill bars, project journey, and French vocabulary glossary (12 terms) |

### Global Features
- 🗺️ **Interactive SVG Map** — hover and click regions on desktop; styled buttons on mobile
- 🤖 **Pierre — AI Chatbot** — Gemini-powered French culture guide with streaming markdown responses and suggestion chips
- 📜 **Scroll Effects** — progress bar, scroll-reveal fade-in animations, back-to-top button
- 🎨 **Ken Burns Hero** — slow zoom parallax effect on the home page hero image
- 🔵⚪🔴 **Tricolor Stripe** — fixed blue-white-red decorative bar at the top of every page
- 📸 **Photo Gallery** — 9-image masonry grid with lightbox (keyboard, swipe, and mouse navigation)
- 📰 **Facts Ticker** — auto-scrolling navy ticker with fun facts about France
- 🏛️ **3D France Map** — extruded interactive 3D map with region markers and auto-rotation

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 18 + TypeScript |
| Bundler | Vite |
| Styling | Tailwind CSS + shadcn/ui |
| 3D Graphics | React Three Fiber + @react-three/drei |
| Routing | React Router DOM v6 |
| State Management | Zustand |
| Markdown | react-markdown |
| Backend | Lovable Cloud (Supabase) |
| AI | Google Gemini 3 Flash via Edge Function |
| Carousel | embla-carousel |

---

## 🗂️ Project Structure

```
la-belle-france/
├── public/
├── src/
│   ├── assets/              # ~23 images (landmarks, regions, food, wine)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── TricolorStripe.tsx
│   │   │   └── ScrollProgressBar.tsx
│   │   ├── ui/              # shadcn/ui components
│   │   ├── BackToTop.tsx
│   │   ├── FactsTicker.tsx
│   │   ├── FranceMapSVG.tsx
│   │   ├── FranceMap3D.tsx
│   │   ├── LandmarkTimeline.tsx
│   │   ├── PageHeader.tsx
│   │   ├── PhotoGallery.tsx
│   │   ├── PierreChatbot.tsx
│   │   ├── PronunciationTooltip.tsx
│   │   ├── ScrollReveal.tsx
│   │   └── TricolorDivider.tsx
│   ├── pages/
│   │   ├── Index.tsx        # Home page
│   │   ├── Regions.tsx
│   │   ├── Map.tsx
│   │   ├── Cuisine.tsx
│   │   ├── Landmarks.tsx
│   │   ├── About.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx
│   └── main.tsx
├── supabase/
│   └── functions/
│       └── pierre-chat/     # AI chatbot edge function
│           └── index.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/la-belle-france.git

# Navigate into the project
cd la-belle-france

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## 🤖 Pierre — AI Chatbot

Pierre is a friendly AI-powered French culture guide built into the website.

- **Powered by**: Google Gemini 3 Flash via a Supabase Edge Function
- **Personality**: Knowledgeable, warm, and slightly charming — like a well-traveled French tour guide
- **Responses**: Streaming markdown, capped at ~4 sentences per reply, constrained to France-related topics
- **Features**: 4 suggestion chips, typing indicator, session conversation history, error handling
- **UI**: Glassmorphic chat window (380×520px on desktop, fullscreen on mobile), floating ⚜️ trigger button with pulse animation

### Edge Function Setup

The chatbot runs via a Supabase Edge Function (`supabase/functions/pierre-chat/index.ts`), deployed automatically through Lovable Cloud.

---

## 📚 Content Coverage

| Category | Items |
|----------|-------|
| Regions | Île-de-France, Provence, Brittany, Normandy, Loire Valley, Alsace |
| Landmarks | Eiffel Tower, Notre-Dame, Mont Saint-Michel, Versailles, The Louvre, Arc de Triomphe |
| Dishes | Croissant, Bouillabaisse, Crêpes Bretonnes, Ratatouille, Coq au Vin, Crème Brûlée |
| Wine Regions | Bordeaux, Burgundy, Champagne |
| Timeline Events | 6 events from 1163 to 1889 |
| Vocabulary Terms | 12 French words with English translations and context |
| Gallery Photos | 9 images with lightbox |
| Fun Facts | 6 rotating ticker facts |

---

## 📝 Learning Outcomes

This project was built to meet the following educational outcomes:

1. **🇫🇷 French Language Skills** — Researching and writing about French culture reinforced vocabulary, grammar, and written expression in authentic contexts.
2. **🏛️ Cultural Knowledge** — Exploring France's history, landmarks, cuisine, and regional diversity deepened appreciation of Francophone culture.
3. **💻 Digital Literacy** — Collaboratively designing and building this website developed research, information synthesis, and technology skills.

---

## 📄 License

This project was created for educational purposes as part of a school French language and culture assignment. All written content is original. Images are sourced from [Unsplash](https://unsplash.com) under their free-to-use license.
