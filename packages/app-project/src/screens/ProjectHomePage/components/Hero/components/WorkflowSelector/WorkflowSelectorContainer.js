import { inject, observer } from 'mobx-react'
import { string } from 'prop-types'
import React, { Component } from 'react'

import WorkflowSelector from './WorkflowSelector'

function storeMapper (stores) {
  return {
    workflowDescription: stores.store.project.workflow_description || undefined
  }
}

class WorkflowSelectorContainer extends Component {
  render () {
    return (
      <WorkflowSelector {...this.props} />
    )
  }
}

WorkflowSelectorContainer.propTypes = {
  workflowDescription: string
}

@inject(storeMapper)
@observer
class DecoratedWorkflowSelectorContainer extends WorkflowSelectorContainer { }

export {
  DecoratedWorkflowSelectorContainer as default,
  WorkflowSelectorContainer
}
