import { useEffect } from 'react'

const nativeFocusgroup = typeof HTMLElement !== 'undefined' &&
  ('focusgroup' in HTMLElement.prototype || 'focusGroup' in HTMLElement.prototype)

const FOCUSABLE = 'a[href], button, input, select, textarea, [tabindex]'

const KEY_MOVES = {
  ArrowLeft: (index) => index - 1,
  ArrowRight: (index) => index + 1,
  End: (index, count) => count - 1,
  Home: () => 0
}

function enabledTabs(tabList) {
  return [...tabList.querySelectorAll(FOCUSABLE)].filter(tab => !tab.disabled)
}

export default function useRovingTabIndex(ref, selector) {
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const tabList = selector ? root.querySelector(selector) : root
    if (!tabList) return

    // React 18 doesn't recognise the focusgroup attribute, so we need to add it via the DOM.
    tabList.setAttribute('focusgroup', 'tablist')
    if (nativeFocusgroup) return

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
  }, [ref, selector])
}
