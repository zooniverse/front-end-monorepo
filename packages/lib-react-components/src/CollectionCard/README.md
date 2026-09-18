# CollectionCard

A preview card for collections.

## Features

- Clickable card links to the collection page
- Cover media rendered via `Media`
- Private collection and multiple-collaborator indicator icons
- Hover/focus reveals the collection description

## Props

- `collection` (object, required): Collection resource with `default_subject_src`, `description`, `display_name`, `links`, `private`, and `slug`.
- `userId` (string): User ID of the current user.
