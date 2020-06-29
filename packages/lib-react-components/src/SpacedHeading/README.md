# SpacedHeading

Uses Grommet's `Heading` and Zooniverse react component's `SpacedText` to create the wider-kerned text used in headings. Reuses the Grommet `Heading` component, and accepts the same props. Additionally, it accepts the following props:

- `children` (node): Required. The child of the component. Usually text.
- `className` (string): Defaults to `''`. A class name to give to the component.
- `color` (string or object) Defaults to `{ dark: 'neutral-6', light: 'black' }` (white and black). The color of the text for the inner `SpacedText` component. Uses the same values accepted by Grommet's `Text` component and accepts the variable names for colors from Zooniverse's grommet theme.
- `level` (number): Defaults to `2`. Same as Grommet's `Heading` `level` prop. Maps to h1, h2, h3, h4, h5, h6
- `size` (string): Defaults to `medium`. Maps to preset sizes defined in the grommet theme. 
- `weight` (string): Defaults to `bold`. Same as the `weight` prop for Grommet's `Text` component and used by the inner `SpacedText` component.

Any additional props are passed to the `Heading` component. 

## Example

```js
<SpacedHeading>
  Letter-spaced title
</SpacedHeading>
```
