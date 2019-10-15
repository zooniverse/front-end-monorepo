import counterpart from 'counterpart'
import { Box, Text } from 'grommet'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import { observable } from 'mobx'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Markdownz } from '@zooniverse/react-components'
import TaskInput from '../../components/TaskInput'
import InputIcon from '../../components/InputIcon'
import Graph2dRangeXIcon from './components/Graph2dRangeXIcon'

import en from './locales/en'
counterpart.registerTranslations('en', en)

const StyledText = styled(Text)`
  margin: 0;
  padding: 0;
  width: 100%;

  > *:first-child {
    margin-top: 0;
  }
`

function storeMapper (stores) {
  const annotations = stores.classifierStore.classifications.currentAnnotations
  const { active, setActive } = stores.classifierStore.dataVisAnnotating
  return {
    active,
    annotations,
    setActive
  }
}

@inject(storeMapper)
@observer
class DataVisAnnotationTask extends React.Component {
  onChange (index, event) {
    if (event.target.checked) {
      this.props.setActive(index)
    }
  }

  render () {
    const {
      active,
      annotations,
      task
    } = this.props
    // let annotation
    // if (annotations && annotations.size > 0) {
    //   annotation = annotations.get(task.taskKey)
    // }
    // TODO: Add in the status count along with the validations to not go over the max allowed

    return (
      <Box>
        <StyledText size='small' tag='legend'>
          <Markdownz>
            {task.instruction}
          </Markdownz>
        </StyledText>

        {task.tools.map((tool, index) => {
          const checked = active === index
          return (
            <TaskInput
              checked={checked}
              index={index}
              key={`${task.taskKey}_${index}`}
              label={tool.label}
              labelIcon={<InputIcon icon={<Graph2dRangeXIcon />} />}
              name='data-vis-annotation-tool'
              onChange={this.onChange.bind(this, index)}
              required={task.required}
              type='radio'
            />
          )
        })}
      </Box>
    )
  }
}

DataVisAnnotationTask.wrappedComponent.defaultProps = {
  annotations: observable.map(),
  task: {}
}

DataVisAnnotationTask.wrappedComponent.propTypes = {
  annotations: MobXPropTypes.observableMap,
  task: PropTypes.shape({
    help: PropTypes.string,
    instruction: PropTypes.string,
    required: PropTypes.bool
  })
}

export default DataVisAnnotationTask
