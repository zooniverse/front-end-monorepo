# addQueryParams

A server/client-agnostic helper function to add the current URL query parameters to a string, for generating links.

## Arguments

- `as` (string) - the string to append the query parameters to
- `router` (object) - an instance of Next.js's [router](https://github.com/zeit/next.js/#userouter) object

## Example

```js
function SomeLinkComponent (props) {
  const { as, href } = props
  const router = useRouter()
  return (
    <Link as={addQueryParams('/page/1', router)} href='/page/[id]'>
      text
    </Link>
  )
}
```
