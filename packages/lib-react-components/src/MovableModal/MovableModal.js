import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Rnd } from 'react-rnd'
import ResizeIcon from './components/ResizeIcon/index.js'
import withLayer from '../helpers/withLayer/index.js'
import { Modal } from '../Modal/index.js'

const defaultRndProps = {
  default: {
    x: 0,
    y: 0
  },
  minHeight: 100,
  minWidth: 350
}

const MovableModal = forwardRef(function ({
  children,
  closeFn,
  headingBackground,
  overflow = 'auto',
  pad,
  rndProps = defaultRndProps,
  title = '',
  titleColor,
  ...rest
},
ref) {

  const {
    cancel,
    minHeight,
    minWidth,
    ...restRndProps
  } = rndProps
  // Change handleComponent prop to resizeHandleComponent when react-rnd gets upgraded
  return (
    <Rnd
      cancel={cancel}
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
        ref={ref}
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
})

MovableModal.propTypes = {
  children: PropTypes.node,
  closeFn: PropTypes.func,
  headingBackground: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
  overflow: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
  pad: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
  rndProps: PropTypes.shape({
    cancel: PropTypes.string,
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