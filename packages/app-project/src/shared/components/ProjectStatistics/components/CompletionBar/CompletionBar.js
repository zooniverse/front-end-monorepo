import theme from '@zooniverse/grommet-theme'
import { select, interpolate, format } from 'd3'
import PropTypes from 'prop-types'
import { createRef, Component } from 'react';
import styled from 'styled-components'

import createBar from './d3/createBar'
import createLabel from './d3/createLabel'

const SVG = styled.svg`
  display: block;
`

class CompletionBar extends Component {
  constructor () {
    super()
    this.svgRef = createRef()
    this.d3svg = null
  }

  componentDidMount () {
    this.initChart()
    this.drawChart()
  }

  initChart () {
    this.d3svg = select(this.svgRef.current)

    this.d3svg
      .selectAll('.bar')
      .data([this.props.completeness])
      .enter()
      .append('g')
      .attr('class', 'bar')
      .call(createBar, theme.global.colors.brand)
      .call(createLabel, theme.global.colors.brand)
  }

  drawChart () {
    const bar = this.d3svg.selectAll('.bar')

    // TODO: see if this looks better when using a scale transform instead of
    // manipulating the width.
    bar.selectAll('rect')
      .transition()
      .duration(1000)
      .attr('width', d => `${d * 100}%`)

    bar.selectAll('text')
      .transition()
      .duration(1000)
      .tween('text', function (d, i, elements) {
        const node = select(this)
        const interpolator = interpolate(0, d)
        return t => {
          const value = interpolator(t)
          const percent = format('.0%')(value)
          node.text(percent)
            .attr('x', percent)
          if (value > 0.5) {
            node.attr('dx', '-12px')
              .attr('text-anchor', 'end')
              .attr('fill', '#fff')
          }
        }
      })
  }

  render () {
    return (
      <SVG
        className={this.props.className}
        height='40px'
        ref={this.svgRef}
        width='100%'
      >
        <rect
          fill={theme.global.colors['accent-1']}
          height='100%'
          width='100%'
        />
      </SVG>
    )
  }
}

CompletionBar.propTypes = {
  completeness: PropTypes.number.isRequired
}

CompletionBar.defaultProps = {
  completeness: 0
}

export default CompletionBar
