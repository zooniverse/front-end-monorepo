import PropTypes from 'prop-types'
import React, { Component } from 'react'
import * as d3 from 'd3'
import theme from '@zooniverse/grommet-theme'
import styled from 'styled-components'

import addBackgroundLayer from './d3/addBackgroundLayer'
import createBar from './d3/createBar'
import createLabel from './d3/createLabel'

const SVG = styled.svg`
  display: block;
`

class CompletionBar extends Component {
  constructor () {
    super()
    this.svgRef = React.createRef()
    this.d3svg = null
  }

  componentDidMount () {
    this.initChart()
    this.drawChart()
  }

  initChart () {
    this.d3svg = d3.select(this.svgRef.current)

    this.d3svg
      .selectAll('.bar')
      .data([this.props.completeness])
      .enter()
      .append('g')
      .attr('class', 'bar')
      .call(createBar, theme.global.colors.teal)
      .call(createLabel, theme.global.colors.teal)
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
        const node = d3.select(this)
        const interpolator = d3.interpolate(0, d)
        return t => {
          const value = interpolator(t)
          const percent = d3.format('.0%')(value)
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
      <SVG ref={this.svgRef} height='40px' width='100%'>
        <rect height='100%' width='100%' fill={theme.global.colors.lightTeal} />
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
