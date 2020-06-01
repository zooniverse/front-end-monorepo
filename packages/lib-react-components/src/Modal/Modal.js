import PropTypes from 'prop-types'
import React from 'react'

import withLayer from '../helpers/withLayer'
import ModalBody from './components/ModalBody'
import ModalHeading from './components/ModalHeading'

class Modal extends React.Component {
  constructor () {
    super()

    this.state = {
      client: false
    }
  }

  componentDidMount () {
    // This seems rendundant when used in conjunction with withOnlyRenderOnBrowser
    // Yet without it, autoFocus on child components don't work
    this.setState({ client: true })
  }

  render () {
    const {
      children,
      className = '',
      closeFn = () => {},
      headingBackground = '',
      pad,
      title = ''
    } = this.props

    if (!this.state.client) {
      return null
    }

    return (
      <React.Fragment>
        <ModalHeading
          background={headingBackground}
          className={className}
          closeFn={closeFn}
          title={title}
        />
        <ModalBody className={className} pad={pad}>
          {children}
        </ModalBody>
      </React.Fragment>
    )
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  closeFn: PropTypes.func,
  headingBackground: PropTypes.string,
  title: PropTypes.string.isRequired,
  theme: PropTypes.object
}

export default withLayer(Modal)

export { Modal }
