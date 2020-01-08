import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import RotateButton from './RotateButton'

function storeMapper (stores) {
  const {
    rotate,
    rotationEnabled
  } = stores.classifierStore.subjectViewer

  const disabled = !rotationEnabled
  return {
    disabled,
    rotate
  }
}

@inject(storeMapper)
@observer
class RotateButtonContainer extends React.Component {
  render () {
    const { disabled, rotate } = this.props
    if (disabled) {
      return null
    }
    return (
      <RotateButton onClick={rotate} />
    )
  }
}

RotateButtonContainer.wrappedComponent.propTypes = {
  disabled: PropTypes.bool,
  rotate: PropTypes.func
}

RotateButtonContainer.wrappedComponent.defaultProps = {
  disabled: false,
  rotate: () => console.log('rotate view')
}

export default RotateButtonContainer
