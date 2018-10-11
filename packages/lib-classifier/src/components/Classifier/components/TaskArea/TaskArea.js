import { inject, observer } from 'mobx-react'
import counterpart from 'counterpart'
import React from 'react'

import { Tab, Tabs } from './components/Tabs'
import en from './locales/en'

counterpart.registerTranslations('en', en)

function storeMapper (stores) {
  const { active: workflow } = stores.classifierStore.workflows
  return {
    steps: stores.classifierStore.workflowSteps,
    workflow
  }
}

@inject(storeMapper)
@observer
class TaskArea extends React.Component {
  render () {
    return (
      <Tabs>
        <Tab title={counterpart('TaskArea.task')}>
          Question area content...
        </Tab>
        <Tab title={counterpart('TaskArea.tutorial')}>
          ...2
        </Tab>
      </Tabs>
    )
  }
}

export default TaskArea
