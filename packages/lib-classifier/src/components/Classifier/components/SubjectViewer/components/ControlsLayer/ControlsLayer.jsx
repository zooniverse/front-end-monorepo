import PropTypes from 'prop-types'

import LineControls from '@plugins/drawingTools/experimental/components/LineControls'

function ControlsLayer({ enableInteractionLayer }) {
  return (enableInteractionLayer && <LineControls />)
}

ControlsLayer.propTypes = {
  enableInteractionLayer: PropTypes.bool
}

export default ControlsLayer