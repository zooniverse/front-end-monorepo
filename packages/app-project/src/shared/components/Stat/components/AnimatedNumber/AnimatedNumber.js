import * as d3 from 'd3'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class AnimatedNumber extends Component {
  constructor () {
    super()
    this.ref = React.createRef()
  }

  componentDidMount () {
    this.animateValue(0)
  }

  componentDidUpdate (prevProps) {
    this.animateValue(prevProps.value)
  }

  animateValue (prevValue) {
    const self = this
    d3.select(this.ref.current)
      .data([this.props.value])
      .transition()
      .duration(this.props.duration)
      .tween('text', function (d) {
        const node = d3.select(this)
        const interpolator = d3.interpolate(prevValue, d)
        return t => {
          const value = interpolator(t)
          const niceValue = self.formatValue(value)
          node.text(niceValue)
        }
      })
  }

  formatValue (value) {
    return d3.format(',d')(value)
  }

  render () {
    return (
      <>
        <span ref={this.ref}>
          {this.formatValue(this.props.value)}
        </span>
      </>
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
