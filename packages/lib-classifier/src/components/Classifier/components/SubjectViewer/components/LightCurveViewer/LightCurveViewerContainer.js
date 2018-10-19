import asyncStates from '@zooniverse/async-states'
import React from 'react'
import PropTypes from 'prop-types'

import * as d3 from 'd3'
import exampleData from './example-planet-hunters-data.json'

import LightCurveViewer from './LightCurveViewer'
import locationValidator from '../../helpers/locationValidator'

class LightCurveViewerContainer extends React.Component {
  constructor () {
    super()
    this.state = {}
    
    this.svgContainer = React.createRef();
    
    //TODO: turn into variables?
    this.width = 500
    this.height = 500
    
    this.d3svg = null;
    this.d3dataLayer = null;
  }

  componentDidMount () {
    //Prepare the main SVG
    //--------------------------------
    this.d3svg = d3.select(this.svgContainer.current).append('svg')
      .attr('class', 'light-curve-viewer')
      //.attr('viewBox', `0 0 ${this.width} ${this.height}`)  //TODO: check
      //.attr('style', 'width: 100%; height: 100%')  //TODO: check
      .attr('width', this.width)
      .attr('height', this.height)
    
    //Note: an alternative way to later select this node is
    //`d3.select(this.d3svg.node())`. Don't use `d3.select(this.d3svg)`.
    
    //Deco: Background layer
    this.d3svg.append('rect')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('fill', '#f8f8f8')
      .attr('stroke', '#333')
      .attr('stroke-width', '2')
    //--------------------------------
    
    //Prepare the data layer
    //--------------------------------
    this.d3dataLayer = this.d3svg.append('g')
      .attr('class', 'data-layer')
      .attr('width', this.width)
      .attr('height', this.height)
    //--------------------------------
    
    //WIP: Scale and Axis layer
    //--------------------------------
    const xScale = d3.scaleLinear()
      .domain(d3.extent(exampleData.x))
      .range([0, this.width])
    const xAxis = d3.axisBottom(xScale)
    const yScale = d3.scaleLinear()
      .domain(d3.extent(exampleData.y))
      .range([this.height, 0])  //REVERSE!
    const yAxis = d3.axisLeft(yScale)
    //--------------------------------
    
    //Insert the data
    //--------------------------------
    const data = exampleData.x.map((x, index) => {
      const y = exampleData.y[index]
      return {
        x: xScale(x),
        y: yScale(y)
      }
    })
    
    this.d3dataLayer.selectAll('circle')
      .data(data)
      .enter()
        .append('circle')
        .attr('class', 'data-point')
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y)
        .attr('r', (d) => 1)
        .attr('fill', '#066')
    //--------------------------------
    
    //Add interactive elements for panning and zooming
    //--------------------------------
    this.d3interfaceLayer = this.d3svg.append('rect')
      .attr('class', 'interface-layer')
      .attr('width', this.width)
      .attr('height', this.height)
      .style('fill', 'none')
      .style('pointer-events', 'all')
    
    this.d3interfaceLayer.call(d3.zoom()
      .scaleExtent([0.1, 10])
      .on('zoom', () => { this.d3dataLayer.attr('transform', d3.event.transform) })
    )
    //--------------------------------
      
  }
  
  componentWillUnmount () {
    //TODO: check if we need to unregister the D3 SVG element
  }

  componentDidUpdate (prevProps) {
  }

  async handleSubject () {
  }

  render () {
    const { subject } = this.props
    if (!subject) {
      return null
    }

    return (
      <div className="light-curve-viewer" ref={this.svgContainer}></div>
    )
  }
}

LightCurveViewerContainer.propTypes = {}
LightCurveViewerContainer.defaultProps = {}

export default LightCurveViewerContainer
