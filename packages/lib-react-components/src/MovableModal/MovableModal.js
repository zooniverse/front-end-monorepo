import React from 'react'
import PropTypes from 'prop-types'
import { Rnd } from 'react-rnd'
import ResizeIcon from './components/ResizeIcon'
import withLayer from '../helpers/withLayer'
import { Modal } from '../Modal'

function MovableModal (props) {
  const {
    children,
    closeFn,
    headingBackground,
    overflow,
    pad,
    rndProps: {
      minHeight,
      minWidth,
      position,
      ...restRndProps
    },
    title,
    titleColor,
    ...rest
  } = props

  // Change handleComponent prop to resizeHandleComponent when react-rnd gets upgraded
  return (
    <Rnd
      cancel='.subtaskpopup-element-that-ignores-drag-actions'
      enableResizing={{
        bottom: true,
        bottomLeft: false,
        bottomRight: true,
        left: true,
        right: true,
        top: true,
        topLeft: false,
        topRight: false
      }}
      default={position}
      minHeight={minHeight}
      minWidth={minWidth}
      handleComponent={{ bottomRight: <ResizeIcon /> }}
      resizeHandleStyles={{
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
        topLeft: {
          left: 0,
          top: 0
        },
        topRight: {
          right: 0,
          top: 0
        }
      }}
      {...restRndProps}
    >
      <Modal
        closeFn={closeFn}
        headingBackground={headingBackground}
        overflow={overflow}
        pad={pad}
        title={title}
        titleColor={titleColor}
        {...rest}
      >
        {children}
      </Modal>
    </Rnd>
  )
}

MovableModal.defaultProps = {
  closeFn: () => {},
  overflow: 'auto',
  rndProps: {
    minHeight: 100,
    minWidth: 350,
    position: {
      x: 0,
      y: 0
    }
  },
  title: ''
}

MovableModal.propTypes = {
  children: PropTypes.node,
  closeFn: PropTypes.func,
  headingBackground: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
  overflow: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
  pad: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
  rndProps: PropTypes.shape({
    minHeight: PropTypes.number,
    minWidth: PropTypes.number,
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    })
  }),
  title: PropTypes.string,
  titleColor: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
}

export default withLayer(MovableModal)
export { MovableModal }