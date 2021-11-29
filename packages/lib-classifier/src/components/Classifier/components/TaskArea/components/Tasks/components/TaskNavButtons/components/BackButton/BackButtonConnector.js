import { MobXProviderContext, observer } from 'mobx-react'
import React, { useContext } from 'react'

import BackButton from './BackButton'

function withStores(Component) {
  function BackButtonConnector(props) {
    const {
      classifierStore: {
        subjects: {
          active: subject
        },
        workflows: {
          active: {
            configuration: {
              persist_annotations: persistAnnotations
            }
          }
        }
      }
    } = props.store || useContext(MobXProviderContext)

    const { back, canUndo } = subject?.stepHistory || { back: () => {}, canUndo: false }

    if (!canUndo) {
      return null
    }

    function onClick() {
      back(persistAnnotations)
    }

    return (
      <Component
        onClick={onClick}
        persistAnnotations={persistAnnotations}
        {...props}
      />
    )
  }
  return observer(BackButtonConnector)
}

export default withStores(BackButton)
