/*
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
 */

const RESIZE_INCREMENT = -0.05

export default async function resizeImageData (imageData, maxDataSize = 0, targetRatio) {
  if (!imageData || maxDataSize <= 0) throw new Error('Invalid input.')

  // We're going to draw the imageData onto a canvas, so let's prepare that.
  const canvas = document.createElement('canvas')
  const c2d = canvas.getContext('2d')
  const imageObject = await loadImageObjectFromData(imageData)
  const imageWidth = imageObject.naturalWidth
  const imageHeight = imageObject.naturalHeight
  let canvasWidth = imageObject.naturalWidth
  let canvasHeight = imageObject.naturalHeight

  // If our resized image has a target ratio (e.g. 1:1 for a perfect square),
  // crop the image to fill the canvas using "cover" logic.
  let xOffset = 0, yOffset = 0
  if (targetRatio) {
    const imageRatio = imageWidth / imageHeight  // ⚠️ Will quietly return nonsense value of Infinity or NaN if imageHeight is 0.
    if (imageRatio > targetRatio) {
      // Image is wider than target, therefore keep height and crop width.
      canvasWidth = imageHeight * targetRatio
      canvasHeight = imageHeight
      xOffset = -(imageWidth - canvasWidth) / 2
    } else {
      // Image is taller than target, therefore keep width and crop height.
      canvasWidth = imageWidth
      canvasHeight = imageWidth * targetRatio
      yOffset = -(imageHeight - canvasHeight) / 2
    }
  }

  // Prepare to resize!
  let blob, string  // This is the resized image data (output), in two formats: blob/file (for upload), and data URL string. 
  let scale = 1

  // To ensure the image meets the target maxDataSize threshold, we're first
  // going to paint the (potentially cropped) image onto a canvas at 100% scale,
  // then check the size. If it's too large, we'll scale it down to 95%, then
  // 90%, etc until we hit the target.
  for (scale = 1 ; scale > 0 ; scale += RESIZE_INCREMENT) {

    // Set canvas width and height, as this will define the dimensions of the exported image.
    canvas.width = canvasWidth * scale
    canvas.height = canvasHeight * scale

    // Draw the image onto the canvas.
    c2d.clearRect(0, 0, canvasWidth, canvasHeight)  // Yes, we're clearing the original canvasWidth x canvasHeight, not canvasWidth*scale x canvasHeight*scale
    c2d.drawImage(imageObject, xOffset * scale, yOffset * scale, imageWidth * scale, imageHeight * scale)

    // Now extract the resized image!
    blob = await getImageBlobFromCanvas(canvas)
    string = canvas.toDataURL()

    // Does it meet the target file size?
    if (blob.size <= maxDataSize) break
  }

  if (scale <= 0) throw new Error("Couldn't reasonably resize image.")

  return {
    string,
    blob,
  }
}

/*
loadImageObjectFromData() converts image data (in the form of a data URL string)
into an Image object. This is useful for figuring out the width/height of the
image data, and for painting the image data onto a canvas. Use with async-await.
 */
function loadImageObjectFromData (imageData) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = (err) => reject(err)
    image.src = imageData
  })
}

/*
getImageBlobFromCanvas() is a Promise wrapper that lets us use
canvas.toBlob() with async-await.
 */
function getImageBlobFromCanvas (canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
      } else {
        reject(new Error("Couldn't get image blob from canvas."))
      }
    })
  })
}
