import { Markdownz } from '@zooniverse/react-components'
import { Box, Text } from 'grommet'
import { array, arrayOf, bool, object, shape, string } from 'prop-types'
import styled, { css } from 'styled-components'

const StyledBox = styled(Box)`
  img:only-child, svg:only-child {
    ${props => props.theme && css`background: ${props.theme.global.colors.brand};`}
    max-width: 3.75rem;
  }
`

const StyledText = styled(Text)`
  margin: 0;
  padding: 0;
  width: 100%;

  > *:first-child {
    margin-top: 0;
  }
`

function SubjectGroupComparisonTask (props) {
  const {
    annotation,
    className = '',
    disabled = false,
    task,
    theme = {
      global: {
        colors: {}
      }
    }
  } = props
  const { value } = annotation
  function onChange (index, event) {
    if (event.target.checked) annotation.update(index)
  }

  return (
    <StyledBox
      className={className}
      disabled={disabled}
      theme={theme}
    >
      <StyledText as='legend' size='small'>
        <Markdownz>
          {task.question}
        </Markdownz>
      </StyledText>
    </StyledBox>
  )
}

SubjectGroupComparisonTask.propTypes = {
  annotation: shape({
    value: array
  }).isRequired,
  className: string,
  disabled: bool,
  task: shape({
    answers: arrayOf(shape({
      label: string
    })),
    help: string,
    question: string,
    required: bool
  }).isRequired,
  theme: object
}

export default SubjectGroupComparisonTask
