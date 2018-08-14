import { Box, Button, Grommet, Layer } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import zooTheme from '@zooniverse/grommet-theme'

import WithLayer from './WithLayer'
import ModalBody from './components/ModalBody'
import ModalHeading from './components/ModalHeading'

class Modal extends React.Component {
  render () {
    const { children, closeFn, colorTheme, theme, title } = this.props
    return (
      <Grommet theme={theme}>
        <ModalHeading closeFn={closeFn} title={title} />
        <ModalBody colorTheme={colorTheme}>
          {children}
        </ModalBody>
      </Grommet>
    )
  }
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
  theme: zooTheme
}

export default WithLayer(Modal)

export { Modal }
