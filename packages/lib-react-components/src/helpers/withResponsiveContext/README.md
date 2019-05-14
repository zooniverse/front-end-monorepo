# withResponsiveContext

A HOC which accepts a component and returns the component
wrapped in Grommet's `ResponsiveContext` component, with the size passed into
wrapped component's `screenSize` prop.

## Usage

```js

class MyComponent extends React.Component {
  render () {
    const { screenSize } = this.props
    const width = (screenSize === 'small' ? '400px' : '800px' )
    return (
      <div width={width}>
        <h1>Hello World</h1>
      </div>
    )
  }
}

export default withThemeContext(MyComponent)
```
