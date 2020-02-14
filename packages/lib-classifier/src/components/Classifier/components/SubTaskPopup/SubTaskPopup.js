import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import counterpart from 'counterpart'
import { Box, Button, Paragraph } from 'grommet'
import { Rnd } from 'react-rnd'
import { inject, observer } from 'mobx-react'
import {} from 'prop-types'  // TODO
import SVGContext from '@plugins/drawingTools/shared/SVGContext'

import taskRegistry from '@plugins/tasks'

// EXPERIMENTAL
// ----------------
import zooTheme from '@zooniverse/grommet-theme'
import styled from 'styled-components'  // TODO: check what's the best way to style this component
const StyledContainer = styled(Box)`
  background: white;
  overflow: auto;
`
const XButton = styled(Button)`

`
// ----------------

import en from './locales/en'

counterpart.registerTranslations('en', en)

function storeMapper (stores) {
  const { activeStepTasks } = stores.classifierStore.workflowSteps
  const drawingTasks = activeStepTasks.filter(task => task.type === 'drawing')
  const activeDrawingTask = (drawingTasks.length > 0) ? drawingTasks[0] : {}
  
  const {
    activeMark,
    subTaskMarkBounds,
    subTaskVisibility,
    setSubTaskVisibility,
  } = activeDrawingTask
  
  return {
    activeMark,
    subTaskMarkBounds,
    subTaskVisibility,
    setSubTaskVisibility,
  }
}

class SubTaskPopup extends React.Component {
  constructor () {
    super()
  }
  
  // TODO: Split render() into various asyncStates?

  render () {
    const {
      activeMark,
      subTaskMarkBounds,
      subTaskVisibility,
      setSubTaskVisibility,
    } = this.props
    const { svg } = this.context
    
    const ready = true // TODO: check with TaskArea/components/Tasks/Tasks.js
    const tasks = (activeMark && activeMark.tasks) ? activeMark.tasks : []
    
    // Calculate default position
    let x = 0, y = 0;
    const svgBounds = svg && svg.getBoundingClientRect()

    console.log('+++ BOUNDS:\n', svgBounds, '\n', subTaskMarkBounds)
    if (svgBounds && subTaskMarkBounds) {
      const markX = subTaskMarkBounds.x || 0
      const markY = subTaskMarkBounds.y || 0
      const markWidth = subTaskMarkBounds.width || 0
      const markHeight = subTaskMarkBounds.height || 0
      
      const svgX = svgBounds.x || 0
      const svgY = svgBounds.y || 0
      
      x = markX + markWidth * 0.5 - svgX
      y = markY + markHeight * 0.5 - svgY
      
    }
    
    const defaultPosition = { x, y }

    if (subTaskVisibility && tasks.length > 0) {
      return (
        <Rnd
          minWidth={100}
          minHeight={100}
          default={defaultPosition}
        >
          <StyledContainer pad="medium" fill>
            
            <XButton onClick={() => setSubTaskVisibility(false)}>X</XButton>
            
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
          </StyledContainer>
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

SubTaskPopup.contextType = SVGContext

/*
  Enzyme doesn't support the context API properly yet, so using @withTheme as
  recommended currently doesn't work. So instead, we're exporting the unwrapped
  component for testing, and using the HOC function syntax to export the wrapped
  component.

  https://github.com/styled-components/jest-styled-components/issues/191#issuecomment-465020345
*/
export default inject(storeMapper)(observer(SubTaskPopup))
export { SubTaskPopup }