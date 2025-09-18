import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import { useStores } from '@hooks'
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
  // fullscreen is not functional, once it is, the `show` prop should default to true
  show = false
}) {
  const { fullscreen, enableFullscreen, disableFullscreen } = useStores(storeMapper)

  function onClick() {
    return fullscreen ? disableFullscreen() : enableFullscreen()
  }

  if (!show) {
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
  show: PropTypes.bool
}

export default observer(FullscreenButtonContainer)
