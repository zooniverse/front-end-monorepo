import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import ZoomOutButton from './ZoomOutButton'

function storeMapper (stores) {
  const {
    zoomOut
  } = stores.classifierStore.classifier

  return {
    zoomOut
  }
}

@inject(storeMapper)
@observer
class ZoomOutButtonContainer extends React.Component {
  constructor () {
    super()
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    this.props.zoomOut()
  }

  render () {
    return (
      <ZoomOutButton onClick={this.onClick} />
    )
  }
}

ZoomOutButtonContainer.propTypes = {
  zoomOut: PropTypes.func
}

ZoomOutButtonContainer.defaultProps = {
  zoomOut: () => console.log('zoom out')
}

export default ZoomOutButtonContainer
