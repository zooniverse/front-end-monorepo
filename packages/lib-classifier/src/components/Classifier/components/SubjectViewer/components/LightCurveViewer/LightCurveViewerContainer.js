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
    
    this.d3svg = React.createRef();
    
    //TODO: turn into variables?
    this.width = 500
    this.height = 500
  }

  componentDidMount () {
    d3.select(this.d3svg.current)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
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
      <div className="light-curve-viewer" ref={this.d3svg}></div>
    )
  }
}

LightCurveViewerContainer.propTypes = {}
LightCurveViewerContainer.defaultProps = {}

export default LightCurveViewerContainer
