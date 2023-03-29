export default function selectableArea(selection, range, offset, start, end) {
  const spansNodes = range.startContainer !== range.endContainer
  const noAreaSelected = start === end
  const subjectSelection = selection.anchorNode.parentNode.parentNode.ariaLabel?.startsWith('Subject')
  const isSelectable = !spansNodes && !noAreaSelected && subjectSelection
  return isSelectable
}
