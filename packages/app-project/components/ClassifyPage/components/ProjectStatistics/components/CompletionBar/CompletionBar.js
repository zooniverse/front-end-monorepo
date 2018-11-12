import PropTypes from 'prop-types'
import React, { Component } from 'react'
import * as d3 from 'd3'
import theme from '@zooniverse/grommet-theme'

import addBackgroundLayer from './d3/addBackgroundLayer'
import createBar from './d3/createBar'
import createLabel from './d3/createLabel'

class CompletionBar extends Component {
  constructor () {
    super()
    this.svgContainer = React.createRef()
    this.d3svg = null
  }

  getData () {
    return [this.props.completeness]
  }

  componentDidMount () {
    this.initChart()
    this.drawChart()
  }

  initChart () {
    const container = this.svgContainer.current
    this.d3svg = d3.select(container)
      .append('svg')
      .attr('class', 'completion-bar')
      .attr('height', '40px')
      .attr('width', '100%')
      .style('display', 'block')
      .call(addBackgroundLayer, theme.global.colors.lightTeal)

    this.d3svg
      .selectAll('.bar')
      .data(this.getData())
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
      .tween('text', (d, i, elements) => {
        // `this` _should_ be bound to the element, but in React is already
        // bound to the component instance, so we define it here as `node`.
        const node = d3.select(elements[i])
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
      <div ref={this.svgContainer} />
    )
  }
}

CompletionBar.propTypes = {
  completeness: PropTypes.number.isRequired
}

CompletionBar.defaultProps = {
  completeness: 0.60
}

export default CompletionBar
