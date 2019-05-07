# withResponsiveContext

A HOC which accepts a component and returns the component
wrapped in Grommet's `ResponsiveContext` component, with the size passed into
wrapped component's `size` prop.

## Usage

```js

class MyComponent extends React.Component {
  render () {
    ...
  }
}

export default withThemeContext(MyComponent)
```
