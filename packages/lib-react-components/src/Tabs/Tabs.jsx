import { useEffect, useRef } from 'react'
import { Tabs as GrommetTabs } from 'grommet'
import { polyfill } from '@microsoft/focusgroup-polyfill'

import withThemeContext from '../helpers/withThemeContext'
import tabsTheme from './theme'

function Tabs(props) {
  const root = useRef(null)
  
  useEffect(() => {
    // React 18 doesn't recognise the focusgroup attribute, so we need to add it via the DOM.
    const tabList = root.current.querySelector('[role="tablist"]')
    tabList.setAttribute('focusgroup', 'tablist')
    // make each tabPanel a tab stop.
    const tabPanels = root.current.querySelectorAll('[role="tabpanel"]')
    tabPanels.forEach(panel => panel.setAttribute('tabindex', '0'))
    // Polyfill the tablist for browsers that don't support focusgroup.
    polyfill(tabList)
  }, [])
  return <GrommetTabs ref={root} {...props} />
}

export default withThemeContext(Tabs, tabsTheme)
