/*
useSubjectImageOrVideo
A custom hook that fetches an image OR a video from a URL.

Input: an object containing...
- *.type: the type of media we want to fetch. Either "image" or "video" (String)
- *.src: the URL of the media we want to fetch. (String)
- *.frame: the index of the media item in its subject.locations. (Integer)
- *.onReady: callback function when media successfully loads. Usually linked to
  SubjectViewerStore.onSubjectReady(), which looks like...
    onSubjectReady (event, frameIndex) { ... }
  ...where event should contain the .clientWidth, .clientHeight, .naturalWidth,
  and .naturalWidth/Height of the media element, for sizing purposes.
- *.onError: callback function when media fails to load. Looks like...
    handleError (errorMessage) { console.error('OH NO', errorMessage) }

Output: an object containing...
- *.image: <img> element/Image object used to fetch the media, if any.
  - null by default, but...
  - ...when type='image' and loading=true, this is a PLACEHOLDER object.
- *.video: <video> element used to fetch the media, if any. null by default.
  - null by default, but...
  - ...when type='video' and loading=true, this is a PLACEHOLDER object.
- *.error: error message/error object, if any. null by default.
- *.loading: loading state. True by default. (Boolean)
- *.mediaElementRef: ref to the media element meant to host/display the media
  file. For an image file, the media element is likely an SVG <image> inside the
  SingleImageCanvas. For a video file, the media element is likely a HTML
  <video>. This is used mostly get client/natural Width/Height to be called
  with onReady().

Dev Notes (2026):
- Initially developed to allow FlipbookViewer to support both image and video
  files.
- A lot of this was adapted from useSubjectImage(), mostly for the sake of
  convention. If you find any weird inefficiencies here, please go ahead and
  improve it; useSubjectImage()'s internal code wasn't too well documented so
  a lot of questions like "why have 'placeholder image' instead of null by
  default?" will be met with a shrug emoji. 🤷
- That said, there are sufficient differences between useSubjectImage and
  useSubjectOrVideo that it may be worth unshackling the latter from the initial
  functionality/behaviour conventions.
 */

import { useEffect, useRef, useState } from 'react'

const DEFAULT_PLACEHOLDER_IMAGE = {
  naturalHeight: 600,
  naturalWidth: 800,
  src: ''
}

const DEFAULT_PLACEHOLDER_VIDEO = {
  videoHeight: 600,
  videoWidth: 800,
  src: ''
}

export default function useSubjectImageOrVideo({ type = 'image', frame = 0, src, onReady, onError }) {
  const mediaElementRef = useRef()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [image, setImage] = useState(null)  // When set, this is the equivalent of an <img> element or Image() object.
  const [video, setVideo] = useState(null)  // When set, this is the equivalent of a <video> element.

  // When a new media file is specified, fetch the file.
  useEffect(function onNewMedia () {
    if (src) {
      if (type === 'image') {
        fetchImage()
      } else if (type === 'video') {
        fetchVideo()
      } else {
        reset()
      }
    } else {
      // If for some reason that no src or valid type was specified, reset everything.
      reset()
    }
  }, [src, type])

  function reset () {
    setError(null)
    setLoading(false)
    setImage(null)
    setVideo(null)
  }

  function fetchImage () {
    // Initialise fetch.
    setError(null)
    setLoading(true)
    setImage(DEFAULT_PLACEHOLDER_IMAGE)
    setVideo(null)

    // Use a standard Image object to fetch the data.
    const { Image } = window
    const img = new Image()
    setImage(img)
    
    // Fetch!
    img.onload = onImageLoad
    img.onerror = onImageError
    img.src = src
  }
  
  function onImageLoad (event) {
    setLoading(false)

    // Once the image 
    const { naturalHeight, naturalWidth, src } = event.target
    if (src !== '' ) {
      const svgImage = mediaElementRef.current
      const { width: clientWidth, height: clientHeight } = svgImage
        ? svgImage.getBoundingClientRect()
        : {}
      const target = { clientHeight, clientWidth, naturalHeight, naturalWidth }
      onReady({ target }, frame)
    }
  }

  function onImageError (err) {
    onError(error)
    setError(error)
    setLoading(false)
  }

  async function fetchVideo () {
    // TODO
  }

  return { image, video, error, loading, mediaElementRef }
}
