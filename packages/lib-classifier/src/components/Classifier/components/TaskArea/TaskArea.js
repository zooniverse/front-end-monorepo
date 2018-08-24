import counterpart from 'counterpart'
import React from 'react'

import { Tab, Tabs } from './components/Tabs'
import en from './locales/en'

counterpart.registerTranslations('en', en)

function TaskArea () {
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

export default TaskArea
