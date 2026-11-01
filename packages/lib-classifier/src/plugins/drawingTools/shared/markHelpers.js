export function focusAndOpenSubTaskPopup(mark, markNode) {
  // Function should only run for finished marks. 
  // This prevents the popup from opening when clicking the undo button
  // while drawing a polygon.

  if (mark?.finished && markNode) {
    markNode.focus()
    const markBounds = markNode.getBoundingClientRect()
    mark.setSubTaskVisibility(true, markBounds)
  }
}