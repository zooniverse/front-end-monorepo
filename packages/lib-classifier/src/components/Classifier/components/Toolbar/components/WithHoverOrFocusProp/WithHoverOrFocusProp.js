import React from 'react'

function WithHoverOrFocusProp (WrappedComponent) {
  return class extends React.Component {
    constructor () {
      super()
      this.setFocusActive = this.setFocusActive.bind(this)
      this.setFocusInactive = this.setFocusInactive.bind(this)
      this.setHoverActive = this.setHoverActive.bind(this)
      this.setHoverInactive = this.setHoverInactive.bind(this)
      this.state = {
        focus: false,
        hover: false
      }
    }

    setFocusActive () {
      this.setState({ focus: true })
    }

    setFocusInactive () {
      this.setState({ focus: false })
    }

    setHoverActive () {
      this.setState({ hover: true })
    }

    setHoverInactive () {
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
