import counterpart from 'counterpart'
import React from 'react'

import { Tab, Tabs } from './components/Tabs'
import Tasks from './components/Tasks'
import en from './locales/en'

counterpart.registerTranslations('en', en)

// TODO: add autofocus for the first tab/task area
class TaskArea extends React.Component {
  render () {
    return (
      <Tabs>
        <Tab title={counterpart('TaskArea.task')}>
          <Tasks />
        </Tab>
        <Tab title={counterpart('TaskArea.tutorial')}>
          ...2
        </Tab>
      </Tabs>
    )
  }
}

export default TaskArea
