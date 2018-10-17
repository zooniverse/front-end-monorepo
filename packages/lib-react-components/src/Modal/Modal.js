import PropTypes from 'prop-types'
import React from 'react'

import WithLayer from './WithLayer'
import ModalBody from './components/ModalBody'
import ModalHeading from './components/ModalHeading'

function Modal ({ children, closeFn, colorTheme, theme, title }) {
  return (
    <React.Fragment>
      <ModalHeading closeFn={closeFn} title={title} />
      <ModalBody colorTheme={colorTheme}>
        {children}
      </ModalBody>
    </React.Fragment>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeFn: PropTypes.func,
  colorTheme: PropTypes.oneOf(['light', 'dark']),
  title: PropTypes.string.isRequired,
  theme: PropTypes.object
}

Modal.defaultProps = {
  colorTheme: 'light',
  closeFn: () => {}
}

export default WithLayer(Modal)

export { Modal }
