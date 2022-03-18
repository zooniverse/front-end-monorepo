import { Tab, Tabs } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { bool, func, shape, string } from 'prop-types'
import queryString from 'query-string'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DisabledTaskPopup, Tasks } from './components'
import SlideTutorial from '../SlideTutorial'

// TODO: add autofocus for the first tab/task area
/**
The tabbed tasks area of the classifier, with tabs for the tutorial and active tasks.
*/
export default function TaskArea({
  alreadySeen,
  className,
  disableTutorialTab = true,
  setActiveTutorial = () => true,
  retired,
  subject,
  tutorial = null,
  workflow = {
    hasIndexedSubjects: false
  }
}) {
  const { t } = useTranslation('components')
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
    if (newIndex === 1) setActiveTutorial(tutorial.id)
    if (newIndex === 0) setActiveTutorial()
    setActiveIndex(newIndex)
  }

  function onClose() {
    setActiveIndex(0)
    tutorial?.setSeenTime()
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
          title={t('TaskArea.task')}
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
          title={t('TaskArea.tutorial')}
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
  /** the active workflow */
  workflow: shape({
    hasIndexedSubjects: bool
  })
}
