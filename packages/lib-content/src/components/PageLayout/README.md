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

## Form Layout

Container for pages that have a sidebar, e.g. Settings pages: [Account Information](https://www.zooniverse.org/settings), [Customize Profile](https://www.zooniverse.org/settings/profile), [Email](https://www.zooniverse.org/settings/email).

Layout contains:

- teal Zooniverse header, with:
  - Back button that links to the Zooniverse home page.
  - Zooniverse (text) logo. _(Desktop/wide view only)_
- _standard_ body container, with:
  - max width of 90rem (1440px) and min height of 80vh.
  - padding of 60px (vertical) and 20px (horizontal).
  - decorative shadow at top left & top right.
- 🚧 **TODO** content container, with:
  - preferred width of 600px (37.5rem)
- 🚧 **TODO** sidebar, that:
  - hangs to the left of the content container. (Desktop/wide view)
  - or transforms into a dropdown menu. (Mobile/narrow view)
  - Note: the content container is centre-aligned to the page, while the sidebar (in desktop mode) is off-centre to the left.

## Content Layout

Container for general content pages, e.g. Unsubscribe page, and Reset Password page.

Layout contains:

- teal Zooniverse "pseudo header", with:
  - Zooniverse (text) logo.
  - note: this is just a decorative box, not an actual `<header>`, because it has no navigational content. [(See Github)](https://github.com/zooniverse/front-end-monorepo/pull/7514#discussion_r3630704741)
- _standard_ body container, with:
  - max width of 90rem (1440px) and min height of 80vh.
  - padding of 60px (vertical) and 20px (horizontal).
  - decorative shadow at top left & top right.
- content container, with:
  - preferred width 720px (45rem)
