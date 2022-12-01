import { Markdownz, Modal, PlainButton } from '@zooniverse/react-components'
import { Button, Box } from 'grommet'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from '@translations/i18n'

export const StyledPlainButton = styled(PlainButton)`
  text-align: center;
`

function TaskHelp (props) {
  const { t } = useTranslation('components')
  const [ showModal, setShowModal ] = useState(false)

  const label = t('TaskArea.Tasks.TaskHelp.label')
  const { tasks } = props

  return (
    <>
      <Box>
        <StyledPlainButton
          onClick={() => setShowModal(true)}
          margin={{ bottom: 'small' }}
          text={label}
        />
      </Box>
      <Modal
        active={showModal}
        closeFn={() => setShowModal(false)}
        title={label}
      >
        <>
          <Box
            height='medium'
            overflow='auto'
          >
            {tasks.map((task) => {
              if (tasks.length > 1) {
                return (
                  <React.Fragment key={task.taskKey}>
                    <Markdownz>
                      {task.help}
                    </Markdownz>
                    <hr />
                  </React.Fragment>
                )
              }

              return <Markdownz key={task.taskKey}>{task.help}</Markdownz>
            })}
          </Box>
          <Box pad={{ top: 'small' }}>
            <Button
              onClick={() => setShowModal(false)}
              label={t('TaskArea.Tasks.TaskHelp.close')}
              primary
            />
          </Box>
        </>
      </Modal>
    </>
  )
}

TaskHelp.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default TaskHelp
