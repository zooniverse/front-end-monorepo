import { forwardRef, useRef } from 'react';
import { func, node, number, object, oneOfType, shape, string } from 'prop-types'
import { Drag } from 'grommet-icons'
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

const KEY_DIRECTIONS = {
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  ArrowUp: { x: 0, y: -1 }
}
const KEY_STEP = 10
const KEY_STEP_LARGE = 50

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
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
  const rnd = useRef(null)

  // Accessibility: lets keyboard users move the modal with the arrow keys, as mouse users can by dragging.
  function onKeyDown(event) {
    const direction = KEY_DIRECTIONS[event.key]
    if (!direction || event.target !== event.currentTarget) return
    event.preventDefault()
    const step = event.shiftKey ? KEY_STEP_LARGE : KEY_STEP
    const { bottom, left, right, top } = event.currentTarget.getBoundingClientRect()
    const draggable = rnd.current.getDraggablePosition()
    const offset = rnd.current.offsetFromParent
    const x = draggable.x + clamp(direction.x * step, Math.min(0, -left), Math.max(0, window.innerWidth - right))
    const y = draggable.y + clamp(direction.y * step, Math.min(0, -top), Math.max(0, window.innerHeight - bottom))
    rnd.current.updatePosition({ x, y })
    restRndProps.onDragStop?.(event, { x: x + offset.left, y: y + offset.top })
  }

  return (
    <Rnd
      ref={rnd}
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
        aria-keyshortcuts='ArrowUp ArrowDown ArrowLeft ArrowRight'
        closeFn={closeFn}
        headingBackground={headingBackground}
        headingIcon={Drag}
        onKeyDown={onKeyDown}
        overflow={overflow}
        tabIndex={0}
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
