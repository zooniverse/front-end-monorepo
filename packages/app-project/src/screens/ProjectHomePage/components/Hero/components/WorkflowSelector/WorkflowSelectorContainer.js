import { inject, observer } from 'mobx-react'
import { string } from 'prop-types'
import React, { Component } from 'react'

import WorkflowSelector from './WorkflowSelector'

function storeMapper(stores) {
  const { project, user } = stores.store
  return {
    loadingState: user.loadingState,
    workflowDescription: project.workflow_description
  }
}

class WorkflowSelectorContainer extends Component {
  render () {
    return (
      <WorkflowSelector
        {...this.props}
      />
    )
  }
}

WorkflowSelectorContainer.propTypes = {
  loadingState: string,
  workflowDescription: string
}

@inject(storeMapper)
@observer
class DecoratedWorkflowSelectorContainer extends WorkflowSelectorContainer { }

export {
  DecoratedWorkflowSelectorContainer as default,
  WorkflowSelectorContainer
}
