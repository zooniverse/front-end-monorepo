import { inject } from 'mobx-react'
import React, { Component, forwardRef } from 'react'

function storeMapper (stores) {
  const {
    panLeft,
    panRight,
    panUp,
    panDown,
    zoomIn,
    zoomOut
  } = stores.classifierStore.subjectViewer

  return {
    panLeft,
    panRight,
    panUp,
    panDown,
    zoomIn,
    zoomOut
  }
}

function withKeyZoom (WrappedComponent) {
  const ALLOWED_TAGS = ['svg', 'button', 'rect']

  @inject(storeMapper)
  class KeyZoom extends Component {
    constructor () {
      super()
      this.onKeyDown = this.onKeyDown.bind(this)
    }

    onKeyDown (e) {
      const {
        panLeft,
        panRight,
        panUp,
        panDown,
        zoomIn,
        zoomOut
      } = this.props
      const htmlTag = e.target?.tagName.toLowerCase()
      if (ALLOWED_TAGS.includes(htmlTag)) {
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
            e.preventDefault()
            panRight()
            return false
          }
          case 'ArrowLeft': {
            e.preventDefault()
            panLeft()
            return false
          }
          case 'ArrowUp': {
            e.preventDefault()
            panUp()
            return false
          }
          case 'ArrowDown': {
            e.preventDefault()
            panDown()
            return false
          }
          default: {
            return true
          }
        }
      }

      return true
    }

    render () {
      const {
        forwardedRef,
        panLeft,
        panRight,
        panUp,
        panDown,
        zoomIn,
        zoomOut,
        ...props
      } = this.props
      return (
        <WrappedComponent
          ref={forwardedRef}
          onKeyDown={this.onKeyDown}
          {...props}
        />
      )
    }
  }

  KeyZoom.defaultProps = {
    forwardedRef: null,
    panLeft: () => true,
    panRight: () => true,
    panUp: () => true,
    panDown: () => true,
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
