import { Grommet } from 'grommet'
import merge from 'lodash/merge'
import { inject, observer } from 'mobx-react'
import { node, object, oneOf } from 'prop-types'
import { Component } from 'react'

import theme from '../theme'

function storeMapper (stores) {
  const { mode } = stores.store.ui
  return {
    mode
  }
}

class GrommetWrapperContainer extends Component {
  mergeThemes () {
    const { mode, theme } = this.props
    return merge({}, theme, { dark: mode === 'dark' })
  }

  render () {
    const { children, mode } = this.props
    const mergedThemes = this.mergeThemes()

    return (
      <Grommet
        background={{
          dark: 'dark-1',
          light: 'light-1'
        }}
        theme={mergedThemes}
        themeMode={mode}
      >
        {children}
      </Grommet>
    )
  }
}

GrommetWrapperContainer.propTypes = {
  children: node,
  mode: oneOf(['dark', 'light']),
  theme: object
}

GrommetWrapperContainer.defaultProps = {
  mode: 'light',
  theme
}

export default inject(storeMapper)(observer(GrommetWrapperContainer))
