import { Grommet, Tabs as GrommetTabs } from 'grommet'
import merge from 'lodash/merge'
import { object } from 'prop-types'
import React from 'react'
import { withTheme } from 'styled-components'

import tabsTheme from './theme'

function Tabs (props) {
  const mergedThemes = merge({}, props.theme, tabsTheme)
  return (
    <Grommet theme={mergedThemes}>
      <GrommetTabs {...props} />
    </Grommet>
  )
}

Tabs.propTypes = {
  theme: object
}

export default withTheme(Tabs)
