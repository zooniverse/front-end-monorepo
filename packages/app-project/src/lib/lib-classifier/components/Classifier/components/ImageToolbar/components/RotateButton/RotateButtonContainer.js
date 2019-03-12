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
    const { rotate } = this.props
    return (
      <RotateButton onClick={rotate} />
    )
  }
}

RotateButtonContainer.wrappedComponent.propTypes = {
  rotate: PropTypes.func
}

RotateButtonContainer.wrappedComponent.defaultProps = {
  rotate: () => console.log('rotate view')
}

export default RotateButtonContainer
