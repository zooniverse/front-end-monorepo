import React, { PureComponent, forwardRef} from 'react'
import { withParentSize } from '@vx/responsive'
import VXZoom from './VXZoom'

function withVXZoom (WrappedComponent) {
  const DecoratedVXZoom = forwardRef(function (props, ref) {
    return <VXZoom {...props} forwardedRef={ref} wrappedComponent={WrappedComponent} />
  })
  const name = WrappedComponent.displayName || WrappedComponent.name
  DecoratedVXZoom.displayName = `withVXZoom(${name})`
  DecoratedVXZoom.wrappedComponent = WrappedComponent

  return withParentSize(DecoratedVXZoom)
}

export default withVXZoom