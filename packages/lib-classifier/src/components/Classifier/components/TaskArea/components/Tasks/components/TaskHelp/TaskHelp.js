import { Markdownz, Modal, PlainButton } from '@zooniverse/react-components'
import { Button, Box } from 'grommet'
import { arrayOf, object } from 'prop-types'
import { Fragment, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from '@translations/i18n'

export const StyledPlainButton = styled(PlainButton)`
  text-align: center;
`

function TaskHelp(props) {
  const { t } = useTranslation('components')
  const [showModal, setShowModal] = useState(false)

  const label = t('TaskArea.Tasks.TaskHelp.label')
  const { tasks } = props
  const tasksWithHelp = tasks.filter(task => !!task.help)

  return (
    <>
      <StyledPlainButton
        onClick={() => setShowModal(true)}
        margin={{ bottom: 'small' }}
        text={label}
      />
      <Modal
        active={showModal}
        closeFn={() => setShowModal(false)}
        title={label}
      >
        <Box overflow='auto'>
          {tasksWithHelp.map((task, index) => {
            if (tasksWithHelp.length > 1) {
              return (
                <Fragment key={task.taskKey}>
                  <Markdownz>{task.help}</Markdownz>
                  {tasksWithHelp.length - 1 === index ? null : <hr />}
                </Fragment>
              )
            }

            return <Markdownz key={task.taskKey}>{task.help}{task.taskKey}</Markdownz>
          })}
          <Button
            margin={{ top: 'small' }}
            onClick={() => setShowModal(false)}
            label={t('TaskArea.Tasks.TaskHelp.close')}
            primary
          />
        </Box>
      </Modal>
    </>
  )
}

TaskHelp.propTypes = {
  tasks: arrayOf(object).isRequired
}

export default TaskHelp
