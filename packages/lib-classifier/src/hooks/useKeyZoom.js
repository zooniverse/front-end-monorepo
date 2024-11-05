import { usePanZoom } from '@plugins/drawingTools/shared/PanZoomContext'

const ALLOWED_TAGS = ['svg', 'button', 'g', 'rect']

export default function useKeyZoom(rotate=0) {
  const {
    panLeft,
    panRight,
    panUp,
    panDown,
    zoomIn,
    zoomOut
  } = usePanZoom()
  const rotation = Math.abs(rotate) % 360
  const keyMappings = {
    '+': zoomIn,
    '=': zoomIn,
    '-': zoomOut,
    '_': zoomOut
  }
  
  if (rotation === 0) {
    keyMappings['ArrowRight'] = panRight
    keyMappings['ArrowLeft'] = panLeft
    keyMappings['ArrowUp'] = panUp
    keyMappings['ArrowDown'] = panDown
  }
  if (rotation === 90) {
    keyMappings['ArrowRight'] = panDown
    keyMappings['ArrowLeft'] = panUp
    keyMappings['ArrowUp'] = panRight
    keyMappings['ArrowDown'] = panLeft
  }
  if (rotation === 180) {
    keyMappings['ArrowRight'] = panLeft
    keyMappings['ArrowLeft'] = panRight
    keyMappings['ArrowUp'] = panDown
    keyMappings['ArrowDown'] = panUp
  }
  if (rotation === 270) {
    keyMappings['ArrowRight'] = panUp
    keyMappings['ArrowLeft'] = panDown
    keyMappings['ArrowUp'] = panLeft
    keyMappings['ArrowDown'] = panRight
  }

  function onKeyZoom(event) {
    const htmlTag = event.target?.tagName.toLowerCase()
    const handler = keyMappings[event.key]
    if (ALLOWED_TAGS.includes(htmlTag) && handler) {
      event.preventDefault()
      handler()
      return false
    }

    return true
  }
    
    return { onKeyZoom }
}
