# SpacedText

Creates the wider-kerned text used in titles etc. Reuses the Grommet `Text` component, and accepts the same props including the following:

- `children` (node): Required. The child of the component. Usually text.
- `margin` (string): Defaults to `none`.
- `size` (string): Defaults to `medium`. Maps to preset sizes defined in the grommet theme. 
- `uppercase` (boolean): Defaults to `true`. Handled by styled-components.
- `weight` (string): Defaults to `bold`. Same as the `weight` prop for Grommet's `Text` component and used by the inner `SpacedText` component.

## Example

```js
<SpacedText>
  Letter-spaced title
</SpacedText>
```
