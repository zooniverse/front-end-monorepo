# withThemeContext

A HOC which accepts a component and a theme object, and returns the component
wrapped in Grommet's `ThemeContext` component, with the theme passed into
`ThemeContext`'s `value` prop.

## Usage

```js
const theme = {
  ...
}

class MyComponent extends React.Component {
  render () {
    ...
  }
}

export default withThemeContext(MyComponent, theme)
```
