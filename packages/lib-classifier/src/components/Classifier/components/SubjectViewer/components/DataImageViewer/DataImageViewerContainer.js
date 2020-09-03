import React from 'react'
import PropTypes from 'prop-types'
import asyncStates from '@zooniverse/async-states'
import request from 'superagent'
import locationValidator from '../../helpers/locationValidator'
import DataImageViewer from './DataImageViewer'

export default class DataImageViewerContainer extends React.Component {
  constructor() {
    super()

    this.viewer = React.createRef()

    this.state = {
      allowPanZoom: '',
      imageSrc: '',
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
    // Find the first location that has a JSON MIME type.
    const jsonLocation = this.props.subject.locations.find(l => l['application/json']) || {}
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
    const { onReady, subject } = this.props
    const target = this.viewer.current
    const imageLocation = subject.locations.find(location => location['image/png']) || {}
    const imageSrc = imageLocation['image/png'] || ''

    this.setState({
      imageSrc,
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
      imageSrc,
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
        imageSrc={imageSrc}
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

