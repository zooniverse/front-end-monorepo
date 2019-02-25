import zooTheme from '@zooniverse/grommet-theme'
import { SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Box } from 'grommet'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { withTheme } from 'styled-components'

import { Tab, Tabs } from './components/Tabs'
import Tasks from './components/Tasks'
import SlideTutorial from '../SlideTutorial'
import en from './locales/en'

counterpart.registerTranslations('en', en)

// TODO: add autofocus for the first tab/task area
function storeMapper (stores) {
  const { disableTutorialTab, setActiveTutorial, tutorial } = stores.classifierStore.tutorials

  return {
    disableTutorialTab,
    setActiveTutorial,
    tutorial
  }
}

@withTheme
@inject(storeMapper)
@observer
class TaskArea extends React.Component {
  onTabClick (activeIndex) {
    const { setActiveTutorial, tutorial } = this.props
    if (activeIndex === 1) setActiveTutorial(tutorial)
    if (activeIndex === 0) setActiveTutorial()
  }

  render () {
    const { theme: { mode }, disableTutorialTab } = this.props

    const border = {
      side: 'all',
      color: zooTheme[mode].colors.tabs.border,
      size: 'xsmall'
    }

    return (
      <Tabs
        background={ mode === 'light' ? 'white' : '#2d2d2d' }
        border={border}
        className={this.props.className}
        margin='none'
        onActive={this.onTabClick.bind(this)}
      >
        <Tab
          title={(
            <SpacedText size='medium' weight='bold'>
              {counterpart('TaskArea.task')}
            </SpacedText>
          )}
        >
          <Box background={ mode === 'light' ? 'white' : '#2d2d2d' }>
            <Tasks />
          </Box>
        </Tab>
        <Tab
          disabled={disableTutorialTab}
          title={<SpacedText size='medium' weight='bold'>{counterpart('TaskArea.tutorial')}</SpacedText>}
        >
          <Box background={ mode === 'light' ? 'white' : '#2d2d2d' }>
            <SlideTutorial />
          </Box>
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
