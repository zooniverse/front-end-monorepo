import React from 'react'
import PropTypes from 'prop-types'
import asyncStates from '@zooniverse/async-states'

import locationValidator from '../../helpers/locationValidator'
import SingleVideoViewer from './SingleVideoViewer'

class SingleVideoViewerContainer extends React.Component {
  constructor () {
    super()

    this.state = {
      vid: {},
    }
  }

  componentDidMount () {
    this.onLoad()
  }

  async onLoad () {
    const { onError, onReady } = this.props
    try {
      const { clientHeight, clientWidth, naturalHeight, naturalWidth } = await this.getVideoSize()
      const target = { clientHeight, clientWidth, naturalHeight, naturalWidth }
      onReady({ target })
    } catch (error) {
      console.error(error)
      onError(error)
    }
  }

  async getVideoSize () {
    const vid = await this.preload()
    const { width: clientWidth, height: clientHeight } = {}
    return {
      clientHeight,
      clientWidth,
      naturalHeight: vid.naturalHeight,
      naturalWidth: vid.naturalWidth
    }
  }

  preload () {
    const { subject } = this.props
    if (subject && subject.locations) {
      const vid = Object.values(subject.locations[0])[0]
      console.log("videoUrl: ", vid)
      this.setState({ vid })
      console.log("this.state: ", this.state)
      return vid
    }
    return {}
  }

  render () {
    const {
      loadingState, // subject resource loaded?
    } = this.props
    const { vid } = this.state
    const { naturalHeight, naturalWidth, src } = vid

    if (loadingState === asyncStates.error) {
      return (
        <div>Something went wrong.</div>
      )
    }

    // if (!src) {
    //   return null
    // }

    // if (!naturalWidth) {
    //   return null
    // }

    return (
          <SingleVideoViewer
            url={vid}
          >
          </SingleVideoViewer>
    )
  }
}

SingleVideoViewerContainer.propTypes = {
  loadingState: PropTypes.string,
  onError: PropTypes.func,
  onReady: PropTypes.func,
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  })
}

SingleVideoViewerContainer.defaultProps = {
  loadingState: asyncStates.initialized,
  onError: () => true,
  onReady: () => true,
}

export default SingleVideoViewerContainer
