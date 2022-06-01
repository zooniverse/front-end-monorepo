# PrimaryButton

A primary button with a gradient hover / active state, with four available color themes: gold, blue, teal and green.

## Props

- `as` (string): The DOM tag or react component to use for the Grommet button element.
- `color` (string): Can be `gold` (default), `blue`, `teal` or `green`.
- `disabled` (boolean): Applied to button element.
- `href` (string): Attribute of the button's anchor element.
- `label` (string || component) - the label for the button.
- `onClick` (func): Called when button is clicked.

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
