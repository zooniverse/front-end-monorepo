import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import { Rnd } from 'react-rnd'  // Used to create the draggable, resizable "popup" component
import { Box, Button, Paragraph } from 'grommet'
import { CloseButton } from '@zooniverse/react-components'
import SaveButton from './components/SaveButton'

import SVGContext from '@plugins/drawingTools/shared/SVGContext'
import taskRegistry from '@plugins/tasks'
import styled, { css } from 'styled-components'

import zooTheme from '@zooniverse/grommet-theme'

// Container sits one level below the (otherwise transparent) React-Rnd draggable/resizable component
const StyledContainer = styled(Box)`
  overflow: auto;
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);

  ${props => props.theme.dark ? css`
    background: ${props.theme.global.colors['dark-1']};
    border: 1px solid ${props.theme.global.colors['dark-6']}
  ` : css`
    background: ${props.theme.global.colors['neutral-6']}
    border: 1px solid ${props.theme.global.colors['light-1']}
  `}
`

// Prevent tasks from screwing up presentation when container is resized.
const TaskBox = styled(Box)`
  overflow: auto;
  cursor: auto;
`

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
          key={activeMark.id}
          minWidth={100}
          minHeight={100}
          default={defaultPosition}
          cancel=".subtaskpopup-element-that-ignores-drag-actions"
        >
          <StyledContainer pad="xsmall" fill>
            <Box>
              <CloseButton
                alignSelf='end'
                onClick={() => setSubTaskVisibility(false)}
              />
            </Box>
            
            {tasks.map(task => {
              // classifications.addAnnotation(task, value) retrieves any existing task annotation from the store
              // or creates a new one if one doesn't exist.
              // The name is a bit confusing.
              const annotation = activeMark.addAnnotation(task)
              task.setAnnotation(annotation)
              const TaskComponent = observer(taskRegistry.get(task.type).TaskComponent)

              if (annotation && TaskComponent) {
                return (
                  <TaskBox
                    key={task.taskKey}
                    pad="xsmall"
                    className="subtaskpopup-element-that-ignores-drag-actions"
                  >
                    <TaskComponent
                      disabled={!ready}
                      annotation={annotation}
                      task={task}
                      {...this.props}
                    />
                  </TaskBox>
                )
              }
              
              return (
                <Box pad="xsmall">
                  <Paragraph>Task component could not be rendered.</Paragraph>
                </Box>
              )
            })}
                       
            <Box pad="xsmall">
              <SaveButton
                onClick={() => setSubTaskVisibility(false)}
                disabled={false}
              />
            </Box>
          </StyledContainer>
        </Rnd>
      )
    }
    
    return null
  }
}

SubTaskPopup.propTypes = {
  activeMark: PropTypes.object,
  subTaskMarkBounds: PropTypes.object,
  subTaskVisibility: PropTypes.bool,
  setSubTaskVisibility: PropTypes.func,
}

SubTaskPopup.defaultProps = {
  activeMark: undefined,
  subTaskMarkBounds: undefined,
  subTaskVisibility: false,
  setSubTaskVisibility: () => {},
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
export { SubTaskPopup, StyledContainer, TaskBox }