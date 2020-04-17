import counterpart from 'counterpart'
import { Box, Text } from 'grommet'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Markdownz } from '@zooniverse/react-components'
import TaskInput from '../../components/TaskInput'
import InputIcon from '../../components/InputIcon'
import Graph2dRangeXIcon from './components/Graph2dRangeXIcon'

import en from './locales/en'
counterpart.registerTranslations('en', en)

const StyledText = styled(Text)`
  margin: 0;
  padding: 0;
  width: 100%;

  > *:first-child {
    margin-top: 0;
  }
`

function DataVisAnnotationTask (props) {
  const { task } = props
  const { setActiveTool } = task
  function onChange (index, event) {
    if (event.target.checked) {
      setActiveTool(index)
    }
  }

  // TODO: Add in the status count along with the validations to not go over the max allowed

  return (
    <Box>
      <StyledText size='small' tag='legend'>
        <Markdownz>
          {task.instruction}
        </Markdownz>
      </StyledText>

      {task.tools.map((tool, index) => {
        const checked = task.activeToolIndex === index
        return (
          <TaskInput
            checked={checked}
            index={index}
            key={`${task.taskKey}_${index}`}
            label={tool.label}
            labelIcon={<InputIcon icon={<Graph2dRangeXIcon />} color='white' />}
            name='data-vis-annotation-tool'
            onChange={event => onChange(index, event)}
            required={task.required}
            type='radio'
          />
        )
      })}
    </Box>
  )
}

DataVisAnnotationTask.defaultProps = {
  task: {}
}

DataVisAnnotationTask.propTypes = {
  task: PropTypes.shape({
    help: PropTypes.string,
    instruction: PropTypes.string,
    required: PropTypes.bool
  })
}

export default DataVisAnnotationTask
