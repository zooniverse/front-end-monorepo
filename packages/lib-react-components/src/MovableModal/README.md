# Movable Modal

A modal component wrapped by [react-rnd](https://github.com/bokuweb/react-rnd/blob/master/README.md) to provide resize and draggable functionality and uses the generic `Modal` component. Accepts the following props:

- `active` (boolean) - Defaults to `false`. Determines whether the modal is visible or not
- `closeFn` (function) - Called when clicking outside the modal, or when the Esc button is pressed.
-  `headingBackground` (string or object) -  Defaults to `'brand'`. The background color for the modal header. It can be set to any CSS color value or color string value from the Zooniverse Grommet theme or an object setting the color for the light and dark theme.
- `pad` (string or object) - Defaults to `medium`. Determines Grommet `Box` padding of the modal body. 
- `title` (string) - Defaults to an empty string. Used as the modal title in the header.
- `titleColor` (object or string) - Defaults to `'neutral-6'` (white). The color of the title text. It can be set to any CSS color value or color string value from the Zooniverse Grommet theme or an object setting the color for the light and dark theme.

Additional props for the HOC `Layer component (see Notes):

- `animate` (boolean) - Defaults to `false`. Same as Grommet's `Layer` animate prop. Determines whether or not to animate on rendering. 
- `className` (string) - Defaults to an empty string. CSS class applied to the `Layer` component.
- `modal` (boolean) - Defaults to `true`. Same as Grommet's `Layer` modal prop. Determines if the modal renders an underlayer preventing interaction with other elements.
- `plain` (boolean) - Defaults to `false`. Same as Grommet's `Layer` plain prop. Determines if the underlayer is styled.
- `position` (string) - Defaults to `'center'`. Same as Grommet's `Layer` position prop. Determine the position of the rendered modal in the viewport. 

Additional props for the `Rnd` component:

- `rndProps` (object) - Defaults to:

```js
{
  minHeight: 100,
  minWidth: 350,
  default: {
    x: 0,
    y: 0
  }
}
```

The props `minHeight` and `minWidth` in the object get applied to the `Rnd` `minHeight` and `minWidth` props. The `default` prop is applied to `Rnd`'s `default` prop. The object can accept any other additional props allowed by `Rnd`.

## Example

```js
<MovableModal active={isActive} closeFn={setActive} title={title}>
  <Paragraph>Leo mollis dictum id dis maecenas consectetur metus elementum vivamus nisl</Paragraph>
</MovableModal>
```

## Notes

This component uses the Grommet [`Layer`](https://v2.grommet.io/layer) component, which in turn uses React Portals for rendering, by way of the `withLayer` HOC located in the helpers folder. Enzyme doesn't currently support portals, so the modal is wrapped by default in a HOC which provides the Layer, and also exported as a named default for testing.

The child node must have correct CSS applied to it so that it resizes as expected with the parent modal resizing. 