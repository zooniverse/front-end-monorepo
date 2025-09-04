# MetaTools

Subject MetaTools component for common subject actions like favorite, collect, share, invert, and open image in new tab (as applicable).

## Props

- `invert` (boolean): The current invert state
- `location` (object): The subject location object with mime type as key and URL as value
- `login` (string): The login of the current user
- `onInvert` (function): Callback function to toggle the invert state
- `projectId` (string): The project ID for favoriting and collecting the subject
- `projectSlug` (string): The project slug for favoriting the subject
- `subjectId` (string): The subject ID for favoriting and collecting the subject
- `userId` (string): The user ID of the current user for collecting the subject
- `...rest` (object): Additional props passed to the container Box component
