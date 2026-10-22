# "Button"

It's a styled Grommet Button.

Context: as of Oct 2026, the standard Grommet Button, LRC's (lib-react-component's) PlainButton, and LRC's PrimaryButton are lacking the specific styles required for the modern UI design. This "Button" button attempts to address that.

This "Button" button...

- has rounded corners.
- has an ideal width.
- has a border/outline.
- has **no** colour background/fill by default. (It's white or dark instead, depending on dark mode.)

Compare to the other options:

- Grommet Button with current Zooniverse styles: has everything except the ideal width and rounded borders.
- LRC's PlainButton: has no border/outline.
- LRC's PrimaryButton: is a primary button, i.e. has colour background/fill by default.

Also compare with the buttons used in ResetPassword and Unsubscribe, which have rounded borders.

## Dev Notes

Once LRC's buttons are updated with the new design, this "Button" button should be replaced accordingly.