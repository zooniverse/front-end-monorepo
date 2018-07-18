import { filter } from 'rxjs/operators'

function pointTool (stream, classification) {
  // Clicks
  const clicks = stream.pipe(
    filter(val => val.event === 'mouseDown'),
  )

  // New points
  const newPoints = clicks.pipe(
    filter(val => val.target.getAttribute('name') === 'interactionLayer'),
  )

  newPoints.subscribe(({ x, y }) => {
    classification.active.setValue({ x, y, type: 'point' })
  })
}

export default pointTool
