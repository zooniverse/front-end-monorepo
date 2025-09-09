import { Paragraph } from 'grommet'
import { arrayOf, oneOfType, string } from 'prop-types'

function TooltipText (props) {
  const { text } = props
  const textArray = Array.isArray(text) ? text : [text]
  const isLastElement = index => isLastElementOfArray(index, textArray)

  return (
    <>
      {textArray.map((line, index) =>
        <Paragraph
          key={`TooltipText_Line${index}`}
          margin={{
            bottom: isLastElement(index) ? 'none' : 'xsmall',
            top: 'none'
          }}
          size='small'
        >
          {line}
        </Paragraph>
      )}
    </>
  )
}

function isLastElementOfArray (index, array) {
  return (index + 1) === array.length
}

TooltipText.propTypes = {
  text: oneOfType([
    string,
    arrayOf(string)
  ]).isRequired
}

export default TooltipText
