import { Markdownz, Modal, MovableModal, PlainButton } from '@zooniverse/react-components'
import { Button, Box, ContainerTargetContext, ResponsiveContext } from 'grommet'
import { arrayOf, object } from 'prop-types'
import { Fragment, useContext, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from '@translations/i18n'

export const StyledPlainButton = styled(PlainButton)`
  text-align: center;
`

const movableModalProps = {
  closeOnClickOutside: false,
  modal: false,
  position: 'left',
  rndProps: {
    cancel: 'button, a, .task-help-content',
    default: {
      height: 'auto',
      width: 480,
      x: 24,
      y: -250
    },
    minHeight: 200,
    minWidth: 350
  }
}

function TaskHelp({ tasks }) {
  const { t } = useTranslation('components')
  const size = useContext(ResponsiveContext)
  const defaultTarget = useContext(ContainerTargetContext)
  const [showModal, setShowModal] = useState(false)
  const [container, setContainer] = useState(null)

  const label = t('TaskArea.Tasks.TaskHelp.label')
  const tasksWithHelp = tasks?.filter(task => !!task.help)
  const isSmall = size === 'small'
  const HelpModal = isSmall ? Modal : MovableModal
  const movableProps = isSmall ? {} : movableModalProps
  const target = isSmall ? defaultTarget : container

  function openModal(event) {
    event.currentTarget.focus()
    setShowModal(true)
  }

  return (
    <Box>
      <StyledPlainButton
        onClick={openModal}
        margin={{ bottom: 'small' }}
        text={label}
      />
      <div ref={setContainer}>
        {target && (
          <ContainerTargetContext.Provider value={target}>
            <HelpModal
              active={showModal}
              closeFn={() => setShowModal(false)}
              height={{ max: '90vh' }}
              title={label}
              {...movableProps}
            >
              <Box className='task-help-content' overflow='auto'>
                {tasksWithHelp.map((task, index) => {
                  if (tasksWithHelp.length > 1) {
                    return (
                      <Fragment key={task.taskKey}>
                        <Markdownz>{task.help}</Markdownz>
                        {tasksWithHelp.length - 1 === index ? null : <hr />}
                      </Fragment>
                    )
                  }

                  return <Markdownz key={task.taskKey}>{task.help}</Markdownz>
                })}
                <Button
                  margin={{ top: 'small' }}
                  onClick={() => setShowModal(false)}
                  label={t('TaskArea.Tasks.TaskHelp.close')}
                  primary
                />
              </Box>
            </HelpModal>
          </ContainerTargetContext.Provider>
        )}
      </div>
    </Box>
  )
}

TaskHelp.propTypes = {
  tasks: arrayOf(object).isRequired
}

export default TaskHelp
