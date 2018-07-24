import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import MoveButton from './MoveButton'

function storeMapper (stores) {
  const {
    move,
    enableMove,
  } = stores.classifierStore.classifier

  return {
    move,
    enableMove,
  }
}

@inject(storeMapper)
@observer
class MoveButtonContainer extends React.Component {
  render () {
    const { enableMove, move } = this.props
    return (
      <MoveButton
        active={move}
        onClick={enableMove}
      />
    )
  }
}

MoveButtonContainer.propTypes = {
  enableMove: PropTypes.func,
  move: PropTypes.bool
}

MoveButtonContainer.defaultProps = {
  enableMove: () => console.log('toggle move'),
  move: false
}

export default MoveButtonContainer
