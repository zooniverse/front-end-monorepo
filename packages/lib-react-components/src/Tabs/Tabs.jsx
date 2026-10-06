import { useEffect, useRef } from 'react'
import { Tabs as GrommetTabs } from 'grommet'

import withThemeContext from '../helpers/withThemeContext'
import tabsTheme from './theme'

const nativeFocusgroup = typeof HTMLElement !== 'undefined' &&
  ('focusgroup' in HTMLElement.prototype || 'focusGroup' in HTMLElement.prototype)

const KEY_MOVES = {
  ArrowLeft: (index) => index - 1,
  ArrowRight: (index) => index + 1,
  End: (index, count) => count - 1,
  Home: () => 0
}

function enabledTabs(tabList) {
  return [...tabList.querySelectorAll('[role="tab"]')].filter(tab => !tab.disabled)
}

function Tabs(props) {
  const root = useRef(null)

  useEffect(() => {
    // React 18 doesn't recognise the focusgroup attribute, so we need to add it via the DOM.
    root.current.querySelector('[role="tablist"]').setAttribute('focusgroup', 'tablist')
    // make each tabPanel a tab stop.
    root.current.querySelectorAll('[role="tabpanel"]').forEach(panel => panel.setAttribute('tabindex', '0'))
  })

  useEffect(() => {
    if (nativeFocusgroup) return
    const tabList = root.current.querySelector('[role="tablist"]')

    // Roving tabindex for browsers without focusgroup: the selected tab is the one tab stop.
    function roveTabIndex() {
      const tabs = enabledTabs(tabList)
      const current = tabs.find(tab => tab.getAttribute('aria-selected') === 'true') ?? tabs[0]
      tabs.forEach(tab => {
        const tabIndex = tab === current ? '0' : '-1'
        if (tab.getAttribute('tabindex') !== tabIndex) tab.setAttribute('tabindex', tabIndex)
      })
    }

    function onKeyDown(event) {
      const move = KEY_MOVES[event.key]
      const tabs = enabledTabs(tabList)
      const index = tabs.indexOf(document.activeElement)
      if (!move || index < 0) return
      event.preventDefault()
      tabs.at(move(index, tabs.length) % tabs.length).focus()
    }

    roveTabIndex()
    const observer = new MutationObserver(roveTabIndex)
    observer.observe(tabList, { attributes: true, attributeFilter: ['aria-selected', 'disabled'], childList: true, subtree: true })
    tabList.addEventListener('keydown', onKeyDown)
    return () => {
      observer.disconnect()
      tabList.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return <GrommetTabs ref={root} {...props} />
}

export default withThemeContext(Tabs, tabsTheme)
