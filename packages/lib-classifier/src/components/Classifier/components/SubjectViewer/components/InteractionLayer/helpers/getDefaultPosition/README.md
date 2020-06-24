# getDefaultPosition

This is a helper utility function used in conjunction with components that have use the `MovableModal` from shared components library to calculate the position for the underlying `Rnd` component to use upon initial render. It takes an object for parameters that default to:

```js
{
  bounds = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  minHeight = 250,
  minWidth = 350
}
```

The bounds object should be defined whereas the minHeight and minWidth are optional, but should match the min-height and min-width set to the `rndProps` on the `MovableModal` if defined there.

