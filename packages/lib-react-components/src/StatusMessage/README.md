# Status Message

A Status Message is a component that tells users that, hey, something has changed in the state of things.

Comes in three varieties:

- ✅ Success
- ❗️ Error
- ⚠️ Warning

## Props

Main properties:

- `text` (string or node): the text to display. If no text is provided, nothing is displayed.
- `type` (string): one of "success", "error", or "warning". (Or "" (empty string) if you want to specify "no type".) Type determines the icon and colour of the status message. If no type is provided, nothing is displayed.

Optional properties:

- `width`, `height`, `margin`, `pad`: standard Grommet dimension/layout props can be used, but maybe don't?
- Other Grommet Box-compatible props will be passed into the Status Message's container.

## Accessibility

- A Status Message uses `role="status"`, which by definition makes it a "live region".
  - This means that the component has to be rendered _when the page loads,_ so screen readers can first _register_ it. The screen reader then announces any _changes_ to the component's content.
  - Basically, we shouldn't only insert/render the component when there's a message. e.g., this is a BAD idea: `function StatusMessage (text) { if (!text) { return null } else { return <div role='status'>{text}</div> }`
- Note that this component doesn't use `role="alert"`, since that's a more high-priority signal.

See: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role