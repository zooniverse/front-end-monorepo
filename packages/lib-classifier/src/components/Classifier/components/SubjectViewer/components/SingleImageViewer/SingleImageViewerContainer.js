import asyncStates from '@zooniverse/async-states'
import React from 'react'
import PropTypes from 'prop-types'

import SingleImageViewer from './SingleImageViewer'
import locationValidator from '../../helpers/locationValidator'

class SingleImageViewerContainer extends React.Component {
  constructor () {
    super()
    this.onLoad = this.onLoad.bind(this)
    this.onError = this.onError.bind(this)
    this.state = {
      naturalHeight: null,
      naturalWidth: null,
      loading: asyncStates.initialized
    }
  }

  componentDidMount () {
    this.handleSubject()
  }

  // TODO: store the subject image's naturalWidth, naturalHeight, clientWidth, and clientHeight
  // in the classification metadata
  // Using SVG image might need to be rethought
  fetchImage (url) {
    const { ImageObject } = this.props
    return new Promise((resolve, reject) => {
      let img = new ImageObject()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = url
    })
  }

  async handleSubject () {
    const { subject } = this.props
    // TODO: Add polyfill for Object.values for IE
    const imageUrl = Object.values(subject.locations[0])[0]
    this.setState({ loading: asyncStates.loading })
    try {
      const img = await this.fetchImage(imageUrl)

      this.setState({
        naturalHeight: img.naturalHeight,
        naturalWidth: img.naturalWidth,
        loading: asyncStates.success
      })
    } catch (error) {
      this.onError(error)
    }
  }

  onLoad (event) {
    const { onReady } = this.props
    const { naturalHeight, naturalWidth } = this.state
    const { target } = event || {}
    const newTarget = Object.assign({}, target, { naturalHeight, naturalWidth })
    const fakeEvent = Object.assign({}, event, { target: newTarget })
    onReady(fakeEvent)
  }

  onError (error) {
    console.error(error)
    this.setState({ loading: asyncStates.error })
  }

  render () {
    const { loadingState } = this.state
    const { subject } = this.props
    if (loadingState === asyncStates.error) {
      return (
        <div>Something went wrong.</div>
      )
    }

    if (!subject) {
      return null
    }

    // TODO: Add polyfill for Object.values for IE
    const imageUrl = Object.values(subject.locations[0])[0]
    return (
      <SingleImageViewer
        onError={this.onError}
        onLoad={this.onLoad}
        url={imageUrl}
      />
    )
  }
}

SingleImageViewerContainer.propTypes = {
  onReady: PropTypes.func,
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  })
}

SingleImageViewerContainer.defaultProps = {
  ImageObject: window.Image,
  onReady: () => true
}

export default SingleImageViewerContainer
