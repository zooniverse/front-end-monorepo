import counterpart from 'counterpart'
import { Box, Paragraph } from 'grommet'
import { PropTypes as MobXPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { MovableModal } from '@zooniverse/react-components'

import taskRegistry from '@plugins/tasks'
import getDefaultPosition from '../../helpers/getDefaultPosition'
import ConfirmModal from './components/ConfirmModal'
import SaveButton from './components/SaveButton'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const MIN_POPUP_WIDTH = 350
const MIN_POPUP_HEIGHT = 100

function SubTaskPopup(props) {
  const {
    activeMark,
    onDelete
  } = props

  const {
    subTaskMarkBounds,
    subTaskVisibility,
    subTaskPreviousAnnotationValues,
    setSubTaskVisibility
  } = activeMark
  if (!subTaskVisibility) return null

  const [confirmationState, setConfirm] = React.useState('pending')
  const onOpenConfirm = () => setConfirm('confirming');
  const onCloseConfirm = () => setConfirm('closed');

  // TODO: split render() into various asyncStates?
  const ready = true // TODO: check with TaskArea/components/Tasks/Tasks.js
  const tasks = (activeMark?.tasks) ? activeMark.tasks : []

  function deleteMark() {
    const { tool } = activeMark
    onCloseConfirm()
    setSubTaskVisibility(false)
    tool.deleteMark(activeMark)
    onDelete()
  }

  function close() {
    if (!activeMark.isComplete) {
      onOpenConfirm()
    } else {
      setSubTaskVisibility(false)
    }
  }

  function onWheel(event) {
    event.stopPropagation()
  }

  const defaultPosition = getDefaultPosition(subTaskMarkBounds, MIN_POPUP_HEIGHT, MIN_POPUP_WIDTH)

  return (
    <>
      <MovableModal
        active
        closeFn={close}
        headingBackground='transparent'
        onWheel={onWheel}
        pad={{ bottom: 'medium', left: 'medium', right: 'medium' }}
        plain
        position='top-left'
        rndProps={{
          cancel: '.subtaskpopup-element-that-ignores-drag-actions',
          minHeight: MIN_POPUP_HEIGHT,
          minWidth: MIN_POPUP_WIDTH,
          position: defaultPosition
        }}
        titleColor=''
      >
        <Box gap='small'>
          {tasks.map((task, index) => {
            // classifications.addAnnotation(task, value) retrieves any existing task annotation from the store
            // or creates a new one if one doesn't exist.
            // The name is a bit confusing.
            let annotation = activeMark.annotation(task)
            if (!annotation) {
              annotation = activeMark.addAnnotation(task)
            }
            const { TaskComponent } = taskRegistry.get(task.type)

            if (annotation && TaskComponent) {
              const requiredEmphasis = task.required && !task.isComplete && confirmationState === 'closed'
              return (
                // horizontal pad for the space for the box-shadow focus style
                // is there a better way?
                <Box
                  border={requiredEmphasis ? { size: 'small', color: 'tomato' }: false}
                  className='subtaskpopup-element-that-ignores-drag-actions'
                  key={annotation.id}
                  overflow='auto'
                  pad={{ horizontal: '2px' }}
                >
                  <TaskComponent
                    annotation={annotation}
                    autoFocus={(index === 0)}
                    disabled={!ready}
                    subTaskPreviousAnnotationValues={subTaskPreviousAnnotationValues?.get(task.taskKey)?.values}
                    task={task}
                  />
                  {requiredEmphasis && (
                    <Paragraph>
                      <strong>{counterpart('Task.required')}</strong>
                    </Paragraph>
                  )}
                </Box>
              )
            }

            return (
              <Box pad='none'>
                <Paragraph>{counterpart('Task.notRender')}</Paragraph>
              </Box>
            )
          })}

          <SaveButton
            onClick={close}
          />
        </Box>
      </MovableModal>
      {confirmationState === 'confirming' && (
        <ConfirmModal
          onClose={onCloseConfirm}
          onDelete={deleteMark}
        />
      )}
    </>
  )
}

SubTaskPopup.propTypes = {
  activeMark: PropTypes.shape({
    subTaskMarkBounds: PropTypes.object,
    subTaskPreviousAnnotationValues: MobXPropTypes.observableMap,
    subTaskVisibility: PropTypes.bool,
    setSubTaskVisibility: PropTypes.func
  }),
  onDelete: PropTypes.func
}

SubTaskPopup.defaultProps = {
  activeMark: {
    subTaskMarkBounds: undefined,
    subTaskPreviousAnnotationValues: undefined,
    subTaskVisibility: false,
    setSubTaskVisibility: () => { }
  },
  onDelete: () => true,
}

export default SubTaskPopup
