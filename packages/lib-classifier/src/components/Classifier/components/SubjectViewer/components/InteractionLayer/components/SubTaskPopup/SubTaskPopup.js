import React from 'react'
import PropTypes from 'prop-types'
import { PropTypes as MobXPropTypes } from 'mobx-react'
import { observer } from 'mobx-react'
import counterpart from 'counterpart'
import { Box, Paragraph } from 'grommet'
import styled, { css, withTheme } from 'styled-components'
import { Modal, MovableModal, PrimaryButton } from '@zooniverse/react-components'
import SaveButton from './components/SaveButton'
import getDefaultPosition from '../../helpers/getDefaultPosition'
import taskRegistry from '@plugins/tasks'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const MIN_POPUP_WIDTH = 350
const MIN_POPUP_HEIGHT = 100

const StyledButton = styled(PrimaryButton)`
  ${props => props.theme && css`
    background: none;
    ${(props) => (props.theme.dark) ?
    css`color: ${props.theme.global.colors.text.dark};` :
    css`color: ${props.theme.global.colors.text.light};`}
  `}
`

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

  const [confirm, setConfirm] = React.useState('pending')
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
    const incompleteTask = tasks.some(task => !task.isComplete)
    if (incompleteTask) {
      onOpenConfirm()
    } else {
      setSubTaskVisibility(false)
    }
  }

  const defaultPosition = getDefaultPosition(subTaskMarkBounds, MIN_POPUP_HEIGHT, MIN_POPUP_WIDTH)

  return (
    <>
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
        titleColor=''
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
              const highlightRequired = !task.isComplete && confirm === 'closed'
              return (
                // horizontal pad for the space for the box-shadow focus style
                // is there a better way?
                <Box
                  border={highlightRequired ? { size: 'small', color: 'tomato' }: false}
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
                  {task.required && (
                    <Paragraph
                      color={highlightRequired ? 'tomato': false}
                    >
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
      {confirm === 'confirming' && (
        <Modal
          active
          closeFn={onCloseConfirm}
        >
          <Paragraph>{counterpart('Task.confirm')}</Paragraph>
          <Box
            direction='row'
            gap='small'
            justify='center'
          >
            <StyledButton
              label={counterpart('Task.keepWorking')}
              color='teal'
              onClick={onCloseConfirm}
            />
            <PrimaryButton
              label={counterpart('Task.close')}
              color='teal'
              onClick={deleteMark}
            />
          </Box>
        </Modal>
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

export default withTheme(SubTaskPopup)