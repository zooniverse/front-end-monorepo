import counterpart from 'counterpart'
import { Markdown, Text } from 'grommet'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import { observable } from 'mobx'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import en from './locales/en'
counterpart.registerTranslations('en', en)

export const StyledFieldset = styled.fieldset`
  border: none;
`

function storeMapper (stores) {
  const annotations = stores.classifierStore.classifications.currentAnnotations
  return {
    annotations
  }
}

@inject(storeMapper)
@observer
class Graph2dRangeXTask extends React.Component {
  render () {
    const {
      annotations,
      task
    } = this.props
    let annotation
    if (annotations && annotations.size > 0) {
      annotation = annotations.get(task.taskKey)
    }
    const numberOfAnnotations = (annotation && annotation.value.length) || 0
    
    return (
      <StyledFieldset>
        <Text size='small' tag='legend'>
          <Markdown>
            {task.instruction}
          </Markdown>
        </Text>
      
        <Text tag='div' size='small' textAlign='center'>
          {counterpart('Graph2dRangeXTask.marksMade')} : {numberOfAnnotations}
        </Text>
      
      </StyledFieldset>
    )
  }
}

Graph2dRangeXTask.wrappedComponent.defaultProps = {
  annotations: observable.map(),
  task: {}
}

Graph2dRangeXTask.wrappedComponent.propTypes = {
  annotations: MobXPropTypes.observableMap,
  task: PropTypes.shape({
    help: PropTypes.string,
    instruction: PropTypes.string,
    required: PropTypes.bool
  })
}

export default Graph2dRangeXTask
