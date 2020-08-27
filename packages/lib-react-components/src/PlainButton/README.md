# PlainButton

A button component that looks like a plain text link. Has the same API as Grommet's `Button`.

The `Button` label is using the `SpacedText` component. The `text` prop is the string label to be set inside the `SpacedText`. The `SpacedText` size can also be set using the `labelSize` prop, defaults to `medium`.

####Optional prop: textColor
The text color can be customized by passing in a string value representing a color.

Example use cases:

```
<PlainButton
  textColor={'teal'}
/>

or

<PlainButton
  textColor={'#008080'}
/>
```

