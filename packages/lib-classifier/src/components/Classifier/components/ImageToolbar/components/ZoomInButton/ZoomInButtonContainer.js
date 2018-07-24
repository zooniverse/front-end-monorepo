import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import ZoomInButton from './ZoomInButton'

function storeMapper (stores) {
  const {
    zoomIn,
  } = stores.classifierStore.classifier

  return {
    zoomIn,
  }
}

@inject(storeMapper)
@observer
class ZoomInButtonContainer extends React.Component {
  render () {
    const { zoomIn } = this.props
    return (
      <ZoomInButton onClick={zoomIn} />
    )
  }
}

ZoomInButtonContainer.propTypes = {
  zoomIn: PropTypes.func,
}

ZoomInButtonContainer.defaultProps = {
  zoomIn: () => console.log('zoom in'),
}

export default ZoomInButtonContainer
