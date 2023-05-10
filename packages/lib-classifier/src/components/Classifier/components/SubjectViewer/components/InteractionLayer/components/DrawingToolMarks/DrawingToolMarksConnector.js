import { observer } from 'mobx-react'
import { forwardRef } from 'react'
import { useFreehandLineReductions } from '@hooks'
import DrawingToolMarks from './DrawingToolMarks'

function withFreehandLineReductions(Component) {
  function WithFreehandLineReductions(props, ref) {
    const freehandLineProps = useFreehandLineReductions()
    return <Component ref={ref} {...props} {...freehandLineProps} />
  }
  return observer(forwardRef(WithFreehandLineReductions))
}

export default withFreehandLineReductions(DrawingToolMarks)
