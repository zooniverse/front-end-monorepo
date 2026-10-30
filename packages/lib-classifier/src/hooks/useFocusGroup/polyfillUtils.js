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
