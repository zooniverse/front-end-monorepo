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

## Other Layout

Container for uncategorised, ungrouped pages, e.g. Unsubscribe.

Adds the `<AboutHeader>` which has NO nav links to any other page, and places content in the ContainerBox with a _max width_ of 90rem.
