import { useEffect, useRef, useState } from 'react'

const defaultPlaceholder = {
  naturalHeight: 600,
  naturalWidth: 800,
  src: ''
}

const DEFAULT_HANDLER = () => false

function preloadImage({
  src,
  onLoad = DEFAULT_HANDLER,
  onError = DEFAULT_HANDLER
}) {
  const { Image } = window
  const img = new Image()
  img.onload = onLoad
  img.onerror = onError
  img.src = src
}

export default function useProgressiveImage({
  delay = 0,
  placeholderSrc = '',
  src,
  onLoad = DEFAULT_HANDLER,
  onError = DEFAULT_HANDLER
}) {
  const placeholder = {
    ...defaultPlaceholder,
    src: placeholderSrc
  }
  const [loading, setLoading] = useState(true)
  const imgRef = useRef(placeholder)
  const [error, setError] = useState(null)

  function onImageLoad(event) {
    imgRef.current = event.target
    onLoad(event)
    setLoading(false)
  }

  function onImageError(error) {
    onError(error)
    setError(error)
    setLoading(false)
  }

  function fetchImage() {
    setLoading(true)
    setError(null)
    preloadImage({
      src,
      onLoad: delay ? event => setTimeout(onImageLoad, delay, event) : onImageLoad,
      onError: onImageError
    })
  }

  useEffect(function onNewImage() {
    if (src) {
      fetchImage()
    }
  }, [src])

  return { img: imgRef.current, error, loading }
}
