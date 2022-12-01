import { Layer } from 'grommet'
import PropTypes from 'prop-types'
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
    ...rest
  },
  ref) {
    if (!active) {
      return null
    }

    return (
      <Layer
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
        <WrappedComponent ref={ref} closeFn={closeFn} {...rest} />
      </Layer>
    )
  }

  const WithLayer = forwardRef(HOC)
  WithLayer.propTypes = {
    active: PropTypes.bool,
    animate: PropTypes.bool,
    className: PropTypes.string,
    closeFn: PropTypes.func,
    modal: PropTypes.bool,
    plain: PropTypes.bool,
    position: PropTypes.string,
    target: PropTypes.shape({
      current: PropTypes.node
    })
  }

  return WithLayer
}

export default withLayer
