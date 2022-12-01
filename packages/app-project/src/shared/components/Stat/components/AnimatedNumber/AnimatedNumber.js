import { select, interpolate, format } from 'd3'
import PropTypes from 'prop-types'
import { createRef, Component } from 'react';

class AnimatedNumber extends Component {
  constructor () {
    super()
    this.ref = createRef()
  }

  componentDidMount () {
    this.animateValue(0)
  }

  componentDidUpdate (prevProps) {
    this.animateValue(prevProps.value)
  }

  animateValue (prevValue) {
    const self = this
    select(this.ref.current)
      .data([this.props.value])
      .transition()
      .duration(this.props.duration)
      .tween('text', function (d) {
        const node = select(this)
        const interpolator = interpolate(prevValue, d)
        return t => {
          const value = interpolator(t)
          const niceValue = self.formatValue(value)
          node.text(niceValue)
        }
      })
  }

  formatValue (value) {
    return format(',d')(value)
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
