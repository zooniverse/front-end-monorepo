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
    this.onPointerDown = this.onPointerDown.bind(this)
    this.onPointerUp = this.onPointerUp.bind(this)
    this.timer = ''
  }

  onPointerDown (event) {
    const { zoomOut } = this.props
    this.timer = setInterval(zoomOut, 100)
  }

  onPointerUp (event) {
    clearInterval(this.timer)
  }

  render () {
    return (
      <span
        touch-action='none'
        onPointerDown={this.onPointerDown}
        onPointerUp={this.onPointerUp}
      >
        <ZoomOutButton onClick={this.onPointerUp} />
      </span>
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
