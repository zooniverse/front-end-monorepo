# SubjectCard

A preview card for subjects.

## Features

- Three sizes: `large`, `medium`, and `small`
- Clickable subject media area links to the subject talk page
- Bottom toolbar for metadata, favorite, collect, and share actions

## Props

- `interactive` (boolean): Whether the card is interactive or not.
- `login` (string): The login of the current user for enabling favorite action.
- `placeholder` (node): Placeholder passed to `Media`.
- `projectId` (string): Project ID used for favoriting and collecting the subject.
- `projectSlug` (string, required): Project slug used to build subject talk URL.
- `size` (string): One of `large`, `medium`, or `small`.
- `subject` (object): Subject resource with `id` and `locations`.
- `userId` (string): User ID of the current user for enabling collect action.
