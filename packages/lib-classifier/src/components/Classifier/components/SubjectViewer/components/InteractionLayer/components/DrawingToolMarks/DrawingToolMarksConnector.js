import { observer } from 'mobx-react'
import { forwardRef } from 'react'
import { useMachineLearntReductions } from '@hooks'
import DrawingToolMarks from './DrawingToolMarks'

function withMachineLearntReductions(Component) {
  function WithMachineLearntReductions(props, ref) {
    const freehandLineProps = useMachineLearntReductions()
    return <Component ref={ref} {...props} {...freehandLineProps} />
  }
  return observer(forwardRef(WithMachineLearntReductions))
}

export default withMachineLearntReductions(DrawingToolMarks)
