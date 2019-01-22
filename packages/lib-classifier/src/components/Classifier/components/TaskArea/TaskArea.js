import counterpart from 'counterpart'
import React from 'react'
import { inject, observer } from 'mobx-react'
import asyncStates from '@zooniverse/async-states'
import { Tab, Tabs } from './components/Tabs'
import Tasks from './components/Tasks'
import SlideTutorial from '../SlideTutorial'
import en from './locales/en'

counterpart.registerTranslations('en', en)

// TODO: add autofocus for the first tab/task area
function storeMapper(stores) {
  const { disableTutorialTab, setActiveTutorial, tutorialID } = stores.classifierStore.tutorials

  return {
    disableTutorialTab,
    setActiveTutorial,
    tutorialID
  }
}

@inject(storeMapper)
@observer
class TaskArea extends React.Component {
  onTabClick(activeIndex) {
    const { setActiveTutorial, tutorialID } = this.props
    if (activeIndex === 1) setActiveTutorial(tutorialID)
    if (activeIndex === 0) setActiveTutorial()
  }

  render () {
    const { disableTutorialTab } = this.props

    return (
      <Tabs onActive={this.onTabClick.bind(this)}>
        <Tab title={counterpart('TaskArea.task')}>
          <Tasks />
        </Tab>
        <Tab
          disabled={disableTutorialTab}
          title={counterpart('TaskArea.tutorial')}
        >
          <SlideTutorial />
        </Tab>
      </Tabs>
    )
  }
}

export default TaskArea
