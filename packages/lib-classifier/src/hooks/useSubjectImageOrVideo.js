/*
useSubjectImageOrVideo
A custom hook that fetches an image OR a video from a URL.
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
    const { naturalHeight, naturalWidth, src } = event.target
    if (src !== '' ) {
      const svgImage = mediaElementRef.current
      const { width: clientWidth, height: clientHeight } = svgImage
        ? svgImage.getBoundingClientRect()
        : {}
      const target = { clientHeight, clientWidth, naturalHeight, naturalWidth }
      setLoading(false)
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

  console.log('+++ loading: ', loading ? '🟠' : '✅', image)
  return { image, error, loading, mediaElementRef }
}
