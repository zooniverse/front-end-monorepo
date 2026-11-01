import { useEffect } from 'react'
import { FocusGroup, supportsFocusGroup } from '@microsoft/focusgroup-polyfill'
import {
  DEFAULT_AXIS,
  DEFAULT_DEFINITION,
  DEFAULT_WRAP,
  FOCUSGROUP_ITEM_SELECTOR,
  ITEM_ROLE,
  OWNER_ROLE,
  getFocusgroupDefinition,
  isKeyboardFocusable
} from './polyfillUtils'

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
    const originalTabIndexes = new WeakMap()
    const items = () => Array.from(owner.querySelectorAll(FOCUSGROUP_ITEM_SELECTOR))
      .filter(item => isKeyboardFocusable(item, owner, originalTabIndexes))

    // Native focusgroup support handles keyboard navigation without the
    // polyfill. Keep the property in sync for browsers that expose it.
    const useNativeFocusGroup = nativeFocusGroup || behavior === 'none'
    let focusGroup
    if (!useNativeFocusGroup) {
      // Create an item collection to be managed by FocusGroup.
      // Keyboard navigation is overridden only for this collection.
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
        decorateOwner: (element, ownerBehavior) => {
          if (!element.focusGroup) element.focusGroup = focusgroupDefinition
          if (axis) {
            element.setAttribute('aria-orientation', axis === 'inline' ? 'horizontal' : 'vertical')
          } else {
            element.removeAttribute('aria-orientation')
          }
          if (element.hasAttribute('role')) return
          if (OWNER_ROLE[ownerBehavior]) {
            element.setAttribute('role', OWNER_ROLE[ownerBehavior])
          }
        },
        decorateItem: (item, itemBehavior) => {
          if (ITEM_ROLE[itemBehavior] && !item.hasAttribute('role')) {
            item.setAttribute('role', ITEM_ROLE[itemBehavior])
          }
        }
      })
    }

    const observer = new MutationObserver(() => {
      focusGroup?.update()
    })
    observer.observe(owner, {
      attributes: true,
      attributeFilter: ['class', 'disabled', 'hidden', 'inert', 'style'],
      childList: true,
      subtree: true
    })
    return () => {
      observer.disconnect()
      focusGroup?.disconnect()
    }
  }, [ownerRef, focusgroupDefinition, behavior, wrap, axis, memory, enabled])
}
