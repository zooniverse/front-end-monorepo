# Page Layouts

The Page Layouts are used to give a general, shared structure to the various Pages/Screens in lib-content. (See [src/screens](../../screens/))

## AboutLayout

Container for About pages, e.g. About (the general About page), FAQ, Our Team, Publications, Resources.

Adds the `<AboutHeader>` which has nav links to the About pages, and places content in the ContainerBox with a _max width_ of 90rem.

## ContainerBox

This is a general styling component. It's a container div which has: a general "elevation shadow", and "triangular shadows" at the top left + top right (which makes it look like the top of a paper page was "lifted" slightly off a flat table).

The ContainerBox does NOT have any layout/sizing rules (e.g. no max width) by default, you'll need to specify it. (See how AboutLayout does this.)

## Get Involved Layout

Container for "Get Involved" pages, e.g. Collaborate, Donate, Educate, Volunteer.

Adds the `<AboutHeader>` which has nav links to the "Get Involved" pages, and places content in the ContainerBox with a _max width_ of 90rem.

## Settings Layout

Container for (User) Settings pages: [Account Information](https://www.zooniverse.org/settings), [Customize Profile](https://www.zooniverse.org/settings/profile), [Email](https://www.zooniverse.org/settings/email).

Based on the "Other Layout" page layout, with the following changes:

- Has an _actual_ Zooniverse header.
  - Header is an actual `<header>` element with a "Back" link.
  - On desktop view, displays the Zooniverse (text) logo. On narrow view, the logo is hidden.

## Other Layout

Container for uncategorised/ungrouped pages, e.g. Unsubscribe page, and Reset Password page.

Layout contains:

- A teal Zooniverse "pseudo header".
  - It's just a decorative box, not an actual `<header>`, because it has no navigational content. [(See Github)](https://github.com/zooniverse/front-end-monorepo/pull/7514#discussion_r3630704741)
  - On desktop and mobile view, the "psuedo header" displays the Zooniverse (text) logo.
- A body container with:
  - maximum width 90rem (1440px)
  - minimum height 80vh
  - padding 60px (vertical) and 20px (horizontal)
  - decorative shadows at the top left & top right
- A content container with:
  - preferred width 40rem (720px)
