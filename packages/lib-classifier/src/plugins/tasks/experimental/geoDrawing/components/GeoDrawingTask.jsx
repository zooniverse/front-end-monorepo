import { arrayOf, oneOfType, number, shape, string } from 'prop-types'
import { observer } from 'mobx-react'

function GeoDrawingTask({ task }) {
  const instruction = task?.instruction || ''
  const toolLabel = task?.tools?.[0]?.label || 'Map Point'

  return (
    <div>
      {instruction ? <p>{instruction}</p> : null}
      <p>{toolLabel}: geoPoint tool placeholder</p>
    </div>
  )
}

GeoDrawingTask.propTypes = {
  task: shape({
    instruction: string,
    tools: arrayOf(shape({
      label: string,
      max: oneOfType([string, number]),
      min: oneOfType([string, number]),
      type: string
    }))
  })
}

export default observer(GeoDrawingTask)
