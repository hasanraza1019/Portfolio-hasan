# Muhammad Hasan — Cyber Luxury Portfolio

React + Vite + Tailwind CSS v4 + Framer Motion + GSAP portfolio.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build for production

```bash
npm run build
```

Output goes to `dist/`. Deploy that folder to Vercel, Netlify, or GitHub Pages.

## Customize

- Edit `src/data/data.js` for all text content (skills, projects, services, testimonials, timeline, achievements).
- Replace `public/resume.pdf` with your real CV.
- Replace the "MH" initials placeholders in `Hero.jsx` and `About.jsx` with a real photo (`<img>` tag) once you have one.
- Update social links and email in `src/components/Contact.jsx`.
- Contact form currently just shows a success message — connect it to EmailJS, Formspree, or your own backend to actually receive messages (see comment in `Contact.jsx`).

## Included

- Premium animated loading screen
- Custom glowing cursor (desktop only)
- Canvas particle + starfield background
- Typing animation hero with floating light orbs
- Animated circular skill bars
- Hover glow / tilt effect on service & project cards
- Scroll-triggered reveal animations (GSAP + Framer Motion)
- Animated timeline, counter-up achievements, testimonial slider
- Contact form + social links
- Animated wave footer
- Fully responsive, mobile menu included
