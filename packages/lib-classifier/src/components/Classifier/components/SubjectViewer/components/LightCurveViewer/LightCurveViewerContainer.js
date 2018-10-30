import asyncStates from '@zooniverse/async-states'
import { get } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
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

  getSubjectUrl () {
    // Find the first location that has a JSON MIME type.
    // NOTE: we also temporarily accept plain text, due to quirks with the
    // Panoptes CLI uploading wonky MIME types (@shaun 20181024)
    const locations = get(this, 'props.subject.locations', [])
    const jsonLocation = locations.find(l => l['application/json'] || l['text/plain']) || {}
    const url = Object.values(jsonLocation)[0]

    if (!url) {
      throw new Error('No JSON url found for this subject')
    }

    return url
  }

  handleSubject () {
    const { subject } = this.props

    //Sanity check
    //TODO: error handling - what if there's no subject?
    if (!subject) return

    this.setState({ loading: asyncStates.loading })
    try {
      const jsonLocation = this.getSubjectUrl()
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
