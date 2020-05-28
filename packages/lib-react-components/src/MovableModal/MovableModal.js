import React from 'react'
import PropTypes from 'prop-types'
import { Rnd } from 'react-rnd'
import ResizeIcon from './components/ResizeIcon'
import withLayer from '../withLayer'
import { Modal } from '../Modal'

function MovableModal (props) {
  const {
    children,
    closeFn = () => {},
    headingBackground = '',
    minHeight = 100,
    minWidth = 350,
    pad,
    position = {
      x: 0,
      y: 0
    },
    title = '',
    ...rest
  } = props

  return (
    <Rnd
      cancel='.subtaskpopup-element-that-ignores-drag-actions'
      default={position}
      minHeight={minHeight}
      minWidth={minWidth}
      resizeHandleComponent={{ bottomRight: <ResizeIcon /> }}
      resizeHandleStyles={{
        bottom: {},
        bottomLeft: {
          bottom: 0,
          left: 0
        },
        bottomRight: {
          bottom: 0,
          height: '20px',
          right: 0,
          width: '14px'
        },
        left: {},
        right: {},
        top: {},
        topLeft: {
          left: 0,
          top: 0
        },
        topRight: {
          right: 0,
          top: 0
        }
      }}
      {...rest}
    >
      <Modal
        closeFn={closeFn}
        headingBackground={headingBackground}
        pad={pad}
        title={title}
      >
        {children}
      </Modal>
    </Rnd>
  )
}

MovableModal.propTypes = {
  children: PropTypes.node,
  closeFn: PropTypes.func,
  headingBackground: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
  minHeight: PropTypes.number,
  minWidth: PropTypes.number,
  pad: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  title: PropTypes.string,
}

export default withLayer(MovableModal)
export { MovableModal }