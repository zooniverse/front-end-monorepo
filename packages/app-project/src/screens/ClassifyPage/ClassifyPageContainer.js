import { useEffect, useState } from 'react'

import ClassifyPage from './ClassifyPage'

function ClassifyPageContainer ({
  assignedWorkflowID = '',
  subjectID,
  workflowAssignmentEnabled = false,
  workflowID,
  workflows = [],
  ...props
}) {
  // selected subject state is derived from the page URL, but can be reset by the Classifier component.
  const [selectedSubjectID, setSelectedSubjectID] = useState(subjectID)

  let assignedWorkflow
  let allowedWorkflows = workflows.slice()
  let assignedWorkflowLevel = 1
  if (assignedWorkflowID) {
    assignedWorkflow = workflows.find(workflow => workflow.id === assignedWorkflowID)
    assignedWorkflowLevel = parseInt(assignedWorkflow?.configuration.level, 10)
  }
  if (workflowAssignmentEnabled) {
    allowedWorkflows = workflows.filter(workflow => workflow.configuration.level <= assignedWorkflowLevel)
  }
  const workflowFromUrl = allowedWorkflows.find(workflow => workflow.id === workflowID) ?? null

  useEffect(function onSubjectChange () {
    setSelectedSubjectID(subjectID)
  }, [subjectID])


  function onSubjectReset () {
    setSelectedSubjectID(undefined)
  }

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
