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
    const { resetView } = this.props
    return (
      <ResetButton onClick={resetView} />
    )
  }
}

ResetButtonContainer.propTypes = {
  resetView: PropTypes.func
}

ResetButtonContainer.defaultProps = {
  resetView: () => console.log('reset view')
}

export default ResetButtonContainer
