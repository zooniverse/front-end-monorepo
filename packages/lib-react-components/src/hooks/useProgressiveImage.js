import { useEffect, useState } from 'react'

const defaultPlaceholder = {
  naturalHeight: 600,
  naturalWidth: 800,
  src: ''
}

export default function useProgressiveImage({
  delay = 0,
  placeholderSrc = '',
  src
}) {
  const placeholder = {
    ...defaultPlaceholder,
    src: placeholderSrc
  }
  const [loading, setLoading] = useState(true)
  const [img, setImg] = useState(placeholder)
  const [error, setError] = useState(null)

  function fetchImage() {
    const { Image } = window
    const img = new Image()
    img.onload = () => {
      setTimeout(() => {
        setImg(img)
        setLoading(false)
      }, delay)
    }
    img.onerror = (error) => {
      setError(error)
      setLoading(false)
    }
    setLoading(true)
    setError(null)
    img.src = src
  }

  useEffect(function onNewImage() {
    if (src) {
      fetchImage()
    }
  }, [src])

  return { img, error, loading }
}
