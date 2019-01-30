import counterpart from 'counterpart'
import React from 'react'
import PropTypes from 'prop-types'
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
  const { disableTutorialTab, setActiveTutorial, tutorial } = stores.classifierStore.tutorials

  return {
    disableTutorialTab,
    setActiveTutorial,
    tutorial
  }
}

@inject(storeMapper)
@observer
class TaskArea extends React.Component {
  onTabClick(activeIndex) {
    const { setActiveTutorial, tutorial } = this.props
    if (activeIndex === 1) setActiveTutorial(tutorial)
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
        className={this.props.className}
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

TaskArea.wrappedComponent.propTypes = {
  colorTheme: PropTypes.oneOf(['light', 'dark']),
  disableTutorialTab: PropTypes.bool,
  setActiveTutorial: PropTypes.func,
  tutorial: PropTypes.object
}

TaskArea.wrappedComponent.defaultProps = {
  colorTheme: 'light',
  disableTutorialTab: true,
  setActiveTutorial: () => {},
  tutorial: null
}

export default TaskArea
