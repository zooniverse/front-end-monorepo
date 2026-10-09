# Helpers for Settings Page

## How To: fetch and update user data

TL;DR:

- Use useUserData() to fetch user data.
- Use mutate() to make local changes (e.g. on text input, when user inputs a new
  display name). Remember to set `options.revalidate=false`.
- Use updateUserData() INSIDE mutate() to save changes to _Panoptes._ and then
  force revalidation (`options.revalidate=true`) to make sure server changes
  are legit.
- Keep an eye on when SWR automatically revalidates (i.e. on network reconnect)
  because this will usually _undo any unsaved local changes._

## deleteUserMedia()

deleteUserMedia() is a function for _deleting_ Panoptes user data related to
_media files._ (Either the Profile Avatar or Profile Header.)

Input: (separate args)
1. (string): user's ID.
2. (string): type of media we're interested in. Either `"avatar"` or
   `"profile_header"`

Output:
- `true` on successful delete.

Potentially throws:
- API errors from Panoptes.

Notes:
- Performs a GET to Panoptes (to get some validation data for the header),
  then a DELETE.
- Protip: this isn't an SWR hook, so you'll need to manually keep track of the
  processing/saving state.

## readImageFile()

readImageFile() is an async function that reads the content of a File object as
a data URL string.

- To be honest, this function can be used to read any file (not just image
  files) but in practice, FEM only uses it with PNGs/GIFs/JPEGs/SVGs. The
  function is named such to make its implicit image-centric intent clear.
- Future devs, please feel free to rename/rework this function if you start
  using it to read video files or whatever.

Input:
- `file`: a File object. (e.g. from `<input type="file">`)

Output:
- A Promise that returns a string (data URL) when resolved.

Potentially throws:
- FileReader errors.

### Example

```
const imageData = await readImageFile(imageFile)
return <img src={imageData} />
```

## resizeImageData()

resizeImageData() is an async function that resizes (shrinks) an image down to
a target file size (data size, in bytes).

Here's how it works:

- If an optional `ratio` is specific, crop off excess width OR excess height
  from the image, until the image fits the ratio.
- Then, scale/resize the image (in increments of 5% of its original size) until
  the image's data size/file size is below a target.
- The resized image will be returned as BOTH a data URL string (useful if you
  want to plonk this into an `<img>` as a client-side preview) AND a data blob
  (useful if you want to upload the resized image to Panoptes).

Notes:

- This function has been tested with PNGs, JPEGs, and SVGs.
- The resized image (output) will be a PNG with default quality, and
  transparency preserved.

Input:
- `imageData` (string): the contents of an image file, as a data URL.
- `maxDataSize` (number): the target file size/data size, in bytes.
- `targetRatio` (number, optional): the aspect ratio to crop the resized image
  down to.

Output:
- An object with:
  - `string` (string): the resized image as a data URL string.
  - `blob` (Blob):  the resized image as a Blob object.

Potentially throws:
- FileReader errors.
- "Invalid input" error.
- "Couldn't reasonably resize image" error, which occurs if the maxDataSize
  target still couldn't be met after resizing this image down to the smallest
  scale of 5%.

### Example

```
const imageData = readImageFileOrWhatever()  // string/data URL
const maxSize = 60000  // i.e. 60kb
const optionalRatio = 1  // crop image to a 1:1 square

const {
  string: resizedSquareImageData,
  blob: resizedSquareImageBlob
} = await resizeImageData(imageData, maxSize, optionalRatio)
```

## updateUserData()

updateUserData() is a function for _saving_ changes to Panoptes.

Input: (separate args)
1. (object): an object with key-value pairs that we want to change.
2. (string): user's ID.

Output:
- Updated User resource, on success.

Potentially throws:
- API errors from Panoptes.

Notes:
- Performs a GET to Panoptes (to get some validation data for the header),
  then a PUT with the new data.
- Protip: this isn't an SWR hook, so you'll need to manually keep track of the
  processing/saving state.

