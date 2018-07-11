import counterpart from 'counterpart'
import { inject, observer } from 'mobx-react'
import React from 'react'

import moveIcon from './moveIcon'
import en from './locales/en'
import Button from '../Button'

counterpart.registerTranslations('en', en)

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
class MoveButton extends React.Component {
  render () {
    const { move, enableMove } = this.props
    return (
      <Button
        active={move}
        aria-label={counterpart('MoveButton.ariaLabel')}
        onClick={enableMove}
      >
        {moveIcon}
      </Button>
    )
  }
}

export default MoveButton
