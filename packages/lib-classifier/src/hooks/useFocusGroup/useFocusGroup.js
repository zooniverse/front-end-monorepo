import { useCallback, useEffect, useState } from 'react'
import { FocusGroup, supportsFocusGroup } from '@microsoft/focusgroup-polyfill'
import {
  DEFAULT_AXIS,
  DEFAULT_DEFINITION,
  DEFAULT_WRAP,
  FOCUSGROUP_ITEM_SELECTOR,
  ITEM_ROLE,
  OWNER_ROLE,
  createAttributeManager,
  createFocusGroupItemCollection,
  createRoleDecorator,
  getFocusgroupDefinition,
  isKeyboardFocusable
} from './polyfillUtils'

export default function useFocusGroup(options = {}, enabled = true) {
  const [owner, setOwner] = useState(null)
  const ownerRef = useCallback(node => setOwner(node), [])
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
    if (!owner) return
    const nativeFocusGroup = supportsFocusGroup()

    const ownerAttributes = createAttributeManager(owner)
    ownerAttributes.set('focusgroup', focusgroupDefinition)
    const originalTabIndexes = new WeakMap()
    const getEligibleItems = () => Array.from(owner.querySelectorAll(FOCUSGROUP_ITEM_SELECTOR))
      .filter(item => (
        item.closest('[focusgroup]') === owner &&
        isKeyboardFocusable(item, owner, originalTabIndexes)
      ))

    // Native focusgroup support handles keyboard navigation without the
    // polyfill. Keep the property in sync for browsers that expose it.
    const useNativeFocusGroup = nativeFocusGroup || behavior === 'none'
    let focusGroup
    let assignedOwnerFocusGroup = false
    const originalOwnerFocusGroupDescriptor = Object.getOwnPropertyDescriptor(owner, 'focusGroup')
    if (!useNativeFocusGroup) {
      // Create an item collection to be managed by FocusGroup.
      // Keyboard navigation is overridden only for this collection.
      const itemCollection = createFocusGroupItemCollection(getEligibleItems)
      const decorateOwnerRole = createRoleDecorator(OWNER_ROLE)
      const decorateItemRole = createRoleDecorator(ITEM_ROLE)
      focusGroup = new FocusGroup(owner, itemCollection, {
        definition: { behavior, wrap, axis, memory },
        decorateOwner: (element, ownerBehavior) => {
          if (!element.focusGroup) {
            element.focusGroup = focusgroupDefinition
            assignedOwnerFocusGroup = true
          }
          ownerAttributes.set('aria-orientation', axis ? (axis === 'inline' ? 'horizontal' : 'vertical') : null)
          decorateOwnerRole(element, ownerBehavior)
        },
        decorateItem: (item, itemBehavior) => {
          decorateItemRole(item, itemBehavior)
        }
      })
    }

    const observer = new MutationObserver(() => {
      focusGroup?.update()
    })
    observer.observe(owner, {
      attributes: true,
      attributeFilter: ['class', 'disabled', 'focusgroup', 'hidden', 'inert', 'style'],
      childList: true,
      subtree: true
    })
    return () => {
      observer.disconnect()
      if (focusGroup) {
        focusGroup.update({ definition: { behavior: null } })
      }
      focusGroup?.disconnect()
      ownerAttributes.restoreAll()
      if (assignedOwnerFocusGroup && owner.focusGroup === focusgroupDefinition) {
        if (originalOwnerFocusGroupDescriptor) {
          Object.defineProperty(owner, 'focusGroup', originalOwnerFocusGroupDescriptor)
        } else {
          delete owner.focusGroup
        }
      }
    }
  }, [owner, focusgroupDefinition, behavior, wrap, axis, memory, enabled])

  return ownerRef
}
