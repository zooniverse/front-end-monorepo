import { useEffect, useState } from 'react'

export default function useSubjectImage(ImageObject = window.Image, url) {
  const [img, setImg] = useState({})
  const [error, setError] = useState()

  function fetchImage() {
    return new Promise((resolve, reject) => {
      const img = new ImageObject()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = url
      return img
    })
  }

  async function onLoad() {
    try {
      const img = await fetchImage()
      setImg(img)
    } catch (error) {
      setError(error)
    }
  }

  useEffect(function onNewSubject() {
    if (url) {
      onLoad()
    }
  }, [url])

  return { img, error }
}
