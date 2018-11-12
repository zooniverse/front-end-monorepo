import * as d3 from 'd3'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class AnimatedNumber extends Component {
  constructor () {
    super()
    this.ref = React.createRef()
  }

  componentDidMount () {
    this.animateValue()
  }

  animateValue () {
    d3.select(this.ref.current)
      .data([this.props.value])
      .transition()
      .duration(this.props.duration)
      .tween('text', (d, i, elements) => {
        // `this` _should_ be bound to the element, but in React is already
        // bound to the component instance, so we define it here as `node`.
        const node = d3.select(elements[i])
        const interpolator = d3.interpolate(0, d)
        return t => {
          const value = interpolator(t)
          const niceValue = d3.format(',d')(value)
          node.text(niceValue)
        }
      })
  }

  render () {
    return (
      <span ref={this.ref}>0</span>
    )
  }
}

AnimatedNumber.propTypes = {
  duration: PropTypes.number,
  value: PropTypes.number.isRequired
}

AnimatedNumber.defaultProps = {
  duration: 1000
}

export default AnimatedNumber
