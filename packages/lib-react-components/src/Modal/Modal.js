import PropTypes from 'prop-types'
import React from 'react'
import { Grommet } from 'grommet'

import WithLayer from './WithLayer'
import ModalBody from './components/ModalBody'
import ModalHeading from './components/ModalHeading'

function Modal ({ children, className, closeFn, pad, theme, title }) {
  return (
    <Grommet theme={theme}>
      <ModalHeading className={className} closeFn={closeFn} title={title} />
      <ModalBody className={className} pad={pad}>
        {children}
      </ModalBody>
    </Grommet>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  closeFn: PropTypes.func,
  title: PropTypes.string.isRequired,
  theme: PropTypes.object
}

Modal.defaultProps = {
  className: '',
  closeFn: () => {}
}

export default WithLayer(Modal)

export { Modal }
