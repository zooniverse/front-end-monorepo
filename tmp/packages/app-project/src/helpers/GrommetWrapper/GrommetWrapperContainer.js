import zooTheme from '@zooniverse/grommet-theme'
import { Grommet, base as baseTheme } from 'grommet'
import merge from 'lodash/merge'
import { inject, observer } from 'mobx-react'
import { node, object, oneOf } from 'prop-types'
import React, { Component } from 'react'

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
    return merge({}, baseTheme, theme, { dark: mode === 'dark' })
  }

  render () {
    const { children } = this.props
    const mergedThemes = this.mergeThemes()

    return (
      <Grommet theme={mergedThemes}>
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
  theme: zooTheme
}

export default GrommetWrapperContainer
