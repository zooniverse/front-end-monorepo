`Tooltip` uses Grommet's [`Drop`](https://v2.grommet.io/drop) and [`Box`](https://v2.grommet.io/box) components. The `Drop` is the outer component that determines the position and function of the tooltip. The `Box` is the inner component that wraps the content or nodes passed as children to provide basic layout and styles. 

## Props

- `align` (object) - the `Drop` `align` prop
- `boxAlign` (string) - the inner `Box` `align` prop. Default: `'center'`
- `boxAnimation` (string or object) - the inner `Box` `animation` 
- `boxBackgroundColor` (string) - passed to the inner `Box` `background` prop. Set it to either the zooTheme's light or dark background or something else. The zooTheme handles the font color automatically for you depending on the light or dark background. Default: `'white'`
- `boxPad` (string or object) - the inner `Box` `pad`. Default: `{ vertical: "xsmall", horizontal: "small" }`
- `children` (string or node) - The content of the Tooltip, either just a string or text or more HTML or React nodes. Required.
- `target` (React ref object) - the `Drop` `target` prop. Required. Note that this does not work with the newest React Ref API, `React.createRef()`.

The `Tooltip` component passes any additional props to `Drop`
