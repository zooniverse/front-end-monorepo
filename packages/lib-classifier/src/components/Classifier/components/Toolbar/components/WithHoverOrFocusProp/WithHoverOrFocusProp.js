import React from 'react'
import PropTypes from 'prop-types'

function WithHoverOrFocusProp (WrappedComponent) {
  return class extends React.Component {
    state = {
      focus: false,
      hover: false
    }

    setFocusActive = () => {
      this.setState({ focus: true })
    }

    setFocusInactive = () => {
      this.setState({ focus: false })
    }

    setHoverActive = () => {
      this.setState({ hover: true })
    }

    setHoverInactive = () => {
      this.setState({ hover: false })
    }

    render () {
      const eventHandlers = {
        onMouseEnter: this.setHoverActive,
        onMouseLeave: this.setHoverInactive,
        onFocus: this.setFocusActive,
        onBlur: this.setFocusInactive
      }

      return (
        <WrappedComponent
          {...this.props}
          eventHandlers={eventHandlers}
          hoverOrFocus={this.state.hover || this.state.focus || false}
          isFocused={this.state.focus}
          isHovering={this.state.hover}
        />
      )
    }
  }
}

export default WithHoverOrFocusProp
