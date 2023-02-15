import { observer } from 'mobx-react'
import { forwardRef } from 'react'

import { useTranscriptionReductions } from '@hooks'
import TranscribedLines from './TranscribedLines'

function withTranscriptionReductions(Component) {

  function WithTranscriptionReductions({ props }, ref) {
    const transcriptionProps = useTranscriptionReductions()
    return <Component ref={ref} {...transcriptionProps} {...props} />
  }
  return observer(forwardRef(WithTranscriptionReductions))
}

export default withTranscriptionReductions(TranscribedLines)
