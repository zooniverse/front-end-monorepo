# CollectIconButton

An icon button component to collect a subject.
Clicking the button opens a modal to select or create a collection for the subject.

## Props

- props pass through to the IconActionButton component
- `projectId` (string): The project ID for the collection, used to link the collection to the project
- `subjectId` (string, required): The subject ID to be collected
- `userId` (string, required): The user ID of the person collecting the subject, used to determine the user's collections
