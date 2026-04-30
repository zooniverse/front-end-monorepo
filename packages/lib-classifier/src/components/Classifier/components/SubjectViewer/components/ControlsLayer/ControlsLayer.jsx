import PropTypes from 'prop-types'

import LineControls from '@plugins/drawingTools/experimental/components/LineControls'

function ControlsLayer ({
  enableInteractionLayer,
  frame = 0
}) {
  return (
    enableInteractionLayer && <LineControls frame={frame} />
  )
}

ControlsLayer.propTypes = {
  frame: PropTypes.number,
  enableInteractionLayer: PropTypes.bool
}

export default ControlsLayer
