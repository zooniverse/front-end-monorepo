# getFixedNumber

This function is used in SingleVideoViewerContainer. It's equivalent to `parseFloat(number.toFixed(digits))`, but `toFixed()` is an unreliable rounding function.

`getFixedNumber` takes two variables:
- `number`: This is the timestamp value in SingleVideoViewerContainer or InteractionLayer. Must be a number.
- `digits`: The number of decimal places to round to.

It returns one number rounded to the number of decimal places defined by `digits`.
