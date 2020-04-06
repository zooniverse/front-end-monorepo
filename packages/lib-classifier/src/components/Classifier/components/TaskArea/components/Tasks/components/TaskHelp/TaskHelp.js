import { Markdownz, Modal, PlainButton } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Button, Box } from 'grommet'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components'

import en from './locales/en'

counterpart.registerTranslations('en', en)

export const StyledPlainButton = styled(PlainButton)`
  text-align: center;
`

function TaskHelp (props) {
  const [ showModal, setShowModal ] = useState(false)

  const label = counterpart('TaskHelp.label')
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
              label={counterpart('TaskHelp.close')}
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
