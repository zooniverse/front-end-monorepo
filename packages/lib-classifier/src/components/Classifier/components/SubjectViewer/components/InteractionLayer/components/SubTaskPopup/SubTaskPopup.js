import { Box, Paragraph } from 'grommet'
import { PropTypes as MobXPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { MovableModal } from '@zooniverse/react-components'
import { useTranslation } from 'react-i18next'

import * as taskRegister from '@plugins/tasks'
import getDefaultPosition from '../../helpers/getDefaultPosition'
import ConfirmModal from './components/ConfirmModal'
import SaveButton from './components/SaveButton'

const MIN_POPUP_WIDTH = 350
const MIN_POPUP_HEIGHT = 200

/**
  A popup that renders activeMark.tasks for the active mark. Incomplete task annotations are confirmed, on save or close, for required tasks.
*/
function SubTaskPopup({
  /** The active drawing mark */
  activeMark,
  /** A callback that is called if the active mark is deleted. */
  onDelete
}) {
  const { t } = useTranslation('components')

  const {
    subTaskMarkBounds,
    subTaskVisibility,
    subTaskPreviousAnnotationValues,
    setSubTaskVisibility
  } = activeMark
  if (!subTaskVisibility) return null

  const [confirmationState, setConfirm] = React.useState('pending')
  function onOpenConfirm() {
    setConfirm('confirming')
  }
  function onCloseConfirm() {
    setConfirm('closed')
  }

  // TODO: split render() into various asyncStates?
  const ready = true // TODO: check with TaskArea/components/Tasks/Tasks.js
  const tasks = (activeMark?.tasks) ? activeMark.tasks : []

  function deleteMark() {
    const { tool } = activeMark
    setConfirm('closed')
    setSubTaskVisibility(false)
    tool.deleteMark(activeMark)
    onDelete()
  }

  function close() {
    if (!activeMark.isComplete) {
      setConfirm('confirming')
    } else {
      setSubTaskVisibility(false)
      activeMark.setPreviousAnnotations()
    }
  }

  function onWheel(event) {
    event.stopPropagation()
  }

  const defaultPosition = getDefaultPosition(subTaskMarkBounds, MIN_POPUP_HEIGHT, MIN_POPUP_WIDTH)
  const disabled = !ready || confirmationState === 'confirming'

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
            const { TaskComponent } = taskRegister[task.type]

            if (annotation && TaskComponent) {
              const requiredEmphasis = task.required && !task.isComplete(annotation) && confirmationState === 'closed'
              return (
                // horizontal pad for the space for the box-shadow focus style
                // is there a better way?
                <Box
                  border={requiredEmphasis ? { size: 'small', color: 'tomato' } : false}
                  className='subtaskpopup-element-that-ignores-drag-actions'
                  key={annotation.id}
                  overflow='auto'
                  pad={{ horizontal: '2px' }}
                >
                  <TaskComponent
                    annotation={annotation}
                    autoFocus={(index === 0)}
                    disabled={disabled}
                    suggestions={subTaskPreviousAnnotationValues?.get(task.taskKey)?.values}
                    task={task}
                  />
                  {requiredEmphasis && (
                    <Paragraph>
                      <strong>{t('SubjectViewer.InteractionLayer.SubTaskPopup.required')}</strong>
                    </Paragraph>
                  )}
                </Box>
              )
            }

            return (
              <Box pad='none' key={`${index}-${task?.type}`}>
                <Paragraph>{t('SubjectViewer.InteractionLayer.SubTaskPopup.notRender')}</Paragraph>
              </Box>
            )
          })}

          <SaveButton
            disabled={disabled}
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
  onDelete: () => true
}

export default SubTaskPopup
