# PrimaryButton

A primary button with a gradient hover / active state, with four available colors: gold, blue, teal and green.

## Props

- `color` (string) - can be `gold` (default), `blue`, `teal` or `green`
- `label` (string || component) - the label for the button

All other props supported by [Grommet's `Button` component](https://v2.grommet.io/button) are also supported.

## Example

```js
  function ComponentWithButton (props) {
    return (
      <PrimaryButton
        color='teal'
        label='Hello world!'
        onClick={() => props.onClick()}
      />
    )
  }
```
