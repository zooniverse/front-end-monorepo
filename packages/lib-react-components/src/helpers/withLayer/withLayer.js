import { Layer } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

function withLayer (WrappedComponent) {
  function HOC (props) {
    const {
      active = false,
      animate = false,
      className = '',
      closeFn,
      modal = true,
      plain = false,
      position = 'center', 
      ...rest
    } = props

    if (!active) {
      return null
    }

    return (
      <Layer
        animate={animate}
        className={className}
        modal={modal}
        plain={plain}
        position={position}
        onClickOutside={closeFn}
        onEsc={closeFn}
      >
        <WrappedComponent closeFn={closeFn} {...rest} />
      </Layer>
    )
  }

  HOC.propTypes = {
    active: PropTypes.bool,
    animate: PropTypes.bool,
    className: PropTypes.string,
    closeFn: PropTypes.func,
    modal: PropTypes.bool,
    plain: PropTypes.bool,
    position: PropTypes.string
  }

  return HOC
}

export default withLayer
