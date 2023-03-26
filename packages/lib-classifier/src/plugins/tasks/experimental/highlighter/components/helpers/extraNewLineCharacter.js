// in Edge and IE, when highlighting a word at the end of a line
// sometimes an extra character is added to the range.endOffset value

export default function extraNewLineCharacter(range) {
  const content = range.startContainer.textContent
  const selectedText = range.toString()
  let { endOffset } = range
  if (content[range.endOffset - 1] !== selectedText[-1] && content[range.endOffset - 1] === '\n') {
    endOffset = range.endOffset - 1
  }
  return endOffset
}
