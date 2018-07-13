import { Box, Text } from 'grommet'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import Answer from './components/Answer'

const boxStyles = {
  pad: 'medium',
  border: {
    color: 'lightGrey',
    side: 'all'
  }
}

function storeMapper (stores) {
  const { active: task } = stores.classifierStore.tasks
  return { task }
}

@inject(storeMapper)
@observer
class TaskArea extends React.Component {
  render () {
    const { task } = this.props
    if (!task) {
      return null
    }

    return (
      <Box {...boxStyles}>
        <Text size="small" margin={{ bottom: 'medium' }}>
          {task.question}
        </Text>
        <Answer />
      </Box>
    )
  }
}

TaskArea.propTypes = {
  task: PropTypes.shape({
    question: PropTypes.string
  })
}

export default TaskArea
