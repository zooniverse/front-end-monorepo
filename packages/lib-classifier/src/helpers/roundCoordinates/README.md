# roundCoordinates

A helper function to round a set of { x, y } coordinates to two decimal places.

### accepts

**coordinate Object:** Required. Type: object.
The object passed in must have and x property and a y property. The values of x and y must be numbers.

E.g.

```js
{
  x: 34.7855555555555,
  y: 234.8944444444444
}
```

### returns

```js
{
  x: 34.79,
  y: 234.89
}
```

Other examples of rounding behavior:

`1.005 --> 1.01`

`10 --> 10`

`1.7777 --> 1.78`

`9.1 --> 9.1`

`1234.56789 --> 1234.57`

### Resource

[MDN: Math.round()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round)
