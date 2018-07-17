import counterpart from 'counterpart'
import { Box, Text } from 'grommet'
import { inject, observer } from 'mobx-react'
import { when } from 'mobx'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Answer from './components/Answer'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const boxStyles = {
  pad: 'medium',
  border: {
    color: 'lightGrey',
    side: 'all'
  }
}

const HelpLink = styled.button`
  background: none;
  border: 0;
  color: #00979d;
  cursor: pointer;
  font-weight: light;
  font-size: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`

function storeMapper (stores) {
  const { active: task } = stores.classifierStore.tasks
  const { classifier } = stores.classifierStore
  return { classifier, task }
}

@inject(storeMapper)
@observer
class TaskArea extends React.Component {
  constructor () {
    super()
    this.openHelp = this.openHelp.bind(this)
  }

  openHelp () {
    console.info('Open Help')
  }

  componentDidMount () {
    when(
      () => this.props.classifier.mouseEventStream,
      () => this.do()
    )

    
  }

  do() {
    this.props.classifier.mouseEventStream.mouseDowns.forEach(event => {
      console.log('event', event)
    })
  }

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
        <Box align="center" margin={{ vertical: 'small' }}>
          <HelpLink
            onClick={this.openHelp}
          >
            {counterpart('TaskArea.help')}
          </HelpLink>
        </Box>
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
