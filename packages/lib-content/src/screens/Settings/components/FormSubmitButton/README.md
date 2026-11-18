# Form Submit Button

It's a styled Grommet Button meant to be used with the Forms used in the User Settings Page.

Context: as of Oct 2026, the standard Grommet Button, LRC's (lib-react-component's) PlainButton, and LRC's PrimaryButton are lacking the specific styles required for the modern UI design. This button attempts to address that, and has:

- rounded corners.
- an ideal width.
- a border/outline.
- **no** colour background/fill by default. (It's white or dark instead, depending on dark mode.)

Compare to the other options:

- Grommet Button with current Zooniverse styles: has everything except the ideal width and rounded borders.
- LRC's PlainButton: has no border/outline.
- LRC's PrimaryButton: is a primary button, i.e. has colour background/fill by default.

Also compare with the buttons used in ResetPassword and Unsubscribe, which have rounded borders.

## Dev Notes

This was initially called the "Button" button but was renamed to avoid confusion.

Once LRC's buttons are updated with the new design, this button should be replaced accordingly.
