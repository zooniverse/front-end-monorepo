import PropTypes from 'prop-types'
import React from 'react'
import { Box } from 'grommet'
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
    // This seems redundant when used in conjunction with withOnlyRenderOnBrowser
    // Yet without it, autoFocus on child components don't work
    this.setState({ client: true })
  }

  render () {
    const {
      children,
      className = '',
      closeFn = () => {},
      headingBackground,
      overflow = 'auto',
      pad,
      title = '',
      titleColor,
      ...props
    } = this.props

    if (!this.state.client) {
      return null
    }

    return (
      <Box
        background={{
          dark: 'dark-5',
          light: 'neutral-6'
        }}
        elevation='xlarge'
        fill
        pad='none'
        {...props}
      >
        <ModalHeading
          background={headingBackground}
          className={className}
          closeFn={closeFn}
          color={titleColor}
          title={title}
        />
        <ModalBody
          className={className}
          overflow={overflow}
          pad={pad}
        >
          {children}
        </ModalBody>
      </Box>
    )
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  closeFn: PropTypes.func,
  headingBackground: PropTypes.string,
  overflow: PropTypes.string,
  title: PropTypes.string,
  titleColor: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ])
}

export default withLayer(Modal)

export { Modal }
