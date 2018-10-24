import asyncStates from '@zooniverse/async-states'
import React from 'react'
import PropTypes from 'prop-types'
import request from 'superagent'

import * as d3 from 'd3'
import exampleData from './example-planet-hunters-data.json'

import LightCurveViewer from './LightCurveViewer'
import locationValidator from '../../helpers/locationValidator'

class LightCurveViewerContainer extends React.Component {
  constructor () {
    super()
    this.state = {
      loading: asyncStates.initialized
    }
    
    //React reference to the DOM.
    //See: https://reactjs.org/docs/refs-and-the-dom.html
    this.svgContainer = React.createRef();
    
    //TODO: turn into variables?
    this.width = 500
    this.height = 500
    
    //D3 bits
    this.d3svg = null;
    this.d3dataLayer = null;
  }
  
  componentDidMount () {
    if (this.props.subject) {
      this.handleSubject()
    }
  }

  componentDidUpdate (prevProps) {
    const prevSubject = prevProps.subject
    const { subject } = this.props

    if (subject && (!prevSubject || prevSubject.id !== subject.id)) {
      this.handleSubject()
    }
  }

  async handleSubject () {
    const { subject } = this.props
    
    //Sanity check
    //TODO: error handling - what if there's no subject?
    if (!subject) return
    
    //Find the first location that has a JSON MIME type.
    //NOTE: we also temporarily accept plain text, due to quirks with the Panoptes CLI uploading wonky MIME types (@shaun 20181024)
    const jsonLocation = subject.locations.find(l => l['application/json'] || l['text/plain'])

    //TODO: error handling - what if there's no JSON url?
    if (!jsonLocation) return
    
    this.setState({ loading: asyncStates.loading })
    try {
      
      request.get(jsonLocation['application/json'] || jsonLocation['text/plain'])
        .then(res => {
          if (res.ok) {
            //Get the JSON data, or (as a failsafe) parse the JSON data if the response is returned as a string
            const jsonData = res.body || JSON.parse(res.text)
            this.d3init(jsonData);
          } else {
            throw 'ERROR: invalid response'
          }
        })
        .catch(err => {
          //Possible errors:
          // - 
          throw(err)
        })
      
      //const img = await this.fetchImage(imageUrl)
      //this.setState({
      //  height: img.height,
      //  width: img.width,
      //  loading: asyncStates.success
      //})
    } catch (err) {
      console.error(err)
      this.setState({ loading: asyncStates.error })
    }
  }

  d3init (dataJson) {
    //Prepare the main SVG
    //--------------------------------
    this.d3svg = d3.select(this.svgContainer.current).append('svg')
      .attr('class', 'light-curve-viewer')
      //.attr('viewBox', `0 0 ${this.width} ${this.height}`)  //TODO: check
      //.attr('style', 'width: 100%; height: 100%')  //TODO: check
      .attr('width', this.width)
      .attr('height', this.height)
    
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
    //--------------------------------
    
    //WIP: Scale and Axis layer
    //--------------------------------
    const xScale = d3.scaleLinear()
      .domain(d3.extent(dataJson.x))
      .range([0, this.width])
    const xAxis = d3.axisBottom(xScale)
    const yScale = d3.scaleLinear()
      .domain(d3.extent(dataJson.y))
      .range([this.height, 0])  //REVERSE!
    const yAxis = d3.axisLeft(yScale)
    //--------------------------------
    
    //Insert the data
    //--------------------------------
    const data = dataJson.x.map((x, index) => {
      const y = dataJson.y[index]
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

LightCurveViewerContainer.propTypes = {
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  })
}

LightCurveViewerContainer.defaultProps = {}

export default LightCurveViewerContainer
