import React from 'react'
import PropTypes from 'prop-types'
import asyncStates from '@zooniverse/async-states'
import request from 'superagent'
import locationValidator from '../../helpers/locationValidator'
import { findLocationsByMediaType } from '@helpers'
import DataImageViewer from './DataImageViewer'

export default class DataImageViewerContainer extends React.Component {
  constructor() {
    super()

    this.viewer = React.createRef()

    this.state = {
      allowPanZoom: '',
      imageLocation: null,
      JSONData: {
        data: [],
        chartOptions: {}
      }
    }

    this.setAllowPanZoom = this.setAllowPanZoom.bind(this)
  }

  async componentDidMount () {
    const { subject } = this.props
    if (subject) {
      await this.handleSubject()
    }
  }

  async componentDidUpdate (prevProps) {
    const { subject } = this.props
    const prevSubjectId = prevProps.subject && prevProps.subject.id
    const subjectChanged = subject && (subject.id !== prevSubjectId)

    if (subjectChanged) {
      await this.handleSubject()
    }
  }

  getSubjectUrl () {
    let jsonLocation = {}
    const { subject } = this.props
    // Find locations that have a JSON MIME type.
    // TODO: do we need to support txt file fallback?
    const locations = findLocationsByMediaType(subject.locations, 'application') || []
    if (locations?.length > 0 && locations[0]) {
      jsonLocation = locations[0]
    }
    const url = Object.values(jsonLocation)[0]
    if (url) {
      return url
    } else {
      throw new Error('No JSON url found for this subject')
    }
  }

  async requestData () {
    const { onError } = this.props
    try {
      const url = this.getSubjectUrl()
      const response = await request.get(url)

      // Get the JSON data, or (as a failsafe) parse the JSON data if the
      // response is returned as a string
      if (response.body) {
        return response.body
      } else if  (JSON.parse(response.text)) {
        return { data: JSON.parse(response.text), chartOptions: {} }
      }

      return null
    } catch (error) {
      onError(error)
      return null
    }
  }

  async handleSubject () {
    const { onError } = this.props
    try {
      const JSONData = await this.requestData()
      if (JSONData) this.onLoad(JSONData)
    } catch (error) {
      onError(error)
    }
  }

  onLoad (JSONData) {
    let imageLocation = {}
    const { onReady, subject } = this.props
    const target = this.viewer.current
    const locations = findLocationsByMediaType(subject.locations, 'image')
    if (locations?.length > 0) {
      // Presumably 2 image locations will be found
      // The first will be the fallback to display something in Talk
      // Even if there's only one, this is fine
      imageLocation = locations.reverse()[0]
    }

    this.setState({
      imageLocation,
      JSONData
    },
      function() {
        onReady({ target })
      }
    )
  }

  setAllowPanZoom (area) {
    this.setState({ allowPanZoom: area })
  }

  render () {
    const {
      allowPanZoom,
      imageLocation,
      JSONData
    } = this.state

    const {
      subject,
      ...rest
    } = this.props

    if (!subject.id) {
      return null
    }

    return (
      <DataImageViewer
        allowPanZoom={allowPanZoom}
        imageLocation={imageLocation}
        ref={this.viewer}
        JSONData={JSONData}
        setAllowPanZoom={this.setAllowPanZoom}
        {...rest}
      />
    )
  }
}

DataImageViewerContainer.defaultProps = {
  loadingState: asyncStates.initialized,
  onError: () => true,
  onReady: () => true,
  subject: {
    id: '',
    locations: []
  }
}

DataImageViewerContainer.propTypes = {
  loadingState: PropTypes.string,
  onError: PropTypes.func,
  onReady: PropTypes.func,
  subject: PropTypes.shape({
    id: PropTypes.string,
    locations: PropTypes.arrayOf(locationValidator)
  })
}

