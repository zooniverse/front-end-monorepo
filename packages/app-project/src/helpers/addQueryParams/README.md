# addQueryParams

A client-side helper function to add app-wide URL query parameters to a string, for generating links (only `env` or `demo`).

## Arguments

- `url` (string) - the string to append the query parameters to

## Example

```js
function SomeLinkComponent (props) {
  const { href } = props
  return (
    <Link href={addQueryParams(href)} >
      text
    </Link>
  )
}
```
