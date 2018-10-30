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

  async handleSubject () {
    //Sanity check
    //TODO: error handling - what if there's no subject?
    if (!this.props.subject) return

    this.setState({ loading: asyncStates.loading })
    try {
      const jsonLocation = this.getSubjectUrl()
      const response = await request.get(jsonLocation)

      if (!response.ok) {
        throw new Error('Invalid response')
      }

      const jsonData = response.body || JSON.parse(response.text)
      this.setState({ jsonData })
    } catch (error) {
      console.error(error)
      this.setState({ loading: asyncStates.error, jsonData: null })
    }
  }

  render () {
    return (this.props.subject)
      ? <LightCurveViewer jsonData={this.state.jsonData} />
      : null
  }
}

LightCurveViewerContainer.propTypes = {
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  })
}

LightCurveViewerContainer.defaultProps = {}

export default LightCurveViewerContainer
