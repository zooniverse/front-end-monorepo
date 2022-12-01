import PropTypes from 'prop-types'

import { withStores } from '@helpers'
import RotateButton from './RotateButton'

function storeMapper (classifierStore) {
  const {
    rotate,
    rotationEnabled
  } = classifierStore.subjectViewer

  const disabled = !rotationEnabled
  return {
    disabled,
    onClick: rotate
  }
}

function RotateButtonContainer({
  disabled = false,
  onClick = () => console.log('rotate view')
}) {
  if (disabled) {
    return null
  }
  return (
    <RotateButton onClick={onClick} />
  )
}

RotateButtonContainer.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

export default withStores(RotateButtonContainer, storeMapper)
