import counterpart from 'counterpart'
import { inject, observer } from 'mobx-react'
import React from 'react'

import pointerIcon from './pointerIcon'
import en from './locales/en'
import Button from '../Button'

counterpart.registerTranslations('en', en)

function storeMapper (stores) {
  const {
    annotate,
    enableAnnotate,
  } = stores.classifierStore.classifier

  return {
    annotate,
    enableAnnotate,
  }
}

@inject(storeMapper)
@observer
class AnnotateButton extends React.Component {
  render () {
    const { annotate, enableAnnotate } = this.props
    return (
      <Button
        active={annotate}
        adjustments={{ x: '1', y: '4' }}
        aria-label={counterpart('AnnotateButton.ariaLabel')}
        onClick={enableAnnotate}
        >
        {pointerIcon}
      </Button>
    )
  }
}

export default AnnotateButton
