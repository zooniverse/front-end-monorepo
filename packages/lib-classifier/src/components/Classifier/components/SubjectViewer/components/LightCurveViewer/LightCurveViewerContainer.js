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
    
    this.d3svg = d3.select(this.svgContainer.current)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
    
    this.d3dataLayer = d3.select(this.d3svg.node())
      .append('rect')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('fill', '#eff')
  }
  
  componentWillUnount () {
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
