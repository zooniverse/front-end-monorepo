import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import request from 'superagent'
import asyncStates from '@zooniverse/async-states'

import locationValidator from '../../helpers/locationValidator'
import SingleTextViewer from './SingleTextViewer'

function storeMapper(stores) {
  // TODO connect to get other data / function as needed
}

class SingleTextViewerContainer extends Component {
  constructor() {
    super()

    this.viewer = React.createRef()

    this.state = {
      content: ''
    }
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
    const { subject } = this.props
    // Find locations that have a text/plain MIME type.
    const textLocation = subject.locations.find(l => l['text/plain']) || {}
    const url = Object.values(textLocation)[0]
    if (url) {
      return url
    } else {
      throw new Error('No text url found for this subject')
    }
  }

  async requestData () {
    const { onError } = this.props
    try {
      const url = this.getSubjectUrl()
      const response = await request.get(url)
      return response.text || ''
    } catch (error) {
      onError(error)
      return {}
    }
  }

  async handleSubject () {
    const { onError } = this.props
    try {
      const rawData = await this.requestData()
      if (rawData) this.onLoad(rawData)
    } catch (error) {
      onError(error)
      return {}
    }
  }

  onLoad (rawData) {
    const { onReady } = this.props
    
    const container = this.viewer.current?.container
    const { width: clientWidth, height: clientHeight } = container ? container.getBoundingClientRect() : {}
    const target = { clientWidth, clientHeight, naturalWidth: 0, naturalHeight: 0 }
    
    this.setState({
      content: rawData
    },
    function () {
      onReady({ target })
    })
  }

  render () {
    const {
      loadingState
    } = this.props
    const { content } = this.state

    if (loadingState === asyncStates.error) {
      return <div>Something went wrong.</div>
    }

    if (loadingState !== asyncStates.initialized) {
      return (
        <div>
          <SingleTextViewer>
            {content}
          </SingleTextViewer>
        </div>
      )
    }
    return null
  }
}

SingleTextViewerContainer.defaultProps = {
  loadingState: asyncStates.initialized,
  onError: () => true,
  onReady: () => true,
  subject: {
    id: '',
    locations: []
  }
}

SingleTextViewerContainer.propTypes = {
  loadingState: PropTypes.string,
  onError: PropTypes.func,
  onReady: PropTypes.func,
  subject: PropTypes.shape({
    id: PropTypes.string,
    locations: PropTypes.arrayOf(locationValidator)
  })
}

@inject(storeMapper)
@observer
class DecoratedSingleTextViewerContainer extends SingleTextViewerContainer { }

export default DecoratedSingleTextViewerContainer
export { SingleTextViewerContainer }
