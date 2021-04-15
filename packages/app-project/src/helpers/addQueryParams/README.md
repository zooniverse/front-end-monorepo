# addQueryParams

A server/client-agnostic helper function to add the current URL query parameters to a string, for generating links.

## Arguments

- `url` (string) - the string to append the query parameters to
- `router` (object) - an instance of Next.js's [router](https://github.com/zeit/next.js/#userouter) object

## Example

```js
function SomeLinkComponent (props) {
  const { href } = props
  const router = useRouter()
  return (
    <Link href={addQueryParams(href, router)} >
      text
    </Link>
  )
}
```
