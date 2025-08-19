# Modal

A generic modal component. Accepts the following props:

- `active` (boolean) - determines whether the modal is visible or not
- `bodyBackground` (object or string) - Defaults to `{ dark: 'dark-5', light: 'neutral-6' }`. The background color for the modal body. It can be set to any CSS color value or color string value from the Zooniverse Grommet theme or an object setting the color for the light and dark theme.
- `closeFn` (function) - Optional function called when clicking outside the modal, or when the Esc button is pressed. If this is not present, then the close button is not shown and the modal cannot be closed except by taking action in the content eg. pressing a button to continue.
-  `headingBackground` (object or string) - Defaults to `'brand'`. The background color for the modal header. It can be set to any CSS color value or color string value from the Zooniverse Grommet theme or an object setting the color for the light and dark theme.
- `pad` (string or object) - Defaults to `medium`. Determines Box padding of the modal body.
- `title` (string) - string to use as the modal title
- `titleColor` (object or string) - Defaults to `'neutral-6'` (white). The color of the title text. It can be set to any CSS color value or color string value from the Zooniverse Grommet theme or an object setting the color for the light and dark theme.

Additional props for the HOC `Layer component (see Notes):

- `animate` (boolean) - Defaults to `false`. Same as Grommet's `Layer` animate prop. Determines whether or not to animate on rendering.
- `className` (string) - Defaults to an empty string. CSS class applied to the `Layer` component.
- `modal` (boolean) - Defaults to `true`. Same as Grommet's `Layer` modal prop. Determines if the modal renders an underlayer preventing interaction with other elements.
- `plain` (boolean) - Defaults to `false`. Same as Grommet's `Layer` plain prop. Determines if the underlayer is styled.
- `position` (string) - Defaults to `'center'`. Same as Grommet's `Layer` position prop. Determine the position of the rendered modal in the viewport.

## Example

```js
<Modal active={isActive} closeFn={setActive} title={title}>
  Leo mollis dictum id dis maecenas consectetur metus elementum vivamus nisl
</Modal>
```

## Notes

This component uses the Grommet [`Layer`](https://v2.grommet.io/layer) component, which in turn uses React Portals for rendering. Enzyme doesn't currently support portals, so the modal is wrapped by default in a HOC which provides the Layer, and also exported as a named default for testing.
