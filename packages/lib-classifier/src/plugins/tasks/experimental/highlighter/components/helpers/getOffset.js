export default function getOffset(selection) {
  const { anchorNode } = selection
  const { parentNode } = anchorNode
  let start = 0
  const nodeArray = parentNode.childNodes
  for (let node of nodeArray) {
    if (node.nodeType !== 8 && node !== anchorNode) {
      const text = node.textContent
      start += text?.length || 0
    }
    if (node === anchorNode) {
      break
    }
  }
  return start
}
