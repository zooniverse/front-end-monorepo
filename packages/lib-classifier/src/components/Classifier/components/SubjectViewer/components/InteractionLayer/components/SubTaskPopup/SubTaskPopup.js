import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Rnd } from 'react-rnd' // Used to create the draggable, resizable "popup" component
import { Box, Layer, Paragraph } from 'grommet'
import { CloseButton } from '@zooniverse/react-components'
import SaveButton from './components/SaveButton'
import ResizeIcon from './components/ResizeIcon'

import taskRegistry from '@plugins/tasks'

const MIN_POPUP_WIDTH = 350
const MIN_POPUP_HEIGHT = 100

function SubTaskPopup({ activeMark, subTaskMarkBounds, subTaskVisibility, setSubTaskVisibility }) {
  function close() {
    setSubTaskVisibility(false)
  }

  function getDefaultPosition() {
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

  // TODO: split render() into various asyncStates?

  if (!activeMark || !subTaskVisibility) return null

  const ready = true // TODO: check with TaskArea/components/Tasks/Tasks.js
  const tasks = (activeMark?.tasks) ? activeMark.tasks : []

  const defaultPosition = getDefaultPosition()

  return (
    <Layer
      animate={false}
      modal
      onClickOutside={close}
      onEsc={close}
      plain
      position='top-left'
    >
      <Rnd
        cancel='.subtaskpopup-element-that-ignores-drag-actions'
        default={defaultPosition}
        key={activeMark.id}
        minWidth={MIN_POPUP_WIDTH}
        minHeight={MIN_POPUP_HEIGHT}
        resizeHandleComponent={{ bottomRight: <ResizeIcon /> }}
        resizeHandleStyles={{
          bottom: {},
          bottomLeft: {
            bottom: 0,
            left: 0
          },
          bottomRight: {
            bottom: 0,
            height: '20px',
            right: 0,
            width: '14px'
          },
          left: {},
          right: {},
          top: {},
          topLeft: {
            left: 0,
            top: 0
          },
          topRight: {
            right: 0,
            top: 0
          }
        }}
      >
        <Box
          background={{
            light: 'neutral-6',
            dark: 'dark-1'
          }}
          border={{
            color: {
              light: 'light-1',
              dark: 'dark-6'
            },
            size: '1px',
            style: 'solid',
            side: 'all'
          }}
          elevation='xlarge'
          fill
          overflow='auto'
          pad='xsmall'
        >
          <Box>
            <CloseButton
              alignSelf='end'
              onClick={close}
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
                <Box
                  className='subtaskpopup-element-that-ignores-drag-actions'
                  key={annotation.id}
                  overflow='auto'
                  pad='xsmall'
                >
                  <TaskComponent
                    annotation={annotation}
                    autoFocus={(index === 0)}
                    disabled={!ready}
                    task={task}
                  />
                </Box>
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
              onClick={close}
            />
          </Box>
        </Box>
      </Rnd>
    </Layer>
  )
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
  setSubTaskVisibility: () => { }
}

export default SubTaskPopup