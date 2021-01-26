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
      className,
      closeFn,
      headingBackground,
      overflow,
      pad,
      title,
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

Modal.defaultProps = {
  active: false,
  className: '',
  closeFn: undefined,
  headingBackground: 'brand',
  overflow: 'auto',
  title: '',
  titleColor: 'neutral-6'
}

Modal.propTypes = {
  /**
    Determines whether the modal is visible or not.
  */
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
  /**
    Optional CSS class applied to the modal content.
  */
  className: PropTypes.string,
  /**
    Optional function called when clicking outside the modal, or when the Esc button is pressed. If this is not present, then the close button is not shown and the modal cannot be closed except by taking action in the content eg. pressing a button to continue.
  */
  closeFn: PropTypes.func,
  /**
    The background color for the modal header. It can be set to any CSS color value or color string value from the Zooniverse Grommet theme or an object setting the color for the light and dark theme.
  */
  headingBackground: PropTypes.string,
  overflow: PropTypes.string,
  /**
    string to use as the modal title
  */
  title: PropTypes.string,
  /**
    The color of the title text. It can be set to any CSS color value or color string value from the Zooniverse Grommet theme or an object setting the color for the light and dark theme.
  */
  titleColor: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ])
}

export default withLayer(Modal)

export { Modal }
