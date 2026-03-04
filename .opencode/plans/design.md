# Design Language & Plan: Samuel Huang's Academic Portfolio

> **Status:** Draft v2
> **Last updated:** 2026-03-01
> **Change log:** v1 (Astro + Alpine.js + hand-rolled components) -> v2 (SvelteKit + shadcn-svelte + Motion)

---

## 1. Design Philosophy

**Core tension to resolve:** Scholarly credibility + technical sophistication, without pretension.

The site should feel like **a beautifully typeset CV that happens to be interactive** -- the kind of thing where a search committee member thinks "this is well-organized and easy to navigate" and a developer thinks "this is really well-built." The interactivity should feel *functional*, not decorative. Every animation earns its place by revealing information or aiding navigation.

**Design principles:**

- **Information density over atmosphere.** Unlike leerob.io or rauchg.com, this site needs to *convince*, not just *impress*. Content is king.
- **Progressive disclosure.** A casual visitor grasps the overview in 10 seconds. A recruiter can filter and drill down. A peer researcher can find specific publications.
- **Quiet confidence.** The craftsmanship shows in spacing, typography, and micro-interactions -- not in flashy hero sections.

**Target audiences (in priority order):**

1. Academic hiring committees (faculty search, postdoc supervisors, research lab PIs)
2. Industry research labs (MSR, Google Research, etc.)
3. General professional networking / peers

---

## 2. Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| **Framework** | SvelteKit + `adapter-static` | One component model (`.svelte` everywhere). SSG via adapter-static produces multi-page static HTML. Svelte 5 compiles to vanilla JS with ~2-3kb runtime -- no virtual DOM. File-based routing, nested layouts, `<svelte:head>` for per-page SEO. |
| **UI Components** | shadcn-svelte | Official Svelte port of shadcn (6.9k stars, actively maintained by Huntabyte). Full component set installed via CLI (`shadcn-svelte add <component>`), lives in `$lib/components/ui/`. Native to SvelteKit -- no framework bridging needed. |
| **Styling** | Tailwind CSS 4 | Utility-first, shadcn-svelte's native styling layer. Dark mode via `class` strategy. CSS variables for theming. |
| **Animation** | Motion for Svelte (`motion-sv`) | Svelte port of Motion (formerly Framer Motion). Declarative scroll reveal (`whileInView`), hover gestures (`whileHover`), exit animations (`AnimatePresence`), staggered children, scroll-linked progress. ~18kb tree-shakeable. |
| **Dark mode** | mode-watcher | shadcn-svelte's recommended dark mode library. Auto-detects system preference + manual toggle. |
| **Icons** | Lucide Svelte (`@lucide/svelte`) | shadcn-svelte's default icon set. Tree-shakeable, consistent with shadcn aesthetic. |
| **Data** | YAML files in `$lib/data/` | Structured, scriptable, loaded in SvelteKit `+page.ts` load functions. Easy to update programmatically (e.g., fetch R package stats via CI). |
| **Detail pages** | SvelteKit dynamic routes | `[slug]/+page.svelte` with `entries()` for static path generation. |
| **Deployment** | Netlify (continuity) | Existing domain/DNS setup. `adapter-static` outputs to `build/`. |
| **Font hosting** | Self-hosted (woff2) | MonoLisa (licensed), system sans-serif fallback for body. |
| **Package manager** | pnpm | shadcn-svelte CLI default, fast, strict dependency resolution. |

### Key architectural decisions

**Why SvelteKit (not Astro)?**
The original plan used Astro for its zero-JS-by-default island architecture. However, shadcn for Astro requires React as the component framework, which defeats the purpose. With Svelte chosen for shadcn-svelte, SvelteKit becomes the natural choice:
- **One component model.** Everything is `.svelte`. No context-switching between `.astro` (static) and `.svelte` (interactive) files, no `client:load` directives.
- **shadcn-svelte is native.** It's built for SvelteKit. Components work without any bridging layer.
- **Pervasive interactivity.** The site has interactive elements in nearly every section (search, filters, collapsibles, hover effects, scroll animations). Astro's island model would mean `client:load` on dozens of components -- ceremony without benefit.
- **Svelte's compiler is already efficient.** Static sections ship minimal JS. The overhead vs. Astro's zero-JS is negligible for this use case.

