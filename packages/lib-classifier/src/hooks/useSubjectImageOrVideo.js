/*
useSubjectImageOrVideo
A custom hook that fetches an image OR a video from a URL.

Input: an object containing...
- *.src: the URL of the media we want to fetch. (String)
- *.type: the type of media we want to fetch. Either "image" or "video" (String)
- *.frame: the index of the media item in its subject.locations. (Integer)
  - Only used for onReady() callback, honestly.
- *.onReady: callback function when media successfully loads. Usually linked to
  SubjectViewerStore.onSubjectReady(), which looks like...
    onSubjectReady (event, frameIndex) { ... }
  ...where event should contain the .clientWidth, .clientHeight, .naturalWidth,
  and .naturalWidth/Height of the media element, for sizing purposes.
- *.onError: callback function when media fails to load. Looks like...
    handleError (errorMessage) { console.error('OH NO', errorMessage) }

Output: an object containing...
- *.media: Image object OR <video> element used to fetch the media.
  - null by default.
- *.type: echoes the 'type' from the input, in case somebody needs it.
- *.mediaElementRef: ref to the media element meant to host/display the media
  file. For an image file, the media element is likely an SVG <image> inside the
  SingleImageCanvas. For a video file, the media element is likely a HTML
  <video>. This is used mostly get client/natural Width/Height to be called
  with onReady().
- *.loading: loading state. True by default. (Boolean)
- *.error: error message/error object, if any. null by default.

Dev Notes (2026):
- Initially developed to allow FlipbookViewer to support both image and video
  files.
- A lot of this was initially adapted from useSubjectImage(), mostly for the
  sake of convention, but then rewritten heavily to support two types of media.
  If you've used useSubjectImage(), please read through the notes here to
  recognise the differences between the two.
- For example, there's no "placeholder image" object when the media is fetching.
 */

import { useEffect, useRef, useState } from 'react'

export default function useSubjectImageOrVideo({ src, type = 'image', frame = 0, onReady, onError }) {
  const mediaElementRef = useRef()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [media, setMedia] = useState(null)  // When set, this is the equivalent of an Image() object or a <video> element.

  // When a new media file is specified, fetch the file.
  useEffect(function onNewMedia () {
    if (src && type === 'image') {
      fetchImage()
    } else if (src && type === 'video') {
      fetchVideo()
    } else {
      // If for some reason that no src or valid type was specified, reset everything.
      setMedia(null)
      setLoading(false)
      setError(null)
    }
  }, [src, type])

  function fetchImage () {
    // Initialise fetch.
    setLoading(true)
    setError(null)

    // Use a standard Image object to fetch the data.
    const { Image } = window
    const img = new Image()
    setMedia(img)    
    img.onload = onImageLoad
    img.onerror = onMediaError
    img.src = src  // Triggers fetch action
  }
  
  function onImageLoad (event) {
    setLoading(false)

    // Once the image loads, submit the height and width to onReady().
    const { naturalHeight, naturalWidth, src } = event.target
    if (src !== '' ) {
      const mediaElement = mediaElementRef.current
      const { width: clientWidth, height: clientHeight } = mediaElement
        ? mediaElement.getBoundingClientRect()
        : {}
      const target = { clientHeight, clientWidth, naturalHeight, naturalWidth }
      onReady({ target }, frame)
    }
  }

  function fetchVideo () {
    // Initialise fetch.
    setLoading(true)
    setError(null)

    // Use <video> element to pre-load video files.
    const video = document.createElement('video')
    setMedia(video)
    video.onloadedmetadata = onVideoLoad
    video.onerror = onMediaError
    video.src = src  // Triggers fetch action
  }

  function onVideoLoad (event) {
    setLoading(false)

    // Once the video loads, submit the height and width to onReady().
    const { videoHeight, videoWidth, src } = event.target
    if (src !== '' ) {
      const mediaElement = mediaElementRef.current
      const { width: clientWidth, height: clientHeight } = mediaElement
        ? mediaElement.getBoundingClientRect()
        : {}
      const target = { clientHeight, clientWidth, naturalHeight: videoHeight, naturalWidth: videoWidth }
      onReady({ target }, frame)
    }
  }

  function onMediaError (err) {
    setLoading(false)
    setError(error)
    onError(error)
  }

  return { media, type, mediaElementRef, loading, error }
}
