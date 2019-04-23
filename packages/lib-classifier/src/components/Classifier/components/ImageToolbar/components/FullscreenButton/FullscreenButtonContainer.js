import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import FullscreenButton from './FullscreenButton'

function storeMapper (stores) {
  const {
    fullscreen,
    enableFullscreen,
    disableFullscreen
  } = stores.classifierStore.subjectViewer

  return {
    fullscreen,
    enableFullscreen,
    disableFullscreen
  }
}

@inject(storeMapper)
@observer
class FullscreenButtonContainer extends React.Component {
  constructor () {
    super()
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    const { disableFullscreen, enableFullscreen, fullscreen } = this.props
    return fullscreen ? disableFullscreen() : enableFullscreen()
  }

  render () {
    const { disabled, fullscreen } = this.props
    if (disabled) {
      return null
    }
    return (
      <FullscreenButton
        active={fullscreen}
        onClick={this.onClick}
      />
    )
  }
}

FullscreenButtonContainer.wrappedComponent.propTypes = {
  disabled: PropTypes.bool,
  disableFullscreen: PropTypes.func,
  enableFullscreen: PropTypes.func,
  fullscreen: PropTypes.bool
}

FullscreenButtonContainer.wrappedComponent.defaultProps = {
  disabled: false,
  fullscreen: false
}

export default FullscreenButtonContainer
