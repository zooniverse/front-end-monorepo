import { inject } from 'mobx-react'
import { func, shape, string } from 'prop-types'
import React, { Component, forwardRef } from 'react'

function storeMapper (stores) {
  const {
    onPan,
    zoomIn,
    zoomOut
  } = stores.classifierStore.subjectViewer

  return {
    onPan,
    zoomIn,
    zoomOut
  }
}

function withKeyZoom (WrappedComponent) {
  @inject(storeMapper)
  class KeyZoom extends React.Component {
    constructor () {
      super()
      this.onKeyDown = this.onKeyDown.bind(this)
    }

    onKeyDown (e) {
      const { onPan, zoomIn, zoomOut } = this.props
      switch (e.key) {
        case '+':
        case '=': {
          zoomIn()
          return true
        }
        case '-':
        case '_': {
          zoomOut()
          return true
        }
        case 'ArrowRight': {
          onPan(-1, 0)
          return true
        }
        case 'ArrowLeft': {
          onPan(1, 0)
          return true
        }
        default: {
          return true
        }
      }
    }

    render () {
      const { forwardedRef, onPan, zoomIn, zoomOut, ...props } = this.props
      return <WrappedComponent ref={forwardedRef} onKeyDown={this.onKeyDown} {...props} />
    }
  }

  KeyZoom.defaultProps = {
    forwardedRef: null,
    onPan: () => true,
    zoomIn: () => true,
    zoomOut: () => true
  }

  const DecoratedKeyZoom = forwardRef(function (props, ref) {
    return <KeyZoom {...props} forwardedRef={ref} />
  })
  const name = WrappedComponent.displayName || WrappedComponent.name
  DecoratedKeyZoom.displayName = `withKeyZoom(${name})`
  DecoratedKeyZoom.wrappedComponent = WrappedComponent

  return DecoratedKeyZoom
}

export default withKeyZoom