**Why SvelteKit (not plain Svelte + Vite)?**
Plain Svelte produces a single-page app (one `index.html`). The site needs multiple routes (`/`, `/publications`, `/projects/[slug]`), each pre-rendered as separate HTML files for SEO/Google Scholar indexing. SvelteKit provides routing, pre-rendering, layouts, and `<svelte:head>` -- the standard way to build a multi-page Svelte site.

**Why Motion for Svelte (not Svelte built-in transitions only)?**
Svelte's built-in `transition:fade`, `transition:fly`, etc. only work on DOM mount/unmount (tied to `{#if}` / `{#each}` blocks). They cannot do scroll-triggered reveal, hover gestures, staggered children, or `AnimatePresence`-style exit coordination. Motion for Svelte fills exactly these gaps with a declarative component API. Svelte built-ins still handle simple cases (e.g., inside shadcn Collapsible).

---

## 3. Color System

Built on shadcn's HSL-based CSS variable system for seamless dark mode.

### Light mode

| Token | Value | Note |
|---|---|---|
| Background | `hsl(0 0% 100%)` | White |
| Foreground | `hsl(224 71% 4%)` | Near-black |
| Muted | `hsl(220 14% 96%)` | Light gray surfaces |
| Muted foreground | `hsl(220 9% 46%)` | Secondary text |
| **Primary** | `hsl(208 78% 39%)` | ~#177CB0, indigo blue |
| Primary foreground | `hsl(0 0% 100%)` | White on primary |
| Border | `hsl(220 13% 91%)` | Subtle dividers |
| Card | `hsl(0 0% 100%)` | White card backgrounds |

### Dark mode

| Token | Value | Note |
|---|---|---|
| Background | `hsl(224 71% 4%)` | Deep navy-black |
| Foreground | `hsl(210 20% 98%)` | Near-white |
| Muted | `hsl(215 28% 17%)` | Dark gray surfaces |
| Primary | `hsl(208 78% 55%)` | Lighter for dark bg contrast |
| Border | `hsl(215 28% 17%)` | Subtle dividers |

The indigo blue acts as the sole accent. Fallback: change `--primary` to neutral if the blue feels too strong against shadcn's muted aesthetic.

---

## 4. Typography

### System

