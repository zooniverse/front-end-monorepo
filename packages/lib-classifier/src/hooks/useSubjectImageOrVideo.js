/*
useSubjectImageOrVideo
A custom hook that fetches an image OR a video from a URL.
 */

import { useEffect, useRef, useState } from 'react'

const DEFAULT_IMAGE_PLACEHOLDER = {
  naturalHeight: 600,
  naturalWidth: 800,
  src: ''
}

export default function useSubjectImageOrVideo({ type = 'image', frame = 0, src, onReady, onError }) {
  const mediaElementRef = useRef()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [image, setImage] = useState(DEFAULT_IMAGE_PLACEHOLDER)

  useEffect(function onNewImage() {
    if (src) {
      if (type === 'image') {
        fetchImage()
      } else if (type === 'video') {
        fetchVideo()
      }
    }
  }, [src, type])

  function fetchImage () {
    const { Image } = window
    const img = new Image()
    setImage(img)
    img.onload = onImageLoad
    img.onerror = onImageError
    img.src = src
  }

  async function fetchVideo () {
    // TODO
  }
  
  function onImageLoad (event) {
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

  return { image, error, loading, mediaElementRef }
}
