import { useEffect, useRef } from 'react'
import { useProgressiveImage } from '@zooniverse/react-components/hooks'

export default function useSubjectImage({ src, onReady, onError }) {
  const subjectImage = useRef()

  const { img, error, loading } = useProgressiveImage({
    placeholderSrc: '',
    src,
    onLoad,
    onError
  })
  

  function onLoad(event) {
    const { naturalHeight, naturalWidth, src } = event.target
    if (src !== '' ) {
      const svgImage = subjectImage.current
      const { width: clientWidth, height: clientHeight } = svgImage
        ? svgImage.getBoundingClientRect()
        : {}
      const target = { clientHeight, clientWidth, naturalHeight, naturalWidth }
      onReady({ target })
    }
  }

  return { img, error, loading, subjectImage }
}
