import { useEffect, useState } from 'react'

const PLACEHOLDER_URL = 'https://static.zooniverse.org/www.zooniverse.org/assets/fe-project-subject-placeholder-800x600.png'  // Use this instead of https://www.zooniverse.org/assets/fe-project-subject-placeholder-800x600.png to save on network calls

export const placeholder = {
  naturalHeight: 600,
  naturalWidth: 800,
  src: PLACEHOLDER_URL
}

export default function useSubjectImage(ImageObject = window.Image, url) {
  const [img, setImg] = useState(placeholder)
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
      setImg(placeholder)
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
