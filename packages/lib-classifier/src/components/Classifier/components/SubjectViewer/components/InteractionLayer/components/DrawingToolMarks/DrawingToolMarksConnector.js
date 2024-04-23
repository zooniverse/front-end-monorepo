import { observer } from 'mobx-react'
import { forwardRef } from 'react'
import { useMachineLearntReductions } from '@hooks'
import DrawingToolMarks from './DrawingToolMarks'

function withMachineLearntReductions(Component) {
  function WithMachineLearntReductions(props, ref) {
    const taskProps = useMachineLearntReductions()
    return <Component ref={ref} {...props} {...taskProps} />
  }
  return observer(forwardRef(WithMachineLearntReductions))
}

export default withMachineLearntReductions(DrawingToolMarks)
