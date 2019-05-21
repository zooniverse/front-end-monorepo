import PropTypes from 'prop-types'
import React from 'react'

import withLayer from './withLayer'
import ModalBody from './components/ModalBody'
import ModalHeading from './components/ModalHeading'

function Modal ({ children, className, closeFn, modal, pad, title }) {
  const elevation = modal ? 'medium' : 'none'
  return (
    <React.Fragment>
      <ModalHeading className={className} closeFn={closeFn} title={title} />
      <ModalBody className={className} elevation={elevation} pad={pad}>
        {children}
      </ModalBody>
    </React.Fragment>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  closeFn: PropTypes.func,
  modal: PropTypes.bool,
  title: PropTypes.string.isRequired,
  theme: PropTypes.object
}

Modal.defaultProps = {
  className: '',
  closeFn: () => {}
}

export default withLayer(Modal)

export { Modal }
