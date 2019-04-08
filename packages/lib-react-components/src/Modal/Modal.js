import PropTypes from 'prop-types'
import React from 'react'

import WithLayer from './WithLayer'
import ModalBody from './components/ModalBody'
import ModalHeading from './components/ModalHeading'

function Modal ({ children, className, closeFn, colorTheme, pad, title }) {
  return (
    <React.Fragment>
      <ModalHeading className={className} closeFn={closeFn} title={title} />
      <ModalBody className={className} colorTheme={colorTheme} pad={pad}>
        {children}
      </ModalBody>
    </React.Fragment>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  closeFn: PropTypes.func,
  colorTheme: PropTypes.oneOf(['light', 'dark']),
  title: PropTypes.string.isRequired,
  theme: PropTypes.object
}

Modal.defaultProps = {
  colorTheme: 'light',
  className: '',
  closeFn: () => {}
}

export default WithLayer(Modal)

export { Modal }
