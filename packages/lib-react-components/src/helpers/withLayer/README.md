# withLayer HOC

A higher order component using the Grommet [`Layer`](https://v2.grommet.io/layer) to wrap other components like `Modal` or `MovableModal`. Accepts the following props:

- `active` (boolean) - determines whether the modal is visible or not
- `closeFn` (function) - function called when clicking outside the modal, or when the Esc button is pressed
-  `headingBackground` (string) - the background color for the modal header. Defaults to `'brand'` but can be set to any CSS color value or color string value from the Zooniverse Grommet theme.
- `pad` (string or object) - determines Box padding of the modal body. Defaults to `medium`.
- `title` (string) - string to use as the modal title

Additional props for the HOC `Layer component (see Notes):

- `animate` (boolean) - Defaults to `false`. Same as Grommet's `Layer` animate prop. Determines whether or not to animate on rendering. 
- `className` (string) - Defaults to an empty string. CSS class applied to the `Layer` component.
- `modal` (boolean) - Defaults to `true`. Same as Grommet's `Layer` modal prop. Determines if the modal renders an underlayer preventing interaction with other elements.
- `plain` (boolean) - Defaults to `false`. Same as Grommet's `Layer` plain prop. Determines if the underlayer is styled.
- `position` (string) - Defaults to `'center'`. Same as Grommet's `Layer` position prop. Determine the position of the rendered modal in the viewport. 

Any other props get passed on to the wrapped component.

## Example

```js
withLayer(Modal)
```
