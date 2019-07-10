import asyncStates from '@zooniverse/async-states'
import React from 'react'
import PropTypes from 'prop-types'

import SingleImageViewer from './SingleImageViewer'
import locationValidator from '../../helpers/locationValidator'

class SingleImageViewerContainer extends React.Component {
  constructor () {
    super()
    this.imageViewer = React.createRef()
    this.onLoad = this.onLoad.bind(this)
  }

  fetchImage (url) {
    const { ImageObject } = this.props
    return new Promise((resolve, reject) => {
      const img = new ImageObject()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = url
    })
  }

  async getImageSize () {
    const { subject } = this.props
    // TODO: Add polyfill for Object.values for IE
    const imageUrl = Object.values(subject.locations[0])[0]
    const img = await this.fetchImage(imageUrl)
    const svg = this.imageViewer.current
    return {
      clientHeight: svg.clientHeight,
      clientWidth: svg.clientWidth,
      naturalHeight: img.naturalHeight,
      naturalWidth: img.naturalWidth
    }
  }

  async onLoad () {
    const { onError, onReady } = this.props
    try {
      const { clientHeight, clientWidth, naturalHeight, naturalWidth } = await this.getImageSize()
      const target = { clientHeight, clientWidth, naturalHeight, naturalWidth }
      onReady({ target })
    } catch (error) {
      onError(error)
    }
  }

  render () {
    const { loadingState, onError, subject } = this.props
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
        ref={this.imageViewer}
        onError={onError}
        onLoad={this.onLoad}
        url={imageUrl}
      />
    )
  }
}

SingleImageViewerContainer.propTypes = {
  loadingState: PropTypes.string,
  onError: PropTypes.func,
  onReady: PropTypes.func,
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  })
}

SingleImageViewerContainer.defaultProps = {
  ImageObject: window.Image,
  loadingState: asyncStates.initialized,
  onError: () => true,
  onReady: () => true
}

export default SingleImageViewerContainer
