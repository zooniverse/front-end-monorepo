# GenericAnnouncement

A standard banner component used to show project-related announcements to volunteers, and typically rendered under the `ProjectHeader`.

## Props

- `announcement` (string, required) - a string of plain text or Markdown to show as the announcement text
- `closeFn` (function) - callback function attached to the banner's close button
- `color` (string) - the Grommet theme color to use as the background
- `dismissable` (boolean) - conditional on whether or not to show the close button. If this is true, you should define `closeFn`.

## Example

```js
function BannerContainer () {
  const [showBanner, setShowBanner] = useState(true)
  return (
    <GenericAnnouncement
      announcement='Hello world!'
      closeFn={() => setShowBanner(false)}
      color='neutral-2'
      dismissable
    />
  )
}
```
