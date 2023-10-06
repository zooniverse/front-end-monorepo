import { useEffect, useRef } from 'react'
import { useProgressiveImage } from '@zooniverse/react-components/hooks'

export default function useSubjectImage({ src, onReady, onError }) {
  const subjectImage = useRef()

  const { img, error, loading } = useProgressiveImage({
    placeholderSrc: '',
    src
  })
  

  useEffect(function onImageLoad() {
    const { naturalHeight, naturalWidth, src } = img
    if (src !== '' ) {
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
