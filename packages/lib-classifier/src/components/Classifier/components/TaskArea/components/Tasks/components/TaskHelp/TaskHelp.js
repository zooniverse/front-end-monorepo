import { Markdownz, Modal, PlainButton } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Button, Box } from 'grommet'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledPlainButton = styled(PlainButton)`
  text-align: center;
`

function storeMapper (stores) {
  const tasks = stores.classifierStore.workflowSteps.activeStepTasks
  const { isThereTaskHelp } = stores.classifierStore.workflowSteps
  return {
    isThereTaskHelp,
    tasks
  }
}

@inject(storeMapper)
@observer
class TaskHelp extends React.Component {
  constructor () {
    super()

    this.state = {
      showModal: false
    }
  }

  render () {
    const label = counterpart('TaskHelp.label')
    const { isThereTaskHelp, tasks } = this.props

    if (isThereTaskHelp) {
      return (
        <>
          <Box>
            <StyledPlainButton
              onClick={() => this.setState({ showModal: true })}
              margin={{ bottom: 'small' }}
              text={label}
            />
          </Box>
          <Modal
            active={this.state.showModal}
            closeFn={() => this.setState({ showModal: false })}
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
                      <Markdownz key={task.taskKey}>
                        {task.help}
                        <hr />
                      </Markdownz>
                    )
                  }

                  return <Markdownz key={task.taskKey}>{task.help}</Markdownz>
                })}
              </Box>
              <Box pad={{ top: 'small' }}>
                <Button
                  onClick={() => this.setState({ showModal: false })}
                  label={counterpart('TaskHelp.close')}
                  primary
                />
              </Box>
            </>
          </Modal>
        </>
      )
    }

    return null
  }
}

TaskHelp.wrappedComponent.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default TaskHelp
