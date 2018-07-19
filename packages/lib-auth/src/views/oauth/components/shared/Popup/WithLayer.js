import React from 'react'
import { Layer } from 'grommet'

function WithLayer (WrappedComponent) {
  return function HOC (props) {
    return (
      <Layer
        onClickOutside={props.closeFn}
        onEsc={props.closeFn}
      >
        <WrappedComponent {...props} />
      </Layer>
    )
  }
}

export default WithLayer
