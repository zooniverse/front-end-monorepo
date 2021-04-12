import { MobXProviderContext, observer } from 'mobx-react'
import React, { useContext } from 'react'

import NextButton from './NextButton'

function withStores(Component) {
  function NextButtonConnector(props) {
    const {
      classifierStore: {
        annotatedSteps: {
          hasNextStep,
          next
        }
      }
    } = props.store || useContext(MobXProviderContext)

    if (!hasNextStep) {
      return null
    }

    return (
      <Component
        onClick={next}
        {...props}
      />
    )
  }
  return observer(NextButtonConnector)
}

export default withStores(NextButton)
