import React from 'react'
import PropTypes from 'prop-types'
import locationValidator from '../../helpers/locationValidator'
import asyncStates from 'src/helpers/asyncStates'

class SingleImageViewer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      height: null,
      width: null,
      loading: asyncStates.initialized
    }
  }

  componentDidMount () {
    this.handleSubject()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.subject.id !== this.props.subject.id) {
      this.handleSubject()
    }
  }

  fetchImage (url) {
    return new Promise((resolve, reject) => {
      let img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = url
    })
  }

  async handleSubject () {
    const { subject } = this.props
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

export default SingleImageViewer
