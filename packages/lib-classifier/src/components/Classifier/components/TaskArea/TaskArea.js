import { Tab, Tabs } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Box } from 'grommet'
import { inject, observer } from 'mobx-react'
import { bool, func, object } from 'prop-types'
import React, { useState } from 'react'

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
/**
The tabbed tasks area of the classifier, with tabs for the tutorial and active tasks.
*/
function TaskArea({
  /** Optional CSS classes */
  className,
  /** disable the tutorial tab */
  disableTutorialTab = true,
  /** select an active tutorial */
  setActiveTutorial = () => true,
  /** current tutorial */
  tutorial = null
}) {
  const [ activeIndex, setActiveIndex ] = useState(0)

  function onTabClick(newIndex) {
    if (newIndex === 1) setActiveTutorial(tutorial)
    if (newIndex === 0) setActiveTutorial()
    setActiveIndex(newIndex)
  }

  function onClose() {
    setActiveTutorial()
    setActiveIndex(0)
  }

  return (
    <Tabs
      activeIndex={activeIndex}
      className={className}
      onActive={onTabClick}
      flex
    >
      <Tab title={counterpart('TaskArea.task')}>
        <Box fill>
          <Tasks />
        </Box>
      </Tab>
      <Tab
        disabled={disableTutorialTab}
        title={counterpart('TaskArea.tutorial')}
      >
        <Box>
          <SlideTutorial onClick={onClose} pad='none' />
        </Box>
      </Tab>
    </Tabs>
  )
}

TaskArea.propTypes = {
  disableTutorialTab: bool,
  setActiveTutorial: func,
  tutorial: object
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
