# fetchWorkflowsHelper

An async helper method to fetch the data required to generate the workflow select buttons for the Hero component. Grabs the workflow and translation data for a given array of workflow IDs, and returns a collection of workflow objects.

## Arguments

- `language` - A two-letter language code to fetch the correct translation data from Panoptes. Defaults to `en`
- `activeWorkflows` (required) - an array of string IDs used to fetch the required workflows from Panoptes
- `defaultWorkflow` - the ID of the default workflow, which will be shown at `/projects/:project/:owner:/classify`

## Example

```js
const workflows = await fetchWorkflowsHelper('en', ['1', '2'], '2')

// returns
// [
//   { completeness: 0.4, default: false, id: '1', displayName: 'Foo' },
//   { completeness: 0.7, default: true, id: '2', displayName: 'Bar' }
// ]
```
