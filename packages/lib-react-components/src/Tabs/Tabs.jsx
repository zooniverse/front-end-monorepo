import { useEffect, useRef } from 'react'
import { Tabs as GrommetTabs } from 'grommet'

import useRovingTabIndex from '../hooks/useRovingTabIndex.js'
import withThemeContext from '../helpers/withThemeContext'
import tabsTheme from './theme'

function Tabs(props) {
  const root = useRef(null)

  useRovingTabIndex(root, '[role="tablist"]')

  useEffect(() => {
    // make each tabPanel a tab stop.
    root.current.querySelectorAll('[role="tabpanel"]').forEach(panel => panel.setAttribute('tabindex', '0'))
  })

  return <GrommetTabs ref={root} {...props} />
}

export default withThemeContext(Tabs, tabsTheme)
