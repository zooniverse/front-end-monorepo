# FavoritesIconButton

An icon button component to favorite a subject.
Includes hook to request favorite collection and updates to the favorite collection.

## Props

- props pass through to the IconActionButton component
- `login` (string): The user's login, required if creating a new favorite collection
- `projectId` (string): The project ID for the favorite collection, required if creating a new favorite collection
- `projectSlug` (string): The project slug, required if creating a new favorite collection, used for the favorite collection display name
- `subjectId` (string, required): The subject ID to be favorited/unfavorited
