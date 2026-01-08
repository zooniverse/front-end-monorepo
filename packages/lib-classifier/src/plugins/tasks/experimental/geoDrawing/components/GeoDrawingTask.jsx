import PropTypes from 'prop-types'
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
  task: PropTypes.shape({
    instruction: PropTypes.string,
    tools: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      type: PropTypes.string
    }))
  })
}

GeoDrawingTask.defaultProps = {
  task: undefined
}

export default observer(GeoDrawingTask)
