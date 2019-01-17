import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const FOCUSABLES = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[contenteditable]'

const TAB_KEY = 9

export default function withModalFocus (WrappedComponent) {
  return class WithModalFocus extends Component {
    constructor() {
      super()
      this.previousActiveElement = document.activeElement
      this.handleKeyDown = this.handleKeyDown.bind(this)
    }

    componentWillUnmount() {
      this.props.preserveFocus &&
        !!this.previousActiveElement &&
        this.previousActiveElement.focus()
    }

    handleKeyDown(e) {
      const { shiftKey, target } = e
      const focusables = ReactDOM.findDOMNode(this).querySelectorAll(FOCUSABLES)

      if (e.keyCode !== TAB_KEY) {
        return null
      }

      if (shiftKey && target === focusables[0]) {
        focusables[focusables.length - 1].focus()
        e.preventDefault()
      } else if (!shiftKey && target === focusables[focusables.length - 1]) {
        focusables[0].focus()
        e.preventDefault()
      }
    }

    render() {
      const { preserveFocus, ...wrappedProps } = this.props
      return <WrappedComponent {...wrappedProps} />
    }
  }

  WithModalFocus.propTypes = {
    preserveFocus: PropTypes.bool
  }

  WithModalFocus.defaultProps = {
    preserveFocus: true
  }
}
