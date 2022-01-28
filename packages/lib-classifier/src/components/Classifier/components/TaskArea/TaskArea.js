import { Tab, Tabs } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Box } from 'grommet'
import { bool, func, object, shape, string } from 'prop-types'
import queryString from 'query-string'
import React, { useEffect, useRef, useState } from 'react'

import { DisabledTaskPopup, Tasks } from './components'
import en from './locales/en'
import SlideTutorial from '../SlideTutorial'

counterpart.registerTranslations('en', en)

// TODO: add autofocus for the first tab/task area
/**
The tabbed tasks area of the classifier, with tabs for the tutorial and active tasks.
*/
export default function TaskArea({
  alreadySeen,
  className,
  retired,
  setSeenTime,
  subject,
  tutorial = null,
  workflow = {
    hasIndexedSubjects: false
  }
}) {
  const [ activeIndex, setActiveIndex ] = useState(0)
  const [ disabled, setDisabled ] = useState(false)
  const taskArea = useRef(null)

  useEffect(function onSubjectChange() {
    // TODO: remove this once testing is complete.
    const URLParams = queryString.parse(window?.location?.search)
    const finished = (subject && URLParams?.finished) || retired || alreadySeen
    setDisabled(finished && workflow.hasIndexedSubjects)
  }, [alreadySeen, subject, retired])

  function enableTasks() {
    setDisabled(false)
  }

  useEffect(function onWorkflowChange() {
    setActiveIndex(0)
  }, [workflow])

  function onTabClick(newIndex) {
    setActiveIndex(newIndex)
  }

  function onClose() {
    setSeenTime(tutorial)
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
          disabled={disabled || !tutorial}
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
  /** is the subject already seen? */
  alreadySeen: bool,
  /** Optional CSS classes */
  className: string,
  /** is the subject retired? */
  retired: bool,
  /** set the tutorial's last seen time */
  setSeenTime: func,
  /** the current subject. */
  subject: shape({
    already_seen: bool,
    id: string,
    retired: bool
  }),
  /** the workflow tutorial */
  tutorial: shape({
    id: string
  }),
  /** the active workflow */
  workflow: shape({
    hasIndexedSubjects: bool
  })
}
