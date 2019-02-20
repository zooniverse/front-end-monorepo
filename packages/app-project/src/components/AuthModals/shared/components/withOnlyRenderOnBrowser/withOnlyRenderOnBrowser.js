import React, { Component } from 'react'

export default function withOnlyRenderOnBrowser (WrappedComponent) {
  return class extends Component {
    constructor () {
      super()
      this.state = {
        isBrowser: false
      }
    }

    componentDidMount () {
      this.setState({ isBrowser: true })
    }

    render () {
      return (this.state.isBrowser)
        ? <WrappedComponent {...this.props} />
        : null
    }
  }
}
