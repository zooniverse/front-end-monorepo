import React from 'react'
import PropTypes from 'prop-types'
import ZooHeader from './ZooHeader'

export default class ZooHeaderContainer extends React.Component {
  constructor () {
    super()

    this.state = {
      isNarrow: false
    }
  }

  componentDidMount () {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize () {
    const { breakpoint } = this.props

    this.setState({ isNarrow: window.innerWidth < breakpoint })
  }

  render () {
    return (
      <ZooHeader isNarrow={this.state.isNarrow} {...this.props} />
    )
  }
}

ZooHeaderContainer.defaultProps = {
  breakpoint: 960
}

ZooHeaderContainer.propTypes = {
  breakpoint: PropTypes.number
}
