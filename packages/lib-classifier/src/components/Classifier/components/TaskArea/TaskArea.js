import counterpart from 'counterpart'
import React from 'react'
import { inject, observer } from 'mobx-react'
import zooTheme from '@zooniverse/grommet-theme'
import { SpacedText } from '@zooniverse/react-components'

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
    const { colorTheme, disableTutorialTab } = this.props
    const border = {
      side: 'all',
      color: (colorTheme === 'light') ? zooTheme.light.colors.tabs.border : zooTheme.dark.colors.tabs.border,
      size: 'xsmall'
    }
    return (
      <Tabs
        onActive={this.onTabClick.bind(this)}
        border={border}
        margin='none'
      >
        <Tab title={<SpacedText size='medium' weight='bold'>{counterpart('TaskArea.task')}</SpacedText>}>
          <Tasks />
        </Tab>
        <Tab
          disabled={disableTutorialTab}
          title={<SpacedText size='medium' weight='bold'>{counterpart('TaskArea.tutorial')}</SpacedText>}
        >
          <SlideTutorial />
        </Tab>
      </Tabs>
    )
  }
}

TaskArea.defaultProps = {
  colorTheme: 'light'
}

export default TaskArea
