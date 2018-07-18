import React from 'react'
import PropTypes from 'prop-types'
import locationValidator from '../../helpers/locationValidator'
import asyncStates from 'src/helpers/asyncStates'

class SingleImageViewer extends React.Component {
  constructor () {
    super()
    this.state = {
      height: null,
      width: null,
      loading: asyncStates.initialized
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
        height: img.height,
        width: img.width,
        loading: asyncStates.loading
      })
    } catch (error) {
      console.error(error)
      this.setState({ loading: asyncStates.error })
    }
  }

  render () {
    const { subject } = this.props
    if (!subject) {
      return null
    }

    // TODO: Add polyfill for Object.values for IE
    const imageUrl = Object.values(subject.locations[0])[0]
    return (
      <svg width='100%' height='100%'>
        <image xlinkHref={imageUrl} />
      </svg>
    )
  }
}

SingleImageViewer.propTypes = {
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  })
}

SingleImageViewer.defaultProps = {
  ImageObject: Image
}

export default SingleImageViewer
