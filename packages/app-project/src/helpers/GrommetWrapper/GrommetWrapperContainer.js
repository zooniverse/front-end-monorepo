import { Grommet } from 'grommet'
import merge from 'lodash/merge'
import { inject, observer } from 'mobx-react'
import { node, object, oneOf } from 'prop-types'
import React, { Component } from 'react'

import theme from '../theme'

function storeMapper (stores) {
  const { mode } = stores.store.ui
  return {
    mode
  }
}

@inject(storeMapper)
@observer
class GrommetWrapperContainer extends Component {
  mergeThemes () {
    const { mode, theme } = this.props
    console.log('mode', mode)
    return merge({}, theme, { dark: mode === 'dark' })
  }

  render () {
    const { children } = this.props
    const mergedThemes = this.mergeThemes()

    console.log('mergedThemes', mergedThemes)
    return (
      <Grommet theme={mergedThemes} themeMode={(mergedThemes.dark) ? 'dark' : 'light'}>
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

export default GrommetWrapperContainer
