# PlainButton

A button component that looks like a plain text link. Has the same API as Grommet's `Button`.

The `Button` label is using the `SpacedText` component. The `text` prop is the string label to be set inside the `SpacedText`. The `SpacedText` size can also be set using the `labelSize` prop, defaults to `medium`.

#### Optional prop: color
The text color can be customized by passing in a string value representing a color.

## Example use cases:

```
<PlainButton
  color={{
    dark: "#2d2d2d",
    light: "#eff2f5"
  }}
/>

or

<PlainButton
  color={'#008080'}
/>
```

## Prop Details

  - `as`: (string) The DOM tag or react component to use for the Grommet button element.
  - `className`: (string)
  - `color`: (`{ dark: string, light: string }`) Defaults to { dark: 'accent-1', light: 'neutral-1' }
  - `disabled`: (bool) Applied to button element
  - `href`: (string) Attribute of the button's anchor element.
  - `labelSize` (string): Determines size of <SpacedText /> child. Defaults to `medium`.
  - `onClick` (func): Called when button is clicked.
  - `text` (string): Becomes children of <SpacedText />.
