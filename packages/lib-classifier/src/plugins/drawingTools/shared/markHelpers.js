export function focusMark(markNode) {
  // Fixes Firefox bug https://bugzilla.mozilla.org/show_bug.cgi?id=1589164
  // that scrolls to top of page when focus is set on a g element.
  // Note that this only fixes setting focus by calling focus() - it does
  // not prevent scrolling when focus is set by tabbing.

  const hasFocus = markNode === document.activeElement
  if (!hasFocus) {
    const x = scrollX
    const y = scrollY
    markNode?.focus()
    window.scrollTo(x, y)
  }
}

export function focusAndOpenSubTaskPopup(mark, markNode) {
  // Function should only run for finished marks. 
  // This prevents the popup from opening when clicking the undo button
  // while drawing a polygon.

  if (mark?.finished && markNode) {
    focusMark(markNode)
    const markBounds = markNode.getBoundingClientRect()
    mark.setSubTaskVisibility(true, markBounds)
  }
}