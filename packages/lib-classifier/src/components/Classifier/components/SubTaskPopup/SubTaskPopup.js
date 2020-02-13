import React from 'react'
import PropTypes from 'prop-types'
import counterpart from 'counterpart'
import { Box, Paragraph } from 'grommet'
import { Rnd } from 'react-rnd'
import { inject, observer } from 'mobx-react'
import {} from 'prop-types'  // TODO

import taskRegistry from '@plugins/tasks'

// EXPERIMENTAL
// ----------------
import zooTheme from '@zooniverse/grommet-theme'
import styled from 'styled-components'  // TODO: check what's the best way to style this component
const StyledBox = styled(Box)`
  border: 2px solid ${zooTheme.global.colors.brand}
`
// ----------------

import en from './locales/en'

counterpart.registerTranslations('en', en)

function storeMapper (stores) {
  const { activeStepTasks } = stores.classifierStore.workflowSteps
  const [activeDrawingTask] = activeStepTasks.filter(task => task.type === 'drawing')
  const activeMark = (activeDrawingTask && activeDrawingTask.activeMark)
    ? activeDrawingTask.activeMark
    : undefined

  return {
    activeMark,
  }
}

class SubTaskPopup extends React.Component {
  constructor () {
    super()
  }
  
  // TODO: Split render() into various asyncStates

  render () {
    const { activeMark } = this.props

    const ready = true // DEBUG
    const tasks = (activeMark && activeMark.tasks) ? activeMark.tasks : []

    if (tasks.length > 0) {
      return (
        <Rnd
          minWidth={200}
          minHeight={100}
          style={{
            border: `2px solid ${zooTheme.global.colors['light-2']}`,
            backgroundColor: zooTheme.global.colors['light-1'],
          }}
        >
          <StyledBox pad="medium" fill>
            {tasks.map(task => {
              // classifications.addAnnotation(task, value) retrieves any existing task annotation from the store
              // or creates a new one if one doesn't exist.
              // The name is a bit confusing.
              const annotation = activeMark.addAnnotation(task)
              task.setAnnotation(annotation)
              const TaskComponent = observer(taskRegistry.get(task.type).TaskComponent)

              if (annotation && TaskComponent) {
                return (
                  <Box key={task.taskKey}>
                    <TaskComponent
                      disabled={!ready}
                      annotation={annotation}
                      task={task}
                      {...this.props}
                    />
                  </Box>
                )
              }
              
              return (<Paragraph>Task component could not be rendered.</Paragraph>)
            })}
          </StyledBox>
        </Rnd>
      )
    }
    
    return null
  }
}

SubTaskPopup.propTypes = {
  activeMark: PropTypes.object,
}

SubTaskPopup.defaultProps = {
  activeMark: undefined,
}

/*
  Enzyme doesn't support the context API properly yet, so using @withTheme as
  recommended currently doesn't work. So instead, we're exporting the unwrapped
  component for testing, and using the HOC function syntax to export the wrapped
  component.

  https://github.com/styled-components/jest-styled-components/issues/191#issuecomment-465020345
*/
export default inject(storeMapper)(observer(SubTaskPopup))
export { SubTaskPopup }