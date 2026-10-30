import { useEffect } from 'react'
import { FocusGroup, supportsFocusGroup } from '@microsoft/focusgroup-polyfill'

const DEFAULT_DEFINITION = {
  behavior: null,
  memory: true
}

const DEFAULT_WRAP = {
  none: false,
  toolbar: false,
  tablist: true,
  radiogroup: true,
  listbox: false,
  menu: true,
  menubar: true
}

const DEFAULT_AXIS = {
  toolbar: 'inline',
  tablist: 'inline',
  listbox: 'block',
  menu: 'block',
  menubar: 'inline'
}

const OWNER_ROLE = {
  toolbar: 'toolbar',
  tablist: 'tablist',
  radiogroup: 'radiogroup',
  listbox: 'listbox',
  menu: 'menu',
  menubar: 'menubar'
}

const ITEM_ROLE = {
  tablist: 'tab',
  radiogroup: 'radio',
  listbox: 'option',
  menu: 'menuitem',
  menubar: 'menuitem'
}

function getFocusgroupDefinition({ behavior, wrap, axis, memory }) {
  return [
    behavior,
    axis !== DEFAULT_AXIS[behavior] ? axis : null,
    wrap !== DEFAULT_WRAP[behavior] ? (wrap ? 'wrap' : 'nowrap') : null,
    memory ? null : 'nomemory'
  ].filter(Boolean).join(' ')
}

export default function useFocusGroup(ownerRef, options = {}, enabled = true) {
  const behavior = options.behavior ?? DEFAULT_DEFINITION.behavior
  const definition = {
    ...DEFAULT_DEFINITION,
    ...options,
    behavior,
    wrap: options.wrap ?? DEFAULT_WRAP[behavior] ?? false,
    axis: options.axis ?? DEFAULT_AXIS[behavior]
  }
  const { wrap, axis, memory } = definition
  const focusgroupDefinition = getFocusgroupDefinition(definition)

  useEffect(function addFocusGroup() {
    if (!enabled) return
    const owner = ownerRef.current
    if (!owner) return
    const nativeFocusGroup = supportsFocusGroup()

    owner.setAttribute('focusgroup', focusgroupDefinition)
    if (!nativeFocusGroup) {
      if (axis) {
        owner.setAttribute('aria-orientation', axis === 'inline' ? 'horizontal' : 'vertical')
      } else {
        owner.removeAttribute('aria-orientation')
      }
    }
    if (!nativeFocusGroup && OWNER_ROLE[behavior]) {
      owner.setAttribute('role', OWNER_ROLE[behavior])
    }
    if (!owner.focusGroup) owner.focusGroup = focusgroupDefinition

    const items = () => Array.from(owner.querySelectorAll('button:not(:disabled)'))
    const applyItemRoles = () => {
      if (!nativeFocusGroup && ITEM_ROLE[behavior]) {
        items().forEach(item => item.setAttribute('role', ITEM_ROLE[behavior]))
      }
    }
    applyItemRoles()

    // Native focusgroup support handles keyboard navigation without the
    // polyfill. Keep the property in sync for browsers that expose it.
    const useNativeFocusGroup = nativeFocusGroup || behavior === 'none'
    let focusGroup
    if (!useNativeFocusGroup) {
      // Avoid the polyfill's tabindex observer because Grommet Layers temporarily
      // rewrite tabindex across the page and can break roving focus when closed.
      const itemCollection = {
        items: () => items().map(element => ({ element })),
        first: () => items()[0] ?? null,
        last: () => {
          const currentItems = items()
          return currentItems[currentItems.length - 1] ?? null
        },
        next: current => items()[items().indexOf(current) + 1] ?? null,
        previous: current => items()[items().indexOf(current) - 1] ?? null,
        contains: element => items().includes(element)
      }
      focusGroup = new FocusGroup(owner, itemCollection, {
        definition: { behavior, wrap, axis, memory },
        decorateItem: (item, itemBehavior) => {
          if (ITEM_ROLE[itemBehavior]) item.setAttribute('role', ITEM_ROLE[itemBehavior])
        }
      })
    }

    const observer = new MutationObserver(() => {
      applyItemRoles()
      focusGroup?.update()
    })
    observer.observe(owner, {
      attributes: true,
      attributeFilter: ['disabled'],
      childList: true,
      subtree: true
    })
    return () => {
      observer.disconnect()
      focusGroup?.disconnect()
    }
  }, [ownerRef, focusgroupDefinition, behavior, wrap, axis, memory, enabled])
}
