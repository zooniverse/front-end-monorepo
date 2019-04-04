import { SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Box } from 'grommet'
import { inject, observer } from 'mobx-react'
import { bool, func, object } from 'prop-types'
import React from 'react'

import { Tab, Tabs } from './components/Tabs'
import Tasks from './components/Tasks'
import en from './locales/en'
import SlideTutorial from '../SlideTutorial'

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

class TaskArea extends React.Component {
  onTabClick (activeIndex) {
    const { setActiveTutorial, tutorial } = this.props
    if (activeIndex === 1) setActiveTutorial(tutorial)
    if (activeIndex === 0) setActiveTutorial()
  }

  render () {
    const { disableTutorialTab } = this.props

    return (
      <Tabs
        className={this.props.className}
        onActive={this.onTabClick.bind(this)}
      >
        <Tab
          title={(
            <SpacedText size='medium' weight='bold'>
              {counterpart('TaskArea.task')}
            </SpacedText>
          )}
        >
          <Box>
            <Tasks />
          </Box>
        </Tab>
        <Tab
          disabled={disableTutorialTab}
          title={(
            <SpacedText size='medium' weight='bold'>
              {counterpart('TaskArea.tutorial')}
            </SpacedText>
          )}
        >
          <Box>
            <SlideTutorial />
          </Box>
        </Tab>
      </Tabs>
    )
  }
}

TaskArea.propTypes = {
  disableTutorialTab: bool,
  setActiveTutorial: func,
  tutorial: object
}

TaskArea.defaultProps = {
  disableTutorialTab: true,
  setActiveTutorial: () => {},
  tutorial: null
}

/*
  Enzyme doesn't support the context API properly yet, so using @withTheme as
  recommended currently doesn't work. So instead, we're exporting the unwrapped
  component for testing, and using the HOC function syntax to export the wrapped
  component.

  https://github.com/styled-components/jest-styled-components/issues/191#issuecomment-465020345
*/
export default inject(storeMapper)(observer(TaskArea))
export { TaskArea }
