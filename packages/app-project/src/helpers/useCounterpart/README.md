# useCounterpart

A custom hook when used in a React component will cause the component to re-render when counterpart's current locale changes.

## Example

```js
const SomeComponent = () => {
  const currentLocale = useCounterpart()

  return (
    <Box>
      {counterpart('SomeComponent.text')}
    </Box>
  )
}
```
