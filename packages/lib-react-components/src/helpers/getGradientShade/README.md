# getGradientShade

A helper function which accepts a colour hex string as an argument, and returns
the correct secondary shade to use for the linear gradients used in our buttons.

## Example

```js
import { normalizeColor } from 'grommet/utils'
import { getGradientShade } from '@zooniverse/react-components'

const theme = {
  button: {
    extend: props => {
      const globalColors = props.theme.global.colors
      const color = normalizeColor(props.colorValue || props.theme.button.border.color, props.theme)
      const secondaryColor = getGradientShade(color)

      return `
        background: ${color};
        &:hover {
          background: linear-gradient(${color}, ${secondaryColor});
        }
      `
    }
  }
}
```
