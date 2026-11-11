/*
 * Portions of this file are derived from @microsoft/focusgroup-polyfill.
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License:
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

export const FOCUSGROUP_ITEM_SELECTOR = [
  'a',
  'area',
  'audio[controls]',
  'button',
  'input',
  'select',
  'textarea',
  'video[controls]',
  '[contenteditable]',
  '[tabindex]'
].join(', ')

export const DEFAULT_DEFINITION = {
  behavior: null,
  memory: true
}

export const DEFAULT_WRAP = {
  none: false,
  toolbar: false,
  tablist: true,
  radiogroup: true,
  listbox: false,
  menu: true,
  menubar: true
}

export const DEFAULT_AXIS = {
  toolbar: 'inline',
  tablist: 'inline',
  listbox: 'block',
  menu: 'block',
  menubar: 'inline'
}

export const OWNER_ROLE = {
  toolbar: 'toolbar',
  tablist: 'tablist',
  radiogroup: 'radiogroup',
  listbox: 'listbox',
  menu: 'menu',
  menubar: 'menubar'
}

export const ITEM_ROLE = {
  tablist: 'tab',
  radiogroup: 'radio',
  listbox: 'option',
  menu: 'menuitem',
  menubar: 'menuitem'
}

export function getFocusgroupDefinition({ behavior, wrap, axis, memory }) {
  return [
    behavior,
    axis !== DEFAULT_AXIS[behavior] ? axis : null,
    wrap !== DEFAULT_WRAP[behavior] ? (wrap ? 'wrap' : 'nowrap') : null,
    memory ? null : 'nomemory'
  ].filter(Boolean).join(' ')
}

function isVisible(element, owner) {
  if (typeof element.checkVisibility === 'function') {
    return element.checkVisibility({
      visibilityProperty: true,
      contentVisibilityAuto: true
    })
  }

  for (let ancestor = element; ancestor; ancestor = ancestor.parentElement) {
    const { display, visibility, contentVisibility } = window.getComputedStyle(ancestor)
    if (display === 'none' || ['hidden', 'collapse'].includes(visibility) || contentVisibility === 'hidden') {
      return false
    }
    if (ancestor === owner) break
  }

  return true
}

export function isKeyboardFocusable(element, owner, originalTabIndexes) {
  if (!originalTabIndexes.has(element)) originalTabIndexes.set(element, element.tabIndex)
  const tabIndex = originalTabIndexes.get(element)
  const isContentEditable = element.isContentEditable
  const isControlledMedia = element.matches(':is(audio, video)[controls]')
  const focusable = isContentEditable || isControlledMedia || tabIndex > -1
  const excluded = element.disabled || element.hasAttribute('disabled') ||
    element.matches(':is(a, area):not([href])') || element.inert ||
    element.matches(':is(audio, video):not([controls])') || !isVisible(element, owner)

  return focusable && !excluded
}

export function createFocusGroupItemCollection(getEligibleItems) {
  let decoratedItems = []

  return {
    decorate() {
      decoratedItems = getEligibleItems()
    },
    items() {
      return decoratedItems.map(element => ({ element }))
    },
    undecorate() {
      decoratedItems = []
    },
    first() {
      return decoratedItems[0] ?? null
    },
    last() {
      return decoratedItems[decoratedItems.length - 1] ?? null
    },
    next(current) {
      return decoratedItems[decoratedItems.indexOf(current) + 1] ?? null
    },
    previous(current) {
      return decoratedItems[decoratedItems.indexOf(current) - 1] ?? null
    },
    contains(element) {
      return decoratedItems.includes(element)
    }
  }
}

export function createAttributeManager(element) {
  const originalAttributes = new Map()

  function set(name, value) {
    if (!originalAttributes.has(name)) {
      originalAttributes.set(name, {
        present: element.hasAttribute(name),
        value: element.getAttribute(name),
        appliedValue: value
      })
    } else {
      originalAttributes.get(name).appliedValue = value
    }

    if (value === null) element.removeAttribute(name)
    else element.setAttribute(name, value)
  }

  function restore(name) {
    const original = originalAttributes.get(name)
    if (!original) return

    const stillApplied = original.appliedValue === null
      ? !element.hasAttribute(name)
      : element.getAttribute(name) === original.appliedValue

    if (stillApplied) {
      if (original.present) element.setAttribute(name, original.value)
      else element.removeAttribute(name)
    }
    originalAttributes.delete(name)
  }

  return {
    set,
    restore,
    restoreAll() {
      Array.from(originalAttributes.keys()).forEach(restore)
    }
  }
}

export function createRoleDecorator(roles) {
  const inferredRoles = new WeakMap()

  return function decorateRole(element, behavior) {
    const role = roles[behavior]
    if (role && !element.hasAttribute('role')) {
      element.setAttribute('role', role)
      inferredRoles.set(element, role)
      return
    }

    if (!behavior) {
      const inferredRole = inferredRoles.get(element)
      if (inferredRole && element.getAttribute('role') === inferredRole) {
        element.removeAttribute('role')
      }
      inferredRoles.delete(element)
    }
  }
}
