import React from 'react'
import PropTypes from 'prop-types'
import { PropTypes as MobXPropTypes } from 'mobx-react'
import { observer } from 'mobx-react'
import { Box, Layer, Paragraph } from 'grommet'
import { MovableModal } from '@zooniverse/react-components'
import SaveButton from './components/SaveButton'
import getDefaultPosition from '../../helpers/getDefaultPosition'
import taskRegistry from '@plugins/tasks'

const MIN_POPUP_WIDTH = 350
const MIN_POPUP_HEIGHT = 100

function SubTaskPopup(props) {
  const {
    activeMark,
    subTaskMarkBounds,
    subTaskVisibility,
    subTaskPreviousAnnotations,
    setSubTaskVisibility
  } = props

  function close() {
    setSubTaskVisibility(false)
  }

  // TODO: split render() into various asyncStates?

  if (!activeMark || !subTaskVisibility) return null

  const ready = true // TODO: check with TaskArea/components/Tasks/Tasks.js
  const tasks = (activeMark?.tasks) ? activeMark.tasks : []

  const defaultPosition = getDefaultPosition(subTaskMarkBounds, MIN_POPUP_HEIGHT, MIN_POPUP_WIDTH)

  return (
    <MovableModal
      active
      closeFn={close}
      headingBackground='transparent'
      pad={{ bottom: 'medium', left: 'medium', right: 'medium' }}
      plain
      position='top-left'
      rndProps={{
        cancel: '.subtaskpopup-element-that-ignores-drag-actions',
        minHeight: MIN_POPUP_HEIGHT,
        minWidth: MIN_POPUP_WIDTH,
        position: defaultPosition
      }}
    >
      <Box gap='small'>
        {tasks.map((task, index) => {
          // classifications.addAnnotation(task, value) retrieves any existing task annotation from the store
          // or creates a new one if one doesn't exist.
          // The name is a bit confusing.
          const annotation = activeMark.addAnnotation(task)
          task.setAnnotation(annotation)
          const TaskComponent = observer(taskRegistry.get(task.type).TaskComponent)

          if (annotation && TaskComponent) {
            return (
              // horizontal pad for the space for the box-shadow focus style
              // is there a better way?
              <Box
                className='subtaskpopup-element-that-ignores-drag-actions'
                key={annotation.id}
                overflow='auto'
                pad={{ horizontal: '2px' }}
              >
                <TaskComponent
                  annotation={annotation}
                  autoFocus={(index === 0)}
                  disabled={!ready}
                  subTaskPreviousAnnotations={subTaskPreviousAnnotations?.get(activeMark.id)}
                  task={task}
                />
              </Box>
            )
          }

          return (
            <Box pad='none'>
              <Paragraph>Task component could not be rendered.</Paragraph>
            </Box>
          )
        })}

        <SaveButton
          onClick={close}
        />
      </Box>
    </MovableModal>
  )
}

SubTaskPopup.propTypes = {
  activeMark: PropTypes.object,
  subTaskMarkBounds: PropTypes.object,
  subTaskPreviousAnnotations: MobXPropTypes.observableMap,
  subTaskVisibility: PropTypes.bool,
  suggestions: PropTypes.array,
  setSubTaskVisibility: PropTypes.func
}

SubTaskPopup.defaultProps = {
  activeMark: undefined,
  subTaskMarkBounds: undefined,
  subTaskPreviousAnnotations: undefined,
  subTaskVisibility: false,
  suggestions: [],
  setSubTaskVisibility: () => { }
}

export default SubTaskPopup