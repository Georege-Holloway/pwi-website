# Pro Woodwork Installations, website

Static site for PWI Limited, trading as Pro Woodwork Installations, company number 13894861.
Hand written HTML, one stylesheet, no framework, no build step, no CMS. Deployed to Netlify.

This file carries forward the standing constraints from the build handover. Read it before
writing any copy or any markup.

---

## Standing constraints

These apply to every line of copy and every commit.

1. **No em dashes anywhere.** Use commas, full stops, or restructure the sentence.
2. **Invent nothing about a real business.** No testimonials, no review counts, no star ratings,
   no accreditations, no guarantees, no prices, no years in business figures, no project counts,
   no client names, and no service areas beyond what is confirmed. If you need one and do not have
   it, use a visible placeholder and list it in your summary. This is a real trading company and
   unsubstantiated claims are an ASA problem as well as a credibility one.
3. **No AI flavoured filler.** No "nestled", no "elevate your space", no "we don't just build
   furniture, we build relationships", no double adjective openers. Plain, direct, concrete. Write
   the way two carpenters would talk about their own work.
4. **No stock photography.** Only images confirmed as PWI's own work, or clearly labelled
   placeholder blocks.
5. **UK English and UK conventions** throughout: colour, metre, 07989 573427 formatting, £.
6. **No pricing published** until Richard and Michael agree a figure. If a band is agreed it goes
   in as a stated range with clear caveats, never as a fixed figure.
7. **Accessibility is not optional.** Correct heading hierarchy, alt text describing the actual
   furniture, visible focus states, WCAG AA contrast minimum, forms with real labels.

## What not to do

- Do not migrate WordPress content wholesale. This is a rebuild, not a port.
- Do not add a slider.
- Do not invent content to fill a section. An honest placeholder is better than plausible fiction.
- Do not build location pages for towns that have not been confirmed as served.
- Do not add a live chat widget, cookie banner, exit intent popup, or newsletter signup.
- Do not touch DNS, the domain registrar, or anything on the existing WordPress install.
- Do not assert what is in the repo or on the live site without checking it directly.
- Do not install Google Tag Manager or GA4. Analytics is a separate decision after sign off.

---

## How the site is put together

```
/index.html              Home
/about/                  About
/services/               Services hub, five anchored sections
/portfolio/              Project gallery, the priority page
/process/                How it works, plus the FAQ
/areas/                  Areas we cover, footer linked, not in the top nav
/contact/                Contact and enquiry form
/contact/thanks/         Form success page, the form posts here
/privacy/                Privacy policy
/styles.css              The single shared stylesheet
/js/nav.js               Mobile nav toggle, the only JavaScript on the site
/images/                 See images/README.md before adding anything
/fonts/                  See fonts/README.md
/_redirects              Old WordPress URLs, verified against the live sitemap
/netlify.toml            Headers. Contains the staging noindex, read below
/sitemap.xml             Eight indexable pages, update lastmod when content changes
```

**The header and footer are duplicated in all nine HTML files.** That is the cost of having no
build step, which the brief requires. If you change the nav, the footer or anything in the head,
change it in all nine files and check with a grep that none were missed.

**The stylesheet.** Design tokens are CSS custom properties at `:root`. The two greens are taken
from the PWI logo, which is exactly `#1e432d` and `#8caf9c`. Sage never carries text, it fails
WCAG AA on light grounds, it is a background, border and accent colour only. Page specific rules
are scoped by the body class, for example `.page-portfolio`. Never edit a shared component rule to
fix one page.

**Fonts** are a system stack behind the `--font-display` and `--font-body` tokens. Swapping to
self hosted faces is an `@font-face` block and two token changes. See fonts/README.md.

**Placeholders.** Two visible kinds, both deliberately impossible to miss:
- `.ph` blocks, orange, for missing copy and unanswered questions.
- `.imgslot` blocks, hatched green, for missing photography.

Every one of them must be gone before the site goes live. To find them all:

```bash
grep -rn 'class="ph"\|class="imgslot' --include='*.html' .
```

**Photography.** Every photo on the site is PWI's own work, taken from the old WordPress site and
sorted in `../current-site-images/`, which is outside this repo. That folder also holds 34 stock
images from the old site. None of them go in this repo. See the constraints above.

Photos are exported as WebP at two widths, cropped to 4:3, with all metadata stripped. Stripping
matters: iPhone photos can carry the GPS position of a customer's house.

**Adding a real portfolio project.** There is a commented template at the bottom of the grid in
`portfolio/index.html`. Copy it into the grid and fill it in. Alt text describes the furniture,
not the photograph.

**Turning on testimonials.** The block is built and styled on the homepage but carries no content.
There is commented markup in `index.html` under the testimonials section. Uncomment it, add real
quotes with the customer's permission, and delete the placeholder notice above it. Do not write
example quotes into the file.

**Schema.** `LocalBusiness` on the homepage, `Service` on each of the five services,
`BreadcrumbList` sitewide, `FAQPage` on `/process/`. The FAQ schema contains only the one question
that currently has a real confirmed answer. Add the others as Richard and Michael answer them.
Never mark up a placeholder as an answer.

---

## Before cutover

- [ ] **Delete the `X-Robots-Tag = "noindex, nofollow"` block from `netlify.toml`.** If this ships
      to the live domain the site will be de-indexed. This is the single most important line in
      the repo.
- [ ] Every `.ph` and `.imgslot` placeholder replaced or removed
- [ ] Confirm `og:image` resolves on the live domain. It points at
      `https://www.pwilimited.co.uk/images/og-image.jpg`, matching the canonical tags, so link
      previews show no image on the Netlify staging URL. That is expected until cutover.
- [ ] Re-check `_redirects` against the live sitemap in case anything changed
- [ ] Decide what happens to the two terms and conditions pages, currently pointed at the homepage
- [ ] Privacy policy completed: registered address, ICO position, retention period
- [ ] Form tested end to end on the live domain, submission reaching the Netlify dashboard
