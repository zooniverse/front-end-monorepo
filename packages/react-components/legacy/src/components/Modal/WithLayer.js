import { Grommet, Layer } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import zooTheme from '@zooniverse/grommet-theme'

function WithLayer (WrappedComponent, theme = zooTheme) {
  function HOC ({ active, closeFn, ...props }) {
    if (!active) {
      return null
    }

    return (
      <Grommet theme={theme}>
        <Layer
          onClickOutside={closeFn}
          onEsc={closeFn}
          plain
        >
          <WrappedComponent {...props} closeFn={closeFn} />
        </Layer>
      </Grommet>
    )
  }

  HOC.propTypes = {
    active: PropTypes.bool,
    closeFn: PropTypes.func
  }

  HOC.defaultProps = {
    active: false
  }

  return HOC
}

export default WithLayer
