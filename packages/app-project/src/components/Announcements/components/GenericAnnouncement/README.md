# GenericAnnouncement

A standard banner component used to show project-related announcements to volunteers, and typically rendered under the `ProjectHeader`.

Designs on Invision: https://projects.invisionapp.com/d/main#/console/12924056/344288110/preview

## Props

- `announcement` (string, required) - a string of plain text or Markdown to show as the announcement text
- `closeFn` (function, required) - callback function attached to the banner's close button
- `color` (string) - the Grommet theme color to use as the background

## Example

```js
function BannerContainer () {
  const [showBanner, setShowBanner] = useState(true)
  return (
    <GenericAnnouncement
      announcement='Hello world!'
      closeFn={() => setShowBanner(false)}
      color='neutral-4'
    />
  )
}
```
