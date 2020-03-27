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
    const { currentTarget, pointerId } = event
    zoomOut()
    clearInterval(this.timer)
    this.timer = setInterval(zoomOut, 100)
    currentTarget.setPointerCapture(pointerId)
  }

  onPointerUp (event) {
    const { currentTarget, pointerId } = event
    clearInterval(this.timer)
    currentTarget.releasePointerCapture(pointerId)
  }

  render () {
    return (
      <span
        touch-action='none'
        onPointerDown={this.onPointerDown}
        onPointerUp={this.onPointerUp}
      >
        <ZoomOutButton onClick={() => true} />
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
