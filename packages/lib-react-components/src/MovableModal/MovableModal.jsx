import { forwardRef } from 'react';
import { func, node, number, object, oneOfType, shape, string } from 'prop-types'
import { Rnd } from 'react-rnd'
import ResizeIcon from './components/ResizeIcon'
import withLayer from '../helpers/withLayer'
import { Modal } from '../Modal'

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
      resizeHandleComponent={{ bottomRight: <ResizeIcon /> }}
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
  children: node,
  closeFn: func,
  headingBackground: oneOfType([ object, string ]),
  overflow: oneOfType([ object, string ]),
  pad: oneOfType([ object, string ]),
  rndProps: shape({
    cancel: string,
    minHeight: number,
    minWidth: number,
    position: shape({
      x: number,
      y: number
    })
  }),
  title: string,
  titleColor: oneOfType([object, string])
}

export default withLayer(MovableModal)
export { MovableModal }
