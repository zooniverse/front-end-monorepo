import { MobXProviderContext } from 'mobx-react'
import { Component, forwardRef } from 'react';

import { useKeyZoom } from '@hooks'

const DEFAULT_HANDLER = () => true

function withKeyZoom (WrappedComponent) {

  function KeyZoom(props, ref) {
    const { onKeyZoom } = useKeyZoom()
    return (
      <WrappedComponent
        ref={ref}
        onKeyDown={onKeyZoom}
        {...props}
      />
    )
  }

  const DecoratedKeyZoom = forwardRef(KeyZoom)
  const name = WrappedComponent.displayName || WrappedComponent.name
  DecoratedKeyZoom.displayName = `withKeyZoom(${name})`
  DecoratedKeyZoom.wrappedComponent = WrappedComponent

  return DecoratedKeyZoom
}

export default withKeyZoom
