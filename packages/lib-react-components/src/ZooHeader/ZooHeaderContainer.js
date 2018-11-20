import React from 'react'
import PropTypes from 'prop-types'
import ZooHeader from './ZooHeader'

export default class ZooHeaderContainer extends React.Component {
  constructor() {
    super()

    this.state = {
      isNarrow: false
    }

    this.resizeTimeout = NaN
    this.handleResize = this.handleResize.bind(this)
  }

  componentDidMount() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize() {
    const { breakpoint } = this.props

    if (!isNaN(this.resizeTimeout)) {
      window.clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = window.setTimeout(() => {
      this.setState({
        isNarrow: window.innerWidth <= breakpoint
      }, () => {
        this.resizeTimeout = NaN;
      });
    }, 100);
  }

  render() {
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