- **Headings (H1-H3):** MonoLisa at a slightly heavier weight. The monospace gives a subtle "this person codes" signal while remaining clean and professional. Letter-spacing tightened slightly (`-0.02em`) so it doesn't feel playful.
- **Body text:** System font stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`). Clean, fast, universally readable. Academics on any device/OS get a familiar reading experience.
- **Code/technical:** MonoLisa at regular weight.
- **Accent text (dates, labels, metadata):** MonoLisa at smaller size, muted color. This is where the monospace feels most natural.
- **Chinese text:** Falls through to system CJK fonts naturally.

### Sizing scale (Tailwind)

| Element | Classes | Usage |
|---|---|---|
| H1 | `text-3xl font-bold tracking-tight` | Page title / name |
| H2 | `text-xl font-semibold tracking-tight` | Section titles |
| H3 | `text-lg font-medium` | Subsection / card titles |
| Body | `text-base leading-relaxed` | Comfortable reading |
| Small/meta | `text-sm text-muted-foreground` | Dates, labels, metadata |

### Language support

- English primary throughout
- Chinese text where natural (e.g., the subtitle: 尽心，知性，知天)
- No full i18n/language switcher needed

---

## 5. Page Architecture

### 5.1 Homepage: The Interactive CV

The homepage is structured as a single scrollable page that reads like an interactive CV. Each section shows "selected" items (3-5), with a "see all" link to a dedicated full-listing page.

```
┌─────────────────────────────────────────────┐
│  [Name]  Samuel Huang                       │
│  [Title] MS CSE · University of Notre Dame  │
│  [Links] GitHub · Scholar · Email · CV ↓    │
│  [Bio]   2-3 sentences about research       │
│          interests + identity               │
│  ┌─────┐                                    │
│  │Photo│  (small, professional, rounded)     │
│  └─────┘                                    │
├─────────────────────────────────────────────┤
│  News                              [see all] │
│  ┌────────────────────────────────────────┐ │
│  │ 2026-01  Paper accepted at CHI...      │ │
│  │ 2025-11  Gave talk at Workshop...      │ │
│  │ 2025-09  Released R package...         │ │
│  └────────────────────────────────────────┘ │
├─────────────────────────────────────────────┤
│  Selected Publications             [see all] │
│  ┌────────────────────────────────────────┐ │
│  │ [J] Title · Authors · Venue · Year     │ │
│  │     [PDF] [Code] [DOI] [BibTeX ▾]     │ │
│  │ [C] Title · Authors · Venue · Year     │ │
│  │     [PDF] [Slides] [DOI]              │ │
│  └────────────────────────────────────────┘ │
├─────────────────────────────────────────────┤
│  Research Projects                 [see all] │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │  Card 1   │  │  Card 2   │  │  Card 3   │ │
│  │  thumb    │  │  thumb    │  │  thumb    │ │
│  │  title    │  │  title    │  │  title    │ │
│  │  tags     │  │  tags     │  │  tags     │ │
│  └──────────┘  └──────────┘  └──────────┘ │
├─────────────────────────────────────────────┤
│  Presentations & Talks             [see all] │
│  (Timeline or compact list with thumbnails) │
├─────────────────────────────────────────────┤
│  Software                          [see all] │
│  ┌────────────────────────────────────────┐ │
│  │ pkgname  ★ 42  ↓ 1.2k/mo  v2.1.0    │ │
│  │ Brief description of the package       │ │
│  │ [CRAN] [GitHub] [Docs]                │ │
│  └────────────────────────────────────────┘ │
├─────────────────────────────────────────────┤
│  Education                                  │
│  (Compact timeline: degree, institution,   │
│   years, key highlights)                    │
├─────────────────────────────────────────────┤
│  Teaching                                   │
│  (Table or list of courses + role + term)  │
├─────────────────────────────────────────────┤
│  Service                                    │
│  (Grouped: Departmental, Community,        │
│   Mentoring, Clubs)                         │
├─────────────────────────────────────────────┤
│  Professional Experience                    │
│  (De-emphasized: compact timeline, minimal │
│   detail, expandable if needed)             │
├─────────────────────────────────────────────┤
│  [Footer: © 2026 · Built with SvelteKit · │
│   Last updated: date]                       │
└─────────────────────────────────────────────┘
```

**Key layout decisions:**

- **Single column, max-width ~768px** for the main content. This is the academic standard and keeps readability high. Card grids can break out slightly wider.
- **No hero section.** Name + title + photo in a compact header that's dignified, not flashy.
- **Section headers** are left-aligned with a "see all" link that leads to a dedicated page with full listings + filters.
- **Homepage shows "selected" items only** (3-5 per section). Full listings live on subpages.

### 5.2 Subpages (full listings)

Each "see all" page (e.g., `/publications`, `/projects`) gets:

- A **global search** input at the top of the page
- A section-specific **filter bar**: filter by year, type, topic/tag (using shadcn-svelte `ToggleGroup` + `Input`)
- Full listing of all items with expandable details
- Items animate in/out with `AnimatePresence` when filters change

### 5.3 Detail pages

Rich content pages for items that warrant it:

- `/projects/[slug]` -- full project writeup with figures, links, tech stack
- `/publications/[slug]` -- abstract, PDF embed, BibTeX, related work (optional)

---

## 6. Component Library

### shadcn-svelte components (installed via CLI)

| Component | Usage |
|---|---|
| `Card`, `Card.Header`, `Card.Content` | Project cards, publication entries, software items |
| `Badge` | Tags, tech stack chips, publication type [J]/[C]/[W] |
| `Button` (ghost/outline variants) | PDF, Code, DOI links; action buttons |
| `Collapsible`, `Collapsible.Trigger`, `Collapsible.Content` | BibTeX expand, section expand |
| `Command`, `Command.Input`, `Command.List` | Global search (Cmd+K palette style) |
| `Tabs`, `Tabs.List`, `Tabs.Trigger`, `Tabs.Content` | Section-level filters (by year, by type) |
| `Tooltip` | GitHub stars, download counts, abbreviation explanations |
| `Accordion` | FAQ-style expandable content, grouped service items |
| `Separator` | Between sections |
| `ToggleGroup` | Filter pill toggles (tag-based filtering) |
| `NavigationMenu` | Top nav between sections |
| `Pagination` | Full listing pages if needed |
| `HoverCard` | Rich previews on publication/project links |
| `DropdownMenu` | Dark mode toggle (Light/Dark/System) |
| `Input` | Search bar, filter input |
| `Table` | Teaching section (courses, roles, terms) |

### Custom domain components (built on shadcn-svelte primitives)

| Component | Description |
|---|---|
| `PublicationEntry.svelte` | Single publication: type badge, authors (self-highlighted), venue, year, action buttons, collapsible BibTeX |
| `ProjectCard.svelte` | Card with thumbnail, title, description snippet, tech badges, links; `motion.div` hover animation |
| `SoftwareItem.svelte` | Package name, description, stats chips (stars, downloads, version), action links |
| `PresentationItem.svelte` | Talk title, event, date, photo thumbnail, slides/video links |
| `TimelineItem.svelte` | Reusable timeline node for education/experience: vertical line + dot + content |
| `SectionHeader.svelte` | Section title + "see all" link + optional description |
| `FilterBar.svelte` | Per-section filter: `ToggleGroup` for tags + `Input` for search, reactive Svelte state |
| `ThemeToggle.svelte` | `DropdownMenu` + `Button` + Lucide sun/moon icons + `mode-watcher` |
| `GlobalSearch.svelte` | Cmd+K search overlay using `Command` component, searches across all data |
| `ScrollReveal.svelte` | Wrapper using `motion.div` with `whileInView` for section fade-in |

---

## 7. Animation & Motion

Powered by **Motion for Svelte (`motion-sv`)** for declarative animations, with **Svelte built-in transitions** for simple mount/unmount cases.

### Animation patterns

| Pattern | Implementation | Where used |
|---|---|---|
| **Scroll reveal** | `<motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>` | Every homepage section fades in as you scroll |
| **Staggered list reveal** | Parent variant with `staggerChildren: 0.05`, child variants for `opacity` + `y` | Publication list items, project cards, news items |
| **Card hover** | `<motion.div whileHover={{ y: -2 }}>` + CSS `transition-shadow` | Project cards, software items |
| **Filter transitions** | `<AnimatePresence>` wrapping `{#each filtered}` with enter/exit variants | Subpage filter results appearing/disappearing |
| **Expand/collapse** | shadcn-svelte `Collapsible` (uses Svelte built-in transitions internally) | BibTeX blocks, expandable experience details |
| **Dark mode** | CSS `transition-colors duration-200` on `<html>` | Global theme switch |
| **Active section nav** | `useScroll()` + `useTransform()` from motion-sv tracking scroll position | Subtle nav indicator showing current section |
| **Page transitions** | SvelteKit `onNavigate` with View Transitions API (progressive enhancement) | Homepage <-> subpage navigation |
| **Scroll progress** | `useScroll({ offset: ["start start", "end end"] })` -> `scaleX` transform | Optional: thin progress bar at top of page |

### Animation principles

- All animations are **subtle and fast**: 200-300ms, `ease-out` or spring with moderate damping.
- Scroll reveal uses a small `y: 8` offset -- enough to feel alive, not enough to feel like a marketing site.
- `whileHover` effects are limited to cards and buttons -- not every element.
- `AnimatePresence` is used only where items actually enter/exit the DOM (filter results), not for static content.
- **NO:** Parallax, particle effects, animated backgrounds, typewriter effects, counter-up animations, loading spinners on static content.

---

## 8. Data Architecture

```
src/
├── lib/
│   ├── data/
│   │   ├── profile.yaml          # Name, title, bio, photo, social links
│   │   ├── news.yaml             # Date + one-liner announcements
│   │   ├── publications.yaml     # type, title, authors, venue, year, links, tags
│   │   ├── projects.yaml         # slug, title, description, image, tags, links, featured
│   │   ├── presentations.yaml    # title, event, date, type, slides/video links, image
│   │   ├── software.yaml         # name, description, language, links, stats
│   │   ├── education.yaml        # degree, institution, dates, highlights
│   │   ├── teaching.yaml         # course, role, term, institution
│   │   ├── service.yaml          # org, role, dates, category
│   │   └── experience.yaml       # company, role, dates, description (compact)
│   ├── components/
│   │   ├── ui/                   # shadcn-svelte components (auto-installed by CLI)
│   │   │   ├── accordion/
│   │   │   ├── badge/
│   │   │   ├── button/
│   │   │   ├── card/
│   │   │   ├── collapsible/
│   │   │   ├── command/
│   │   │   ├── dropdown-menu/
│   │   │   ├── hover-card/
│   │   │   ├── input/
│   │   │   ├── navigation-menu/
│   │   │   ├── pagination/
│   │   │   ├── separator/
│   │   │   ├── table/
│   │   │   ├── tabs/
│   │   │   ├── toggle-group/
│   │   │   ├── tooltip/
│   │   │   └── ...
│   │   ├── PublicationEntry.svelte
│   │   ├── ProjectCard.svelte
│   │   ├── SoftwareItem.svelte
│   │   ├── PresentationItem.svelte
│   │   ├── TimelineItem.svelte
│   │   ├── SectionHeader.svelte
│   │   ├── FilterBar.svelte
│   │   ├── ThemeToggle.svelte
│   │   ├── GlobalSearch.svelte
│   │   └── ScrollReveal.svelte
│   ├── utils/
│   │   ├── data.ts               # YAML loading + typing helpers
│   │   ├── filter.ts             # Search/filter logic (shared across pages)
│   │   └── cn.ts                 # shadcn class merge utility (auto-generated)
│   └── types/
│       └── index.ts              # TypeScript types for all data schemas
├── routes/
│   ├── +layout.svelte            # Root layout: nav, footer, ModeWatcher, global CSS
│   ├── +layout.ts                # export const prerender = true (site-wide)
│   ├── +page.svelte              # Homepage (interactive CV)
│   ├── +page.ts                  # Homepage data loader (imports all YAML)
│   ├── publications/
│   │   ├── +page.svelte          # Full publication listing + filters
│   │   ├── +page.ts              # Load publications.yaml
│   │   └── [slug]/
│   │       ├── +page.svelte      # Publication detail page (optional)
│   │       └── +page.ts          # Load single publication by slug
│   ├── projects/
│   │   ├── +page.svelte          # Full project listing + filters
│   │   ├── +page.ts              # Load projects.yaml
│   │   └── [slug]/
│   │       ├── +page.svelte      # Project detail page
│   │       └── +page.ts          # Load single project by slug
│   ├── sitemap.xml/
│   │   └── +server.ts            # Generate sitemap at build time
│   └── feed.xml/
│       └── +server.ts            # RSS feed for news (optional)
├── app.css                       # Tailwind base + CSS variables (shadcn tokens)
├── app.html                      # HTML shell with font preloads, analytics
└── static/
    ├── fonts/                    # MonoLisa woff2 files
    ├── files/                    # resume.pdf, other static downloads
    ├── images/                   # Avatar, project thumbnails, etc.
    └── _redirects                # Netlify redirects (legacy URL aliases)
```

### Data loading pattern

```typescript
// src/routes/+page.ts
import type { PageLoad } from './$types';
import { loadYaml } from '$lib/utils/data';

export const load: PageLoad = async () => {
  const [profile, news, publications, projects, presentations, software] =
    await Promise.all([
      loadYaml('profile'),
      loadYaml('news'),
      loadYaml('publications'),
      loadYaml('projects'),
      loadYaml('presentations'),
      loadYaml('software'),
    ]);

  return {
    profile,
    news: news.slice(0, 5),
    publications: publications.filter((p) => p.featured),
    projects: projects.filter((p) => p.featured),
    presentations: presentations.slice(0, 3),
    software,
  };
};
```

### YAML loading

YAML files are loaded via `vite-plugin-yaml` (allows direct import of `.yaml` files as JS objects) or a thin `loadYaml()` utility using `js-yaml` at build time. Since `adapter-static` pre-renders everything, YAML parsing happens at build time only -- zero runtime cost.

---

## 9. SEO & Discoverability

- **Structured data (JSON-LD):** `Person`, `ScholarlyArticle`, `SoftwareSourceCode` schemas injected via `<svelte:head>` per page. Critical for Google Scholar indexing and AI overviews (GEO).
- **Meta tags:** OpenGraph + Twitter cards via `<svelte:head>`. Per-page title, description, image.
- **Semantic HTML:** Proper heading hierarchy, `<article>`, `<section>`, `<nav>`, `<time>`.
- **Sitemap:** Generated at build time via `sitemap.xml/+server.ts` route.
- **RSS/Atom:** Optional feed for News section via `feed.xml/+server.ts` route.
- **Prerendering:** All pages statically generated at build time via `adapter-static`. Every route is a full HTML file with complete content -- search engines see everything.
- **Redirects:** Netlify `_redirects` file in `static/` for legacy URL aliases (`/resume/` -> `/files/resume.pdf`, `/projects/` -> `/projects`, etc.).

---

## 10. Migration Strategy

| Current (Hexo) | New (SvelteKit) | Action |
|---|---|---|
| Blog posts (LeetCode, Hexo tips) | Dropped | Archive or redirect to notes.sghuang.com |
| Old posts (calculus, politics) | Dropped | Already legacy |
| Project posts (11 markdown files) | `projects.yaml` + `[slug]/+page.svelte` detail pages | Extract frontmatter + content into structured YAML |
| Experience pages (5 markdown files) | `experience.yaml` (compact timeline) | Condense to timeline entries |
| Education page | `education.yaml` | Restructure |
| Resume PDF | `static/files/resume.pdf` | Keep `/resume/` redirect in Netlify `_redirects` |
| Custom fonts (MonoLisa woff2) | `static/fonts/` | Copy over |
| Analytics (GA + Cloudflare) | Same config in `app.html` | Carry over |
| Domain (sghuang.com) | Same Netlify deployment | No DNS changes needed |

---

## 11. Open Questions / Things to Test

1. **MonoLisa for headings at scale.** Test H1/H2 with tightened tracking -- must read "professional" not "cute." Fallback: Inter for headings, MonoLisa for meta/code only.
2. **Indigo blue intensity.** `#177CB0` may be too saturated for shadcn's muted aesthetic. Test a desaturated variant alongside.
3. **Mobile information density.** The one-page CV gets long on mobile. Consider a sticky horizontal section nav (scrolling pills) for quick jumping.
4. **R package / GitHub stats.** Fetched at build time in `+page.ts` load functions via GitHub/CRAN APIs. Cached with reasonable TTL. Alternative: client-side fetch for freshness.
5. **Print stylesheet.** Add `@media print` that strips animations and formats as a traditional CV.
6. **View Transitions.** SvelteKit supports the View Transitions API via `onNavigate`. Test if cross-page transitions (homepage -> detail page) feel smooth or gimmicky for this context.
7. **YAML loading strategy.** Verify `vite-plugin-yaml` works cleanly with `adapter-static` prerendering. Alternative: use JSON files or `js-yaml` in load functions.
8. **Motion for Svelte maturity.** `motion-sv` is relatively new. Verify compatibility with Svelte 5 runes and shadcn-svelte components. Fallback: use Motion's vanilla JS API via Svelte `use:action` directives.
