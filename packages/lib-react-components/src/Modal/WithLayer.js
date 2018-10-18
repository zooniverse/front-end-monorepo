import { Grommet, Layer } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import zooTheme from '@zooniverse/grommet-theme'

function WithLayer (WrappedComponent, theme = zooTheme) {
  function HOC ({ active, closeFn, modal, ...props }) {
    if (!active) {
      return null
    }

    return (
      <Grommet theme={theme}>
        <Layer
          modal={modal}
          onClickOutside={closeFn}
          onEsc={closeFn}
        >
          <WrappedComponent {...props} closeFn={closeFn} />
        </Layer>
      </Grommet>
    )
  }

  HOC.propTypes = {
    active: PropTypes.bool,
    closeFn: PropTypes.func,
    modal: PropTypes.bool
  }

  HOC.defaultProps = {
    active: false,
    modal: true
  }

  return HOC
}

export default WithLayer
