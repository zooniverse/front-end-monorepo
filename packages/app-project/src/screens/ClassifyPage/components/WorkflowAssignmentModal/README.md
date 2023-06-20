# Workflow Assignment Modal

The Workflow Assignment Modal is used in projects that have multiple workflows. When a volunteer is promoted to the next workflow (such as Level 1 --> Level 2), this modal appears to prompt them.

The modal component observers the UserProjectPreferences store. `assignedWorkflowID` is the workflow id the volunteer's user account is assigned to "level up". This property is fetched every 5 classification per sesssion. See `increment()` in the UserPersonalization store for more details. `promptAssignment` is a function on the UserProjectPreferences store that determines if the user has an assigned workflow and verifies that workflow is active in panoptes.

## Modal Visibility

The modal's checkbox toggles an item on the volunteer's browser sessionStorage, and allows the volunteer to dismiss the modal if they don't want to go to the next workflow yet.

The modal is `active` when the sessionStorage item does not exist AND when `promptAssignment` returns true. Modal is not `active` when the sessionStorage item does exist AND/OR when `promptAssignment` returns false.

## Props

`currentWorkflowID`: String passed from the ClassifyPage
