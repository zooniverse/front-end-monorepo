import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import RotateButton from './RotateButton'

function storeMapper (stores) {
  const {
    rotate
  } = stores.classifierStore.subjectViewer

  return {
    rotate
  }
}

@inject(storeMapper)
@observer
class RotateButtonContainer extends React.Component {
  render () {
    const { disabled, rotate } = this.props
    return (
      <RotateButton disabled={disabled} onClick={rotate} />
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
