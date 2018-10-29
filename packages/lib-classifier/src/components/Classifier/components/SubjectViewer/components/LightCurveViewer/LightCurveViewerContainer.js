import asyncStates from '@zooniverse/async-states'
import React from 'react'
import PropTypes from 'prop-types'
import request from 'superagent'

import LightCurveViewer from './LightCurveViewer'
import locationValidator from '../../helpers/locationValidator'

class LightCurveViewerContainer extends React.Component {
  constructor () {
    super()
    
    this.state = {
      loading: asyncStates.initialized,
      jsonData: null,
    }
    
    //TODO: turn into variables?
    this.width = 500
    this.height = 500
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
  
  componentWillUnmount () {}

  handleSubject () {
    const { subject } = this.props
    
    //Sanity check
    //TODO: error handling - what if there's no subject?
    if (!subject) return
    
    //Find the first location that has a JSON MIME type.
    //NOTE: we also temporarily accept plain text, due to quirks with the Panoptes CLI uploading wonky MIME types (@shaun 20181024)
    let jsonLocation = subject.locations.find(l => l['application/json'] || l['text/plain'])
    jsonLocation = jsonLocation && (jsonLocation['application/json'] || jsonLocation['text/plain'])

    //TODO: error handling - what if there's no JSON url?
    if (!jsonLocation) return
    
    this.setState({ loading: asyncStates.loading })
    try {
      request.get(jsonLocation)
        .then(res => {
          if (res.ok) {
            //Get the JSON data, or (as a failsafe) parse the JSON data if the response is returned as a string
            const jsonData = res.body || JSON.parse(res.text)
            
            this.setState({ jsonData })
          } else {
            throw 'ERROR: invalid response'
          }
        })
        .catch(err => {
          //Possible errors:
          throw(err)
        })
    } catch (err) {
      console.error(err)
      this.setState({ loading: asyncStates.error, jsonData: null })
    }
  }

  render () {
    const { subject } = this.props
    if (!subject) {
      return null
    }
    
    return (
      <LightCurveViewer
        jsonData={this.state.jsonData}
        width={this.width}
        width={this.height}
      />
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
