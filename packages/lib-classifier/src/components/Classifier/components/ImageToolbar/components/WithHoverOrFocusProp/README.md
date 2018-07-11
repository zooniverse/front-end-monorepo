# WithHoverOrFocusProp

A higher order component to that provides props for handling focus or hover states.

## Usage

```
const Button = (props) => (
  <button {...props.eventHandlers}>
    Foobar
    {props.hoverOrFocus ? 'is hovered or focused' : 'is resting'}
  </button>
)
```

## Props

- `eventHandlers` (object) - A object containing the event handlers which will need to be bound to your target element
- `focused` (boolean)
- `hovering` (boolean)
- `hoverOrFocus` (boolean)
