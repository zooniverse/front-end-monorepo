import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import ZoomInButton from './ZoomInButton'

function storeMapper (stores) {
  const {
    zoomIn
  } = stores.classifierStore.subjectViewer

  return {
    zoomIn
  }
}

@inject(storeMapper)
@observer
class ZoomInButtonContainer extends React.Component {
  constructor () {
    super()
    this.onPointerDown = this.onPointerDown.bind(this)
    this.onPointerUp = this.onPointerUp.bind(this)
    this.timer = ''
  }

  onPointerDown (event) {
    const { zoomIn } = this.props
    const { currentTarget, pointerId } = event
    zoomIn()
    clearInterval(this.timer)
    this.timer = setInterval(zoomIn, 100)
    currentTarget.setPointerCapture(pointerId)
  }

  onPointerUp (event) {
    const { currentTarget, pointerId } = event
    clearInterval(this.timer)
    currentTarget.releasePointerCapture(pointerId)
  }

  render () {
    const { zoomIn } = this.props
    return (
      <span
        onPointerDown={this.onPointerDown}
        onPointerUp={this.onPointerUp}
      >
        <ZoomInButton onClick={zoomIn} />
      </span>
    )
  }
}

ZoomInButtonContainer.wrappedComponent.propTypes = {
  zoomIn: PropTypes.func
}

ZoomInButtonContainer.wrappedComponent.defaultProps = {
  zoomIn: () => console.log('zoom in')
}

export default ZoomInButtonContainer
