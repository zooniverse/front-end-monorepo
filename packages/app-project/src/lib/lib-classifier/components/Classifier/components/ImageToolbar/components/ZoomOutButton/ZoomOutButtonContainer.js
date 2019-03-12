import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import ZoomOutButton from './ZoomOutButton'

function storeMapper (stores) {
  const {
    zoomOut
  } = stores.classifierStore.subjectViewer

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

ZoomOutButtonContainer.wrappedComponent.propTypes = {
  zoomOut: PropTypes.func
}

ZoomOutButtonContainer.wrappedComponent.defaultProps = {
  zoomOut: () => console.log('zoom out')
}

export default ZoomOutButtonContainer
