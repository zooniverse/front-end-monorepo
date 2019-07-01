import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import ResetButton from './ResetButton'

function storeMapper (stores) {
  const {
    resetView
  } = stores.classifierStore.subjectViewer

  return {
    resetView
  }
}

@inject(storeMapper)
@observer
class ResetButtonContainer extends React.Component {
  render () {
    const { disabled, resetView } = this.props
    return (
      <ResetButton disabled={disabled} onClick={resetView} />
    )
  }
}

ResetButtonContainer.wrappedComponent.propTypes = {
  disabled: PropTypes.bool,
  resetView: PropTypes.func
}

ResetButtonContainer.wrappedComponent.defaultProps = {
  disabled: false,
  resetView: () => console.log('reset view')
}

export default ResetButtonContainer
