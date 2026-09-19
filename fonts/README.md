Self-hosted web fonts go here.

Currently empty. The site runs on a system font stack defined by the
--font-display and --font-body custom properties at the top of styles.css.

To switch to self-hosted faces: drop the woff2 files in this folder, add an
@font-face block per face at the top of styles.css, and repoint those two
custom properties. Nothing else needs to change.

Do not call Google Fonts at runtime.
