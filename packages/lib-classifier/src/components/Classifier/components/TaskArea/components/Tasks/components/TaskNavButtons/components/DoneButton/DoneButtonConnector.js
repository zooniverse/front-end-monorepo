import { MobXProviderContext, observer } from 'mobx-react'
import React, { useContext } from 'react'

import DoneButton from './DoneButton'

function withStores(Component) {
  function DoneButtonConnector(props) {
    const {
      classifierStore: {
        annotatedSteps: {
          finish,
          hasNextStep
        },
        classifications: {
          completeClassification
        }
      }
    } = props.store || useContext(MobXProviderContext)

    if (hasNextStep) {
      return null
    }

    function onClick(event) {
      event.preventDefault()
      finish()
      return completeClassification()
    }

    return (
      <Component
        hasNextStep={hasNextStep}
        onClick={onClick}
        {...props}
      />
    )
  }
  return observer(DoneButtonConnector)
}

export default withStores(DoneButton)
