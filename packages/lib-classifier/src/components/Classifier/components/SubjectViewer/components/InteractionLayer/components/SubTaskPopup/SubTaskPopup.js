import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import { Rnd } from 'react-rnd' // Used to create the draggable, resizable "popup" component
import { Box, Layer, Paragraph } from 'grommet'
import { CloseButton } from '@zooniverse/react-components'
import SaveButton from './components/SaveButton'

import taskRegistry from '@plugins/tasks'
import styled, { css } from 'styled-components'

// Container sits one level below the (otherwise transparent) React-Rnd draggable/resizable component
const StyledContainer = styled(Box)`
  overflow: auto;
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);

  ${props => props.theme.dark ? css`
    background: ${props.theme.global.colors['dark-1']};
    border: 1px solid ${props.theme.global.colors['dark-6']};
  ` : css`
    background: ${props.theme.global.colors['neutral-6']};
    border: 1px solid ${props.theme.global.colors['light-1']};
  `}
`

// Prevent tasks from screwing up presentation when container is resized.
const TaskBox = styled(Box)`
  overflow: auto;
  cursor: auto;
`

const MIN_POPUP_WIDTH = 100
const MIN_POPUP_HEIGHT = 100

function storeMapper (stores) {
  const { activeStepTasks } = stores.classifierStore.workflowSteps
  const [activeInteractionTask] = activeStepTasks.filter(task => task.type === 'drawing' || task.type === 'transcription')

  const {
    activeMark,
    subTaskMarkBounds,
    subTaskVisibility,
    setSubTaskVisibility
  } = activeInteractionTask

  return {
    activeMark,
    subTaskMarkBounds,
    subTaskVisibility,
    setSubTaskVisibility
  }
}

class SubTaskPopup extends React.Component {
  constructor () {
    super()
    this.popup = React.createRef()
  }

  close () {
    this.props.setSubTaskVisibility(false)
  }

  // TODO: split render() into various asyncStates?

  render () {
    const {
      activeMark,
      subTaskVisibility
    } = this.props

    if (!activeMark || !subTaskVisibility) return null

    const ready = true // TODO: check with TaskArea/components/Tasks/Tasks.js
    const tasks = (activeMark && activeMark.tasks) ? activeMark.tasks : []

    const defaultPosition = this.getDefaultPosition()

    return (
      <Layer
        animate={false}
        modal
        onClickOutside={this.close.bind(this)}
        onEsc={this.close.bind(this)}
        plain
        position={'top-left'}
      >
        <Rnd
          key={activeMark.id}
          minWidth={MIN_POPUP_WIDTH}
          minHeight={MIN_POPUP_HEIGHT}
          default={defaultPosition}
          cancel='.subtaskpopup-element-that-ignores-drag-actions'
        >
          <StyledContainer pad='xsmall' fill>
            <Box>
              <CloseButton
                alignSelf='end'
                onClick={this.close.bind(this)}
              />
            </Box>

            {tasks.map((task, index) => {
              // classifications.addAnnotation(task, value) retrieves any existing task annotation from the store
              // or creates a new one if one doesn't exist.
              // The name is a bit confusing.
              const annotation = activeMark.addAnnotation(task)
              task.setAnnotation(annotation)
              const TaskComponent = observer(taskRegistry.get(task.type).TaskComponent)

              if (annotation && TaskComponent) {
                return (
                  <TaskBox
                    key={annotation.id}
                    pad='xsmall'
                    className='subtaskpopup-element-that-ignores-drag-actions'
                  >
                    <TaskComponent
                      annotation={annotation}
                      autoFocus={(index === 0)}
                      disabled={!ready}
                      task={task}
                      {...this.props}
                    />
                  </TaskBox>
                )
              }

              return (
                <Box pad='xsmall'>
                  <Paragraph>Task component could not be rendered.</Paragraph>
                </Box>
              )
            })}

            <Box pad='xsmall'>
              <SaveButton
                onClick={this.close.bind(this)}
                disabled={false}
              />
            </Box>
          </StyledContainer>
        </Rnd>
      </Layer>
    )
  }

  getDefaultPosition () {
    const { subTaskMarkBounds } = this.props

    // Calculate default position
    let x = 0
    let y = 0

    /*
    Note: since we're using a modal that covers the entire screen, we only need
    to calculate the position of the mark relative to the x-y coordinates of the
    whole screen. We do not, for example, need to offset the x-y of the parent
    <SVG>
    */

    if (subTaskMarkBounds) {
      const markX = subTaskMarkBounds.x || 0
      const markY = subTaskMarkBounds.y || 0
      const markWidth = subTaskMarkBounds.width || 0
      const markHeight = subTaskMarkBounds.height || 0

      x = markX + markWidth * 0.5
      y = markY + markHeight * 0.5
    }

    // Keep within bounds of the viewport
    const leftLimit = 0
    const topLimit = 0
    const rightLimit = (window && window.innerWidth || 0) - MIN_POPUP_WIDTH
    const bottomLimit = (window && window.innerHeight || 0) - MIN_POPUP_HEIGHT

    x = Math.max(x, leftLimit)
    y = Math.max(y, topLimit)
    x = Math.min(x, rightLimit)
    y = Math.min(y, bottomLimit)

    return { x, y }
  }
}

SubTaskPopup.propTypes = {
  activeMark: PropTypes.object,
  subTaskMarkBounds: PropTypes.object,
  subTaskVisibility: PropTypes.bool,
  setSubTaskVisibility: PropTypes.func
}

SubTaskPopup.defaultProps = {
  activeMark: undefined,
  subTaskMarkBounds: undefined,
  subTaskVisibility: false,
  setSubTaskVisibility: () => {}
}

/*
  Enzyme doesn't support the context API properly yet, so using @withTheme as
  recommended currently doesn't work. So instead, we're exporting the unwrapped
  component for testing, and using the HOC function syntax to export the wrapped
  component.

  https://github.com/styled-components/jest-styled-components/issues/191#issuecomment-465020345
*/
export default inject(storeMapper)(observer(SubTaskPopup))
export { SubTaskPopup, StyledContainer, TaskBox }
