import { Markdownz, pxToRem } from '@zooniverse/react-components'
import { Box, Text } from 'grommet'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import TaskInput from '../../components/TaskInput'

const maxWidth = pxToRem(60)
const StyledBox = styled(Box)`
  img:only-child, svg:only-child {
    ${props => props.theme && css`background: ${props.theme.global.colors.brand};`}
    max-width: ${maxWidth};
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
    className,
    disabled,
    task,
    theme
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

SubjectGroupComparisonTask.defaultProps = {
  className: '',
  disabled: false,
  theme: {
    global: {
      colors: {}
    }
  }
}

SubjectGroupComparisonTask.propTypes = {
  annotation: PropTypes.shape({
    update: PropTypes.func,
    value: PropTypes.array
  }).isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  task: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string
    })),
    help: PropTypes.string,
    question: PropTypes.string,
    required: PropTypes.bool
  }).isRequired,
  theme: PropTypes.object
}

export default SubjectGroupComparisonTask
