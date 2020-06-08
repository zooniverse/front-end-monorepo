import { Layer } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

// All modals should have box-shadow, but we do not set this as the standard for Layer in the theme
// Because layer can be used without modality
const StyledLayer = styled(Layer)`
  box-shadow: 0px 10px 20px #000030;
`

function WithLayer (WrappedComponent) {
  function HOC ({ active, className, closeFn, modal, position, ...props }) {
    if (!active) {
      return null
    }

    return (
      <StyledLayer
        className={className}
        modal={modal}
        position={position}
        onClickOutside={closeFn}
        onEsc={closeFn}
      >
        <WrappedComponent {...props} closeFn={closeFn} />
      </StyledLayer>
    )
  }

  HOC.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    closeFn: PropTypes.func,
    modal: PropTypes.bool,
    position: PropTypes.string
  }

  HOC.defaultProps = {
    active: false,
    className: '',
    modal: true,
    position: 'center'
  }

  return HOC
}

export default WithLayer
