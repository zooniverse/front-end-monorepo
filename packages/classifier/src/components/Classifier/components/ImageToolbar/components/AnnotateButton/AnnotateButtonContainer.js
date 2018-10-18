import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import AnnotateButton from './AnnotateButton'

function storeMapper (stores) {
  const {
    annotate,
    enableAnnotate
  } = stores.classifierStore.subjectViewer

  return {
    annotate,
    enableAnnotate
  }
}

@inject(storeMapper)
@observer
class AnnotateButtonContainer extends React.Component {
  render () {
    const { annotate, enableAnnotate } = this.props
    return (
      <AnnotateButton active={annotate} onClick={enableAnnotate} />
    )
  }
}

AnnotateButtonContainer.propTypes = {
  annotate: PropTypes.bool,
  enableAnnotate: PropTypes.func
}

AnnotateButtonContainer.defaultProps = {
  annotate: false,
  enableAnnotate: () => console.log('Enable annotate')
}

export default AnnotateButtonContainer
