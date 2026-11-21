# JJ.dev: Personal Developer Portfolio

A minimalist, responsive developer portfolio built with plain HTML, CSS and vanilla JavaScript. No frameworks, no build step.

## Run it

Open `index.html` in a browser, or serve the folder locally:

```bash
npx serve .
# or
python -m http.server 8000
```

An internet connection is needed for the fonts, Font Awesome icons and technology logos, which load from CDNs.

## Structure

```
portfolio/
├── index.html
├── css/style.css
├── js/script.js
├── assets/
│   ├── images/   profile.png, project-1.png ... project-5.png
│   └── icons/    dev-cpp.svg
└── README.md
```

## Make it yours

1. **Name and details:** search `index.html` for `JJ`, and edit the About card (location, focus).
2. **Links:** replace every `your-username` and `your.email@example.com` in `index.html`.
   Until you do, clicking a placeholder link shows a short notice instead of opening a fake page.
3. **Project links:** each project has a Live Demo and a GitHub Repository link. Replace the placeholder URLs with your deployed project and repository.
4. **Images:** swap the generated placeholders in `assets/images/` with your own. Keep the same file names, or update the `src` in `index.html`. Project screenshots work best at 16:9 (for example 1280x720).
5. **Contact form:** set `CONTACT_EMAIL` at the top of `js/script.js`.

## About the contact form

This is a frontend-only site, so the form cannot send email by itself. It validates the fields, then opens the visitor's email app with the message pre-filled. To receive messages directly, connect a form service (Formspree, Web3Forms, EmailJS) or your own backend and replace the `mailto` step in `js/script.js`.

## Theme

Dark mode is the default. The toggle in the navigation bar switches themes and stores the choice in `localStorage`. Colors live in the CSS variables at the top of `css/style.css`.

## Logos

Technology logos load from [Devicon](https://devicon.dev) (via jsDelivr) and [Simple Icons](https://simpleicons.org) as fallbacks. If a logo can't load, a text badge appears instead.

Dev-C++ has no logo in either library, so `assets/icons/dev-cpp.svg` is a simple placeholder badge. Replace it with the official icon if you want an exact match.

## Deploy

Push the folder to a GitHub repository and enable GitHub Pages (Settings, Pages, deploy from the main branch).
