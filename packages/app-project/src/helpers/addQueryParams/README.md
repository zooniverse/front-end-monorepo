# addQueryParams

A server/client-agnostic helper function to add the current URL query parameters to a string, for generating links.

## Arguments

- `href` (string) - the string to append the query parameters to
- `router` (object) - an instance of Next.js's [router](https://nextjs.org/docs/api-reference/next/router#userouter) object
- `pfe` (boolean) - indicates if this is a link to a PFE page such as Talk, Collections, Recents

## Example

```js
function SomeLinkComponent (props) {
  const { href, pfe } = props
  const router = useRouter()
  return (
    <Link href={addQueryParams(href, router, pfe)} >
      text
    </Link>
  )
}
```
