import PropTypes from 'prop-types'

import { withStores } from '@helpers'
import FullscreenButton from './FullscreenButton'

function storeMapper(classifierStore) {
  const {
    fullscreen,
    enableFullscreen,
    disableFullscreen
  } = classifierStore.subjectViewer

  return {
    fullscreen,
    enableFullscreen,
    disableFullscreen
  }
}

function FullscreenButtonContainer({
  disabled = false,
  disableFullscreen,
  enableFullscreen,
  fullscreen = false
}) {

  function onClick() {
    return fullscreen ? disableFullscreen() : enableFullscreen()
  }

  if (disabled) {
    return null
  }

  return (
    <FullscreenButton
      active={fullscreen}
      onClick={onClick}
    />
  )
}

FullscreenButtonContainer.propTypes = {
  disabled: PropTypes.bool,
  disableFullscreen: PropTypes.func,
  enableFullscreen: PropTypes.func,
  fullscreen: PropTypes.bool
}

export default withStores(FullscreenButtonContainer, storeMapper)
