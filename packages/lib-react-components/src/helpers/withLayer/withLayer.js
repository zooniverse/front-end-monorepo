import { Layer } from 'grommet'
import { bool, func, node, shape, string } from 'prop-types'
import { forwardRef } from 'react';

function withLayer (WrappedComponent) {
  function HOC ({
    active = false,
    animate = false,
    className = '',
    closeFn,
    full = false,
    modal = true,
    plain = false,
    position = 'center',
    target,
    title,
    ...rest
  },
  ref) {
    if (!active) {
      return null
    }

    return (
      <Layer
        role='dialog'
        aria-label={title}
        animate={animate}
        className={className}
        full={full}
        modal={modal}
        plain={plain}
        position={position}
        onClickOutside={closeFn}
        onEsc={closeFn}
        target={target}
      >
        <WrappedComponent
          ref={ref}
          closeFn={closeFn}
          title={title}
          trapFocus
          {...rest}
        />
      </Layer>
    )
  }

  const WithLayer = forwardRef(HOC)
  WithLayer.propTypes = {
    active: bool,
    animate: bool,
    className: string,
    closeFn: func,
    modal: bool,
    plain: bool,
    position: string,
    target: shape({
      current: node
    })
  }

  return WithLayer
}

export default withLayer
