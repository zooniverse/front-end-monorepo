import { withStores } from '@helpers'
import React from 'react'

import InvertButton from './InvertButton'

function storeMapper(classifierStore) {
  const {
    subjectViewer: {
      invertView
    },
    workflows: {
      active: workflow
    }
  } = classifierStore

  const disabled = !workflow?.configuration?.invert_subject
  return {
    disabled,
    onClick: invertView
  }
}

function InvertButtonContainer ({
  disabled = false,
  onClick = () => console.log('invert view')
}) {
  if (disabled) {
    return null
  }
  return (
    <InvertButton onClick={onClick} />
  )
}

export default withStores(InvertButtonContainer, storeMapper)
