import counterpart from 'counterpart'
import { inject, observer } from 'mobx-react'
import React from 'react'

import AnnotateButton from './AnnotateButton'

function storeMapper (stores) {
  const {
    annotate: active,
    enableAnnotate: onClick,
  } = stores.classifierStore.classifier

  return {
    active,
    onClick
  }
}

@inject(storeMapper)
@observer
class AnnotateButtonContainer extends React.Component {
  render () {
    const { active, onClick } = this.props
    return <AnnotateButton active={active} onClick={onClick} />
  }
}

export default AnnotateButtonContainer
