import { Box, Paragraph } from 'grommet'
import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'
import { MovableModal, PrimaryButton } from '@zooniverse/react-components'
import { useTranslation } from '@translations/i18n'

import { useClientRect } from '@hooks'
import * as taskRegister from '@plugins/tasks'
import SaveButton from '../../InteractionLayer/components/SubTaskPopup/components/SaveButton'
import ConfirmModal from '../../InteractionLayer/components/SubTaskPopup/components/ConfirmModal'

const MIN_POPUP_WIDTH = 350
const MIN_POPUP_HEIGHT = 200

// NOTE: Heavily inspired by InteractionLayer => SubTaskPopup. SGV does not implement the InteractionLayer

function SubjectGroupSubTaskPopup({
  cellIndex,
  cellBounds,
  currentTask,
  onClose,
  onSave,
  onCancelSelection
}) {
  const { t } = useTranslation('components')
  const [dimensions, measuredContentRef] = useClientRect()
  const [position, setPosition] = useState(null)
  const [confirmationState, setConfirm] = useState('pending')

  const subtaskDefinitions = currentTask?.subtasks || []
  const currentCell = currentTask?.getCellByIndex(cellIndex)

  if (!subtaskDefinitions || subtaskDefinitions.length === 0 || !currentCell) return null

  const subtasks = subtaskDefinitions.map((subtaskDef, index) => {
    try {
      const { TaskModel } = taskRegister[subtaskDef.type] || {}
      if (TaskModel) {
        const taskKey = `${currentTask.taskKey}.cell.${cellIndex}.subtask.${index}`

        const taskSnapshot = {
          taskKey,
          type: subtaskDef.type,
          required: subtaskDef.required || false,
          strings: {
            question: subtaskDef.question || subtaskDef.instruction || 'Select an option',
            instruction: subtaskDef.instruction || subtaskDef.question || '',
            help: subtaskDef.help || ''
          }
        }

        if (subtaskDef.answers && Array.isArray(subtaskDef.answers)) {
          taskSnapshot.answers = subtaskDef.answers.map(answer => {
            if (typeof answer === 'string') {
              return { label: answer }
            } else if (answer && typeof answer === 'object') {
              return {
                label: answer.label || answer.value || String(answer)
              }
            }
            return { label: String(answer) }
          }).filter(answer => answer.label)

          subtaskDef.answers.forEach((answer, answerIndex) => {
            const answerLabel = typeof answer === 'string' ? answer : (answer?.label || answer?.value || String(answer))
            taskSnapshot.strings[`answers.${answerIndex}.label`] = answerLabel
          })
        }

        const task = TaskModel.create(taskSnapshot)
        return task
      }
    } catch (error) {
      console.warn(`Could not create Task for subtask type ${subtaskDef.type}:`, error)
    }
    return null
  }).filter(Boolean)

  function getAnnotationForTask(task) {
    return currentCell.annotation(task)
  }

  function createAnnotationForTask(task) {
    return currentCell.addAnnotation(task)
  }

  function isTaskComplete(task) {
    const annotation = getAnnotationForTask(task)
    if (!annotation) return false
    return annotation.isComplete
  }

  function areAllRequiredTasksComplete() {
    return subtasks.every(subtask => {
      const isRequired = subtask.required === 'true' || subtask.required === true
      return !isRequired || isTaskComplete(subtask)
    })
  }

  function handleClose(event) {
    event?.preventDefault()
    event?.stopPropagation()
    if (!areAllRequiredTasksComplete()) {
      setConfirm('confirming')
    } else {
      onSave({})
      onClose()
    }
  }

  function onCloseConfirm() {
    setConfirm('closed')
  }

  function deleteCellData() {
    setConfirm('closed')
    subtasks.forEach(subtask => {
      const annotation = getAnnotationForTask(subtask)
      if (annotation) {
        currentCell.removeAnnotation(annotation)
      }
    })
    onSave({})
    onClose()
  }

  function handleCancelSelection() {
    subtasks.forEach(subtask => {
      const annotation = getAnnotationForTask(subtask)
      if (annotation) {
        currentCell.removeAnnotation(annotation)
      }
    })
    if (onCancelSelection) {
      onCancelSelection()
    }
    onClose()
  }

  function onWheel(event) {
    event.stopPropagation()
  }

  const minHeight = dimensions?.height || MIN_POPUP_HEIGHT
  const minWidth = dimensions?.width || MIN_POPUP_WIDTH
  const disabled = confirmationState === 'confirming'

  const defaultPosition = {
    x: cellBounds.x + cellBounds.width + 10,
    y: cellBounds.y
  }

  const onDragStop = useCallback(function (_, data) {
    const { x, y } = data
    setPosition({ x, y })
  })

  const onResize = useCallback(function (_, __, ___, ____, position) {
    setPosition(position)
  })

  const rndProps = {
    cancel: '.element-that-ignores-drag-actions',
    minHeight,
    minWidth,
    onDragStop,
    onResize,
    position: position || defaultPosition
  }

  return (
    <>
      <MovableModal
        ref={measuredContentRef}
      active
      closeFn={handleClose}
      headingBackground='transparent'
      onWheel={onWheel}
      pad={{ bottom: 'medium', left: 'medium', right: 'medium' }}
      plain
      position='top-left'
      rndProps={rndProps}
      title={`Cell ${cellIndex + 1} Details`}
      titleColor=''
    >
      <Box
        className='element-that-ignores-drag-actions'
        gap='small'
      >
        <form onSubmit={handleClose}>
          {subtasks.map((subtask, index) => {
            let annotation = getAnnotationForTask(subtask)
            if (!annotation) {
              annotation = createAnnotationForTask(subtask)
            }

            let taskType = subtask.type
            if (taskType === 'dropdown-simple') {
              taskType = 'dropdownSimple'
            }

            const { TaskComponent } = taskRegister[taskType] || {}

            if (annotation && TaskComponent) {
              const isRequired = subtask.required === 'true' || subtask.required === true

              const requiredEmphasis = isRequired && !isTaskComplete(subtask) && confirmationState === 'closed'

              return (
                <Box
                  key={annotation.id}
                  border={requiredEmphasis ? { size: 'small', color: 'tomato' } : false}
                  overflow='auto'
                  pad={{ horizontal: '2px' }}
                >
                  <TaskComponent
                    annotation={annotation}
                    autoFocus={index === 0}
                    disabled={disabled}
                    task={subtask}
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
              <Box pad='none' key={`${index}-${subtask?.type}`}>
                <Paragraph>{t('SubjectViewer.InteractionLayer.SubTaskPopup.notRender')}</Paragraph>
              </Box>
            )
          })}

          <SaveButton
            disabled={disabled}
            onClick={handleClose}
          />

          <PrimaryButton
            label="Cancel Selection"
            onClick={handleCancelSelection}
            disabled={disabled}
            color="teal"
            margin={{ top: 'small' }}
          />
        </form>
      </Box>
    </MovableModal>
    {confirmationState === 'confirming' && (
      <ConfirmModal
        onClose={onCloseConfirm}
        onDelete={deleteCellData}
      />
    )}
    </>
  )
}

SubjectGroupSubTaskPopup.propTypes = {
  cellIndex: PropTypes.number.isRequired,
  cellBounds: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number
  }).isRequired,
  currentTask: PropTypes.shape({
    subtasks: PropTypes.array,
    getCellByIndex: PropTypes.func
  }),
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancelSelection: PropTypes.func
}

SubjectGroupSubTaskPopup.defaultProps = {
  currentTask: null,
  onCancelSelection: null
}

export default SubjectGroupSubTaskPopup