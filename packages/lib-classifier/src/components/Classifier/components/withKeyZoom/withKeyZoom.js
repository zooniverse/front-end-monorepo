import { inject } from 'mobx-react'
import { func, shape, string } from 'prop-types'
import React, { Component } from 'react'

function storeMapper (stores) {
  const {
    zoomIn,
    zoomOut
  } = stores.classifierStore.subjectViewer

  return {
    zoomIn,
    zoomOut
  }
}

function withKeyZoom (WrappedComponent) {
  return @inject(storeMapper)
  class extends React.Component {
    constructor () {
      super()
      this.onKeyDown = this.onKeyDown.bind(this)
    }

    onKeyDown (e) {
      const { zoomIn, zoomOut } = this.props
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
          console.log('pan right')
          return true
        }
        case 'ArrowLeft': {
          console.log('pan left')
          return true
        }
        default: {
          return true
        }
      }
    }

    render () {
      const { zoomIn, zoomOut, ...props } = this.props
      return <WrappedComponent onKeyDown={this.onKeyDown} {...props} />
    }
  }
}

export default withKeyZoom
