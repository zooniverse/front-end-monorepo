import React from 'react'
import counterpart from 'counterpart'
import { Box } from 'grommet'
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
  const { activeStepTasks } = stores.classifierStore.workflowSteps
  
  const [activeDrawingTask] = activeStepTasks.filter(task => task.type === 'drawing')
  // TODO: do we need this?  const activeTool = activeDrawingTask ? activeDrawingTask.activeTool : null
  // TODO: do we need this?  const disabled = activeTool ? activeTool.disabled : false
  const { marks } = activeDrawingTask || {}
  
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
    
    const { addAnnotation } = this.props
    
    const ready = true // DEBUG
    
    const annotation = addAnnotation(task)
    task.setAnnotation(annotation)
    const TaskComponent = observer(taskRegistry.get(task.type).TaskComponent)
    
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
          <TaskComponent
            disabled={!ready}
            annotation={annotation}
            task={task}
            {...this.props}
          />
        </StyledBox>
      </Rnd>
    )
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