### Example

```
try {
  const updatedUser = await updateUserData({ display_name: 'Zootester 1X'}, '12345678')
} catch (err) {}

// Alternatively,
mutate(prevData => { 
  try {
    const unusedUpdatedUser = await updateUserData({ display_name: 'Zootester 1X'}, '12345678')
  } catch (err) {}
  return prevData
}, {
  // Send another GET to Panoptes to make sure local data matches server data.
  revalidate: true,
}) 
```

### Dev Notes

For future work, consider using [`useSWRMutation()`](https://swr.vercel.app/docs/mutation#useswrmutation)
if we really, really want to sync our local data to whatever Panoptes responds
with.

## uploadUserMedia()

Function for _uploading_ (or replacing) Panoptes user data related to _media files._
(Either the Profile Avatar or Profile Header.)

Input:
- `userId` (string): user's ID.
- `mediaType` (string): type of media we're interested in. Either `"avatar"`
  or `"profile_header"`
- `file` (Blob): file to be uploaded to Panoptes.
  - ⚠️ until we add modify this function to sanitises SVG files, we will only
    accept PNG files.

Output:
- `true` on success.

Potentially throws:
- Input errors. (Invalid media types, invalid file types)
- API errors from Panoptes.
- API errors from Azure storage.

### Dev Notes

OK, so how do we upload user files (aka "a Media Resource that's
associated with another Panoptes Resource") to Panoptes?

1. we send a POST request to e.g. /users/1234/avatar to create a new EMPTY
   Media Resource.
2. In the POST's response, there's a URL where a file should be uploaded to.
   Currently, there's no file there. Fortunately, the URL contains a magic
   token that allows us to upload a file there.
   e.g. https://panoptesuploadsstaging.blob.core.windows.net/public/user_avatar/beep-boop.png?token=1234&expires_in=5_seconds_from_now_or_whatever 
3. We then need to PUT the file that URL.

⚠️ Just remember that SVG files are a special case, and require some
sanitisation before upload!

## useUserData()

useUserData() is a hook for _fetching_ Panoptes user data.

Input:
- An Object containing:
  - `login` (string): user's login (username).
  - `token` (string): user's Panoptes authentication token.

Output:
- Standard useSWR() output. See example.

### Examples

```
const { data: user, isLoading, isValidating, error, mutate } = useUserData({ login: 'zootester1' })
```

The **mutate** function is used to modify the _local copy_ of the user data
_without_ explicitly saving the changes to Panoptes.

```
// Option A:
mutate({ ...user, ['display_name']: 'Zootester 1X' })

// Alternatively, Option B:
mutate(prevData => ({ ...prevData, ['display_name']: 'Zootester 1X' }))
```

### Dev Notes

Regarding SWR:

- useUserData() uses SWR to ensure the data is fresh by periodically checking
  in with Panoptes.
  - In practice this just mostly means it automatically checks when their
    network reconnects after a disconnect.
  - We also _manually_ trigger a revalidate when we do a mutate() +
    updateUserData() combo to save data to Panoptes.
  - We do NOT automatically revalidate when the window (re-)gains focus, because
    it will reset any local changes/changes not saved to Panoptes caused by
    mutate(). And boy, this is a very annoying experience if you're, say,
    tabbing into another window to check some details.

## useUserMedia()

useUserMedia() is a hook for fetching Panoptes user data related to
_media files._ Specifically, you can get either the user's Profile Avatar or
Profile Header.

Input:
- An Object containing:
  - `userId` (string): user's ID.
  - `mediaType` (string): type of media we're interested in. Either `"avatar"`
    or `"profile_header"`

Output:
- Standard useSWR() output. See example.

### Example

```
const { data: avatar, isLoading, isValidating, error, mutate } = useUserMedia({ userId: '12345', mediaType: 'avatar' })

if (avatar) {
  return (
    <img src={avatar.src} />
  )
}
```
