import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import { Box } from 'grommet'
import withLayer from '../helpers/withLayer/index.js'
import ModalBody from './components/ModalBody/index.js'
import ModalHeading from './components/ModalHeading/index.js'

const Modal = forwardRef(function ({
  children,
  className = '',
  closeFn,
  headingBackground = 'brand',
  overflow = 'auto',
  pad,
  title = '',
  titleColor = 'neutral-6',
  ...props
},
ref) {
  return (
    <Box
      ref={ref}
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
})

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
