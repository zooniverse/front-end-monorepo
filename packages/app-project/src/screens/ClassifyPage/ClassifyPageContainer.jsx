import { useCallback, useEffect, useState } from 'react'
import { array, bool, string } from 'prop-types'

import ClassifyPage from './ClassifyPage'

function ClassifyPageContainer ({
  assignedWorkflowLevel = 1,
  subjectID,
  workflowAssignmentEnabled = false,
  workflowID,
  workflows = [],
  ...props
}) {
  /* SelectedSubjectID is initially derived from the page URL via getDefaultPageProps,
  but can be reset by the Classifier component via onSubjectReset().
  This state does not change via components of the prioritized subjects UI (Next/Prev buttons) */
  const [selectedSubjectID, setSelectedSubjectID] = useState(subjectID)

  let allowedWorkflows = workflows.slice()
  /* Double check that a volunteer navigating to url with workflowID is allowed to load that workflow */
  if (workflowAssignmentEnabled) {
    allowedWorkflows = workflows.filter(workflow => workflow.configuration.level <= assignedWorkflowLevel)
  }
  const workflowFromUrl = allowedWorkflows.find(workflow => workflow.id === workflowID) ?? null

  useEffect(function onSubjectChange () {
    setSelectedSubjectID(subjectID)
  }, [subjectID])

  const onSubjectReset = useCallback(() => {
    setSelectedSubjectID(undefined)
  }, [setSelectedSubjectID])

  return (
    <>
      <ClassifyPage
        onSubjectReset={onSubjectReset}
        subjectID={selectedSubjectID}
        workflowFromUrl={workflowFromUrl}
        workflowID={workflowFromUrl?.id}
        workflows={workflows}
        {...props}
      />
    </>
  )
}

export default ClassifyPageContainer

ClassifyPageContainer.propTypes = {
  /** assignedWorkflowID is in the Project Preferences Store */
  assignedWorkflowID: string,
  /** This subjectID is from getDefaultPageProps in page index.js */
  subjectID: string,
  /** workflowAssignmentEnabled is in the Project Store */
  workflowAssignmentEnabled: bool,
  /** This workflowID is from getDefaultPageProps in page index.js */
  workflowID: string,
  /** workflows array is from getDefaultPageProps in page index.js */
  workflows: array
}
