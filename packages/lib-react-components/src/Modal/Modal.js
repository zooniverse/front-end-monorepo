import PropTypes from 'prop-types'
import { forwardRef, useEffect, useRef } from 'react';
import { Box } from 'grommet'
import withLayer from '../helpers/withLayer'
import ModalBody from './components/ModalBody'
import ModalHeading from './components/ModalHeading'

const DEFAULT_BACKGROUND = {
  dark: 'dark-5',
  light: 'neutral-6'
}

const Modal = forwardRef(function ({
  bodyBackground = DEFAULT_BACKGROUND,
  children,
  className = '',
  closeFn,
  headingBackground = 'brand',
  overflow = 'auto',
  pad,
  title = '',
  titleColor = 'neutral-6',
  trapFocus = false,
  ...props
},
ref) {
  const defaultRef = useRef(null)
  const root = ref || defaultRef

  useEffect(function onMount(){
    if (trapFocus) root.current?.focus()
  }, [trapFocus])

  return (
    <Box
      ref={root}
      background={{
        dark: 'dark-5',
        light: 'neutral-6'
      }}
      elevation='xlarge'
      fill
      pad='0'
      tabIndex={-1}
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
        background={bodyBackground}
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
  /**
    The background color for the modal body. It can be set to any CSS color value or color string value from the Zooniverse Grommet theme or an object setting the color for the light and dark theme.
  */
  bodyBackground: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
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
  titleColor: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
  /**
   * Capture keyboard focus when the modal opens.
   */
  trapFocus: PropTypes.bool,
}

export default withLayer(Modal)

export { Modal }
