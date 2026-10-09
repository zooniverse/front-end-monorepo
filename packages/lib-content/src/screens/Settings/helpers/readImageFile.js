/*
readImageFile() is an async function that reads the content of a File object as
a data URL string.

- To be honest, this function can be used to read any file (not just image
  files) but in practice, FEM only uses it with PNGs/GIFs/JPEGs/SVGs. The
  function is named such to make its implicit image-centric intent clear.
- Future devs, please feel free to rename/rework this function if you start
  using it to read video files or whatever.

Input:
- `file` (file): a File object. (e.g. from `<input type="file">`)

Output:
- A Promise that returns a string (data URL) when resolved.

Potentially throws:
- FileReader errors.
 */

export default async function readImageFile (file) {
  if (!file) return
  return await readFileAsDataURL(file)
}

/*
readFileAsDataURL() is a Promise wrapper that lets us use FileReader with
async-await.
 */
function readFileAsDataURL (file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.addEventListener('load', () => {
      resolve(fileReader.result)
    })
    fileReader.addEventListener('error', () => {
      reject(fileReader.error)
    })
    fileReader.readAsDataURL(file)
  })
}