import { Layer } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

// All modals should have box-shadow, but we do not set this as the standard for Layer in the theme
// Because layer can be used without modality
const StyledLayer = styled(Layer)`
  box-shadow: 0px 10px 20px #000030;
`

function withLayer (WrappedComponent) {
  function HOC (props) {
    const {
      active = false,
      animate = false,
      className = '',
      closeFn = () => true,
      modal = true,
      plain = false,
      position = 'center', 
      ...rest
    } = props

    if (!active) {
      return null
    }

    return (
      <StyledLayer
        animate={animate}
        className={className}
        modal={modal}
        plain={plain}
        position={position}
        onClickOutside={closeFn}
        onEsc={closeFn}
      >
        <WrappedComponent closeFn={closeFn} {...rest} />
      </StyledLayer>
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
