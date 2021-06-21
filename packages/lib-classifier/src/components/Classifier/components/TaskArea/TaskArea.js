import { Tab, Tabs } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Box } from 'grommet'
import { MobXProviderContext, observer } from 'mobx-react'
import { bool, func, object, shape, string } from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'

import { DisabledTaskPopup, Tasks } from './components'
import en from './locales/en'
import SlideTutorial from '../SlideTutorial'

counterpart.registerTranslations('en', en)

function storeMapper (store) {
  const { disableTutorialTab, setActiveTutorial, tutorial } = store.tutorials
  const subject = store.subjects.active

  return {
    disableTutorialTab,
    setActiveTutorial,
    subject,
    tutorial
  }
}

function TaskAreaConnector(props) {
  const { classifierStore } = React.useContext(MobXProviderContext)
  const {
    disableTutorialTab = true,
    setActiveTutorial = () => true,
    subject,
    tutorial
  } = storeMapper(classifierStore)

  return (
    <TaskArea
      disableTutorialTab={disableTutorialTab}
      setActiveTutorial={setActiveTutorial}
      subject={subject}
      tutorial={tutorial}
      {...props}
    />
  )
}

// TODO: add autofocus for the first tab/task area
/**
The tabbed tasks area of the classifier, with tabs for the tutorial and active tasks.
*/
export function TaskArea({
  className,
  disableTutorialTab = true,
  setActiveTutorial = () => true,
  subject,
  tutorial = null
}) {
  const [ activeIndex, setActiveIndex ] = useState(0)
  const [ disabled, setDisabled ] = useState(false)
  const taskArea = useRef(null)

  useEffect(function onSubjectChange() {
    const finished = !!subject?.id || subject?.retired || subject?.already_seen
    setDisabled(finished)
  }, [subject])

  function enableTasks() {
    setDisabled(false)
  }

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
    <>
      <DisabledTaskPopup
        isOpen={disabled}
        onClose={enableTasks}
        target={taskArea?.current}
      />
      <Tabs
        activeIndex={activeIndex}
        className={className}
        onActive={onTabClick}
        flex
      >
        <Tab
          disabled={disabled}
          title={counterpart('TaskArea.task')}
        >
          <Box
            ref={taskArea}
            fill
          >
            <Tasks
              disabled={disabled}
            />
          </Box>
        </Tab>
        <Tab
          disabled={disabled || disableTutorialTab}
          title={counterpart('TaskArea.tutorial')}
        >
          <Box>
            <SlideTutorial onClick={onClose} pad='none' />
          </Box>
        </Tab>
      </Tabs>
    </>
  )
}

TaskArea.propTypes = {
  /** Optional CSS classes */
  className: string,
  /** disable the tutorial tab */
  disableTutorialTab: bool,
  /** select an active tutorial */
  setActiveTutorial: func,
  /** the current subject. */
  subject: shape({
    already_seen: bool,
    id: string,
    retired: bool
  }),
  /** current tutorial */
  tutorial: object
}

/*
  Enzyme doesn't support the context API properly yet, so using @withTheme as
  recommended currently doesn't work. So instead, we're exporting the unwrapped
  component for testing, and using the HOC function syntax to export the wrapped
  component.

  https://github.com/styled-components/jest-styled-components/issues/191#issuecomment-465020345
*/
export default observer(TaskAreaConnector)
