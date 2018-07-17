import counterpart from 'counterpart'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import actualSizeIcon from './actualSizeIcon'
import fullscreenIcon from './fullscreenIcon'
import en from './locales/en'
import Button from '../Button'

counterpart.registerTranslations('en', en)

function storeMapper (stores) {
  const {
    fullscreen,
    enableFullscreen,
    disableFullscreen
  } = stores.classifierStore.classifier

  return {
    fullscreen,
    enableFullscreen,
    disableFullscreen
  }
}

@inject(storeMapper)
@observer
class FullscreenButton extends React.Component {
  constructor () {
    super()
    this.getOnClick = this.getOnClick.bind(this)
  }

  getIcon (fullscreen) {
    return fullscreen ? actualSizeIcon : fullscreenIcon
  }

  getLabel () {
    const labelKey = this.props.fullscreen ? 'actualSize' : 'fullscreen'
    return counterpart(`FullscreenButton.ariaLabel.${labelKey}`)
  }

  getOnClick (fullscreen) {
    const { disableFullscreen, enableFullscreen } = this.props
    return fullscreen ? disableFullscreen : enableFullscreen
  }

  render () {
    const { fullscreen } = this.props

    return (
      <Button
        active={fullscreen}
        aria-label={this.getLabel(fullscreen)}
        onClick={this.getOnClick(fullscreen)}
      >
        {this.getIcon(fullscreen)}
      </Button>
    )
  }
}

FullscreenButton.propTypes = {
  fullscreen: PropTypes.bool,
  disableFullscreen: PropTypes.func,
  enableFullscreen: PropTypes.func
}

FullscreenButton.defaultProps = {
  fullscreen: false
}

export default FullscreenButton
