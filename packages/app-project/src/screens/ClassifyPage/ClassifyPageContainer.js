import { createRef, useEffect, useState } from 'react'

import ClassifyPage from './ClassifyPage'
import CollectionsModal from '../../shared/components/CollectionsModal'

function ClassifyPageContainer({
  assignedWorkflowID = '',
  subjectID: subjectFromURL,
  workflowAssignmentEnabled = false,
  workflowID,
  workflows = [],
  ...props
}) {
  const [subjectID, setSubjectID] = useState(subjectFromURL)
  const collectionsModal = createRef()

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

  useEffect(function onSubjectChange() {
    setSubjectID(subjectFromURL)
  }, [subjectFromURL])

  function addToCollection(subjectId) {
    collectionsModal.current.open(subjectId)
  }

  function onSubjectReset() {
    setSubjectID(undefined)
  }

  return (
    <>
      <CollectionsModal
        ref={collectionsModal}
      />
      <ClassifyPage
        addToCollection={addToCollection}
        onSubjectReset={onSubjectReset}
        subjectID={subjectID}
        workflowFromUrl={workflowFromUrl}
        workflowID={workflowID}
        workflows={workflows}
        {...props}
      />
    </>
  )
}

export default ClassifyPageContainer
