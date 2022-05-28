import { withStores } from '@helpers'
import React from 'react'

import InvertButton from './InvertButton'

function storeMapper(classifierStore) {
  const {
    subjectViewer: {
      invert,
      invertView
    },
    workflows: {
      active: workflow
    }
  } = classifierStore

  const active = invert
  const disabled = !workflow?.configuration?.invert_subject
  return {
    active,
    disabled,
    onClick: invertView
  }
}

function InvertButtonContainer ({
  active = false,
  disabled = false,
  onClick = () => console.log('invert view')
}) {
  if (disabled) {
    return null
  }
  return (
    <InvertButton
      active={active}
      onClick={onClick}
    />
  )
}

export default withStores(InvertButtonContainer, storeMapper)
