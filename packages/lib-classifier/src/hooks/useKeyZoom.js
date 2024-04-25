import { useStores } from '@hooks'

const ALLOWED_TAGS = ['svg', 'button', 'g', 'rect']

function storeMapper(classifierStore) {
  const {
    subjectViewer: {
      panLeft,
      panRight,
      panUp,
      panDown,
      zoomIn,
      zoomOut
    }
  } = classifierStore
    
  return {
    panLeft,
    panRight,
    panUp,
    panDown,
    zoomIn,
    zoomOut
  }
}

export default function useKeyZoom() {
  const {
    panLeft,
    panRight,
    panUp,
    panDown,
    zoomIn,
    zoomOut
  } = useStores(storeMapper)

  function onKeyZoom(event) {
      const htmlTag = event.target?.tagName.toLowerCase()
      if (ALLOWED_TAGS.includes(htmlTag)) {
        switch (event.key) {
          case '+':
          case '=': {
            zoomIn()
            return true
          }
          case '-':
          case '_': {
            zoomOut()
            return true
          }
          case 'ArrowRight': {
            event.preventDefault()
            panRight()
            return false
          }
          case 'ArrowLeft': {
            event.preventDefault()
            panLeft()
            return false
          }
          case 'ArrowUp': {
            event.preventDefault()
            panUp()
            return false
          }
          case 'ArrowDown': {
            event.preventDefault()
            panDown()
            return false
          }
          default: {
            return true
          }
        }
      }

      return true
    }
    
    return { onKeyZoom }
}
