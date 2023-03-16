import { Box, Text } from 'grommet'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Markdownz } from '@zooniverse/react-components'

const StyledText = styled(Text)`
  margin: 0;
  padding: 0;
  width: 100%;

  > *:first-child {
    margin-top: 0;
  }
`

export default function HighlighterTask ({
  autoFocus = false,
  disabled = false,
  task,
  updateAnnotation = () => true,
  value
}) {
  return (
    <Box
      direction='column'
    >
      <StyledText as='legend' size='small'>
        <Markdownz>
          {task.instruction}
        </Markdownz>
      </StyledText>
      <span>Highlighter task goes here.</span>
    </Box>
  )
}

HighlighterTask.propTypes = {
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  task: PropTypes.shape({
    help: PropTypes.string,
    instruction: PropTypes.string,
    required: PropTypes.bool,
    taskKey: PropTypes.string,
    type: PropTypes.string
  }).isRequired,
  updateAnnotation: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.shape({
    start: PropTypes.number,
    end: PropTypes.number,
    text: PropTypes.string
  }))
}
