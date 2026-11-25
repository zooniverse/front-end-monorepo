# Components for User Settings Page

This folder contains all the unique components for the User Settings Page.

## Account Email Form

Used in: Email Settings page.

_Form._ This form allows users to view and edit their Panoptes User account's email.

Uses an explicit save button, with status messages.

## Account Name Form

Used in: Account Settings page.

_Form._ This form allows users to view and edit their Panoptes User account's display name and real name.

Uses an explicit save button, with status messages.

## Big Label

Used in: all User Settings pages. (Account, Profile, Email)

_Content element._ This is the "big font" text - all caps, all bold. Should be used either as a `label` or a `h2`, e.g.

```
<BigLabel as="label" for="display_name">Display Name</BigLabel>
```

## Email Valid And Verified Status

Used in: Account Email Form

_Form component._ Shows ✅ or ❌ if the user's email is valid/invalid. Shows ✅ or ❌ if the user's email is verified/unverified. If the email is unverified, there's also an option to request a new verification email.

⚠ Accessibility warning: the "request verification email" functionality is designed to be fairly lightweight and separate from the actual form itself, and doesn't follow or more stringent accessibility patterns on the rest of the form.

## Form Input Field

Used in: Account Name Form.

_Form component._ A div that combines a single "input field": i.e., text input, label for that input, and an optional help text.

## Form Submit Button

_Form component._ A styled Grommet Button meant to be used with the Forms used in the User Settings Page. [Has its own README.](./FormSubmitButton/README.md)

## Form Status And Submit Field

Used in: most/all Forms.

_Form component._ A div that combines the form's Submit button, "busy" indicator, and status messages. The Submit button can be disabled if you just want to show the status messages, e.g. the form uses auto-save but you still want the busy indicator + status messages. [Has its own README.](./FormStatusAndSubmitField/README.md)

Not in the original Figma design (2026), so please feel free to revise this component's design if necessary.

## Settings Heading

Used in: all User Settings pages. (Account, Profile, Email)

_Content element._ A stylised h1 heading for every User Settings page.

## Talk Preference Form

Used in: Email Settings page.

_Form._ This form allows users to view and edit various Talk Preference settings, e.g. setting their "send me an email when I'm mentioned on Talk" preference to immediately, daily, weekly, or never.

### Dev Notes

Now that I think about it, I should have named this Talk PreferenceS Form. 😬

## User Media Form

Used in: Email Settings page.

_Form._ This form allows users to view and edit their User Media resources, notably either their User Avatar or Profile Header. This uses _file input,_ which converts the selected file into a resized image (on the client-side), and then allows that resized image to be uploaded.

### Dev Notes

Due to its complexity, this component probably needs its own README.md. 😬

## Zooniverse Email Preference Form

Used in: Email Settings page.

_Form._ This form allows users to view and edit their choices (yes/no) for their Zooniverse Email Preferences ("general newsletter" and "beta newsletter"). This form is just a collection of checkboxes.
