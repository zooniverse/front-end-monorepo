import React from 'react'
import counterpart from 'counterpart'
import { Box, Paragraph } from 'grommet'
import { Rnd } from 'react-rnd'
import { inject, observer } from 'mobx-react'
import {} from 'prop-types'  // TODO

import SingleChoiceTask from '@plugins/tasks/SingleChoiceTask'

import styled from 'styled-components'  // TODO: check what's the best way to style this component
import zooTheme from '@zooniverse/grommet-theme'

// EXPERIMENTAL
// ----------------
import taskRegistry from '@plugins/tasks'
const StyledBox = styled(Box)`
  border: 2px solid ${zooTheme.global.colors.brand}
`
// ----------------

import en from './locales/en'

counterpart.registerTranslations('en', en)

function storeMapper (stores) {
  
  const { activeMark } = stores.classifierStore.subTaskPopup
  const { addAnnotation } = stores.classifierStore.classifications

  // TODO: do we need these?
  // const { activeStepTasks } = stores.classifierStore.workflowSteps
  // const [activeDrawingTask] = activeStepTasks.filter(task => task.type === 'drawing')
  // const activeTool = activeDrawingTask ? activeDrawingTask.activeTool : null
  // const disabled = activeTool ? activeTool.disabled : false
  // const { marks } = activeDrawingTask || {}
  
  console.log('+++ ACTIVE MARK \n', activeMark)
  
  return {
    activeMark,
    addAnnotation,
  }
}

class SubTaskPopup extends React.Component {
  constructor () {
    super()
  }
  
  // TODO: Split render() into various asyncStates

  render () {
    // EXPERIMENTAL:
    // Create a hardcoded simple task. Does it work? Very yes.
    const task = SingleChoiceTask.TaskModel.create({
      answers: [{ label: 'yes' }, { label: 'no' }],
      question: 'Is there a cat?',
      required: true,
      taskKey: 'init',
      type: 'single'
    })
    
    const { addAnnotation, activeMark } = this.props
    
    const ready = true // DEBUG
    const tasks = (activeMark && activeMark.tasks) ? activeMark.tasks : []
    
    
    console.log('+++ ACTIVE MARK: ', activeMark)
    
    //const annotation = addAnnotation(task)
    //task.setAnnotation(annotation)
    //const TaskComponent = observer(taskRegistry.get(task.type).TaskComponent)
    
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
              const annotation = addAnnotation(task)
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

SubTaskPopup.propTypes = {}

SubTaskPopup.defaultProps = {}

/*
  Enzyme doesn't support the context API properly yet, so using @withTheme as
  recommended currently doesn't work. So instead, we're exporting the unwrapped
  component for testing, and using the HOC function syntax to export the wrapped
  component.

  https://github.com/styled-components/jest-styled-components/issues/191#issuecomment-465020345
*/
export default inject(storeMapper)(observer(SubTaskPopup))
export { SubTaskPopup }
