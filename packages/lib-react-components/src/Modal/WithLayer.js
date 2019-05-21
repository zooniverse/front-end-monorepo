import { Layer } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

function withLayer (WrappedComponent) {
  class HOC extends React.Component {
    constructor() {
      super()
      this.state = {
        isBrowser: false
      }
    }

    componentDidMount() {
      if (typeof document !== 'undefined') this.setState({ isBrowser: true })
    }

    render() {
      const { active, className, closeFn, modal, position } = this.props
      return (this.state.isBrowser && active)
        ? (
          <Layer
            className={className}
            modal={modal}
            position={position}
            onClickOutside={closeFn}
            onEsc={closeFn}
          >
            <WrappedComponent {...this.props} />
          </Layer>
        )
        : null
    }
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

export default withLayer
