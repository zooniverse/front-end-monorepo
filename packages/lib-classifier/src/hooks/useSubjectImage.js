import { useEffect, useRef } from 'react'
import { useProgressiveImage } from '@zooniverse/react-components'

// Use this instead of https://www.zooniverse.org/assets/fe-project-subject-placeholder-800x600.png to save on network calls
export const PLACEHOLDER_URL = 'https://static.zooniverse.org/www.zooniverse.org/assets/fe-project-subject-placeholder-800x600.png'

export default function useSubjectImage({ src, onReady, onError }) {
  const subjectImage = useRef()

  const { img, error, loading } = useProgressiveImage({
    placeholderSrc: PLACEHOLDER_URL,
    src
  })
  

  useEffect(function onImageLoad() {
    const { naturalHeight, naturalWidth, src } = img
    if (src !== PLACEHOLDER_URL ) {
      const svgImage = subjectImage.current
      const { width: clientWidth, height: clientHeight } = svgImage
        ? svgImage.getBoundingClientRect()
        : {}
      const target = { clientHeight, clientWidth, naturalHeight, naturalWidth }
      onReady({ target })
    }
  }, [img, onReady, subjectImage])

  useEffect(function logError() {
    if (!loading && error) {
      console.error(error)
      onError(error)
    }
  }, [error, loading, onError])

  return { img, error, loading, subjectImage }
}
