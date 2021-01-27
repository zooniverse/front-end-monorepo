import { inject, observer } from 'mobx-react'
import { string } from 'prop-types'
import React, { Component } from 'react'

import WorkflowSelector from './WorkflowSelector'

function storeMapper(stores) {
  const { project, user } = stores.store
  return {
    userReadyState: user.loadingState,
    workflowDescription: project.workflow_description
  }
}

function WorkflowSelectorContainer(props) {
  return (
    <WorkflowSelector
      {...props}
    />
  )
}

WorkflowSelectorContainer.propTypes = {
  userReadyState: string,
  workflowDescription: string
}

const DecoratedWorkflowSelectorContainer = inject(storeMapper)(observer(WorkflowSelectorContainer))

export {
  DecoratedWorkflowSelectorContainer as default,
  WorkflowSelectorContainer
}
