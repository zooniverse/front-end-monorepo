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
  const [canLoadWorkflowFromUrl, setCanLoadWorkflowFromUrl] = useState(true)
  let workflowFromUrl = workflows.find(workflow => workflow.id === workflowID)

  let assignedWorkflow
  if (assignedWorkflowID) {
    assignedWorkflow = workflows.find(workflow => workflow.id === assignedWorkflowID)
  }
  const collectionsModal = createRef()

  useEffect(function onSubjectChange() {
    setSubjectID(subjectFromURL)
  }, [subjectFromURL])

  useEffect(function onAssignedWorkflowIDChange() {
    const workflowFromURLLevel = parseInt(workflowFromUrl.configuration.level)

    if (workflowAssignmentEnabled && assignedWorkflow) {
      const assignedWorkflowLevel = parseInt(assignedWorkflow.configuration.level)
      const canLoad = assignedWorkflowLevel >= workflowFromURLLevel
      setCanLoadWorkflowFromUrl(canLoad)
    } else if (workflowAssignmentEnabled && workflowFromURLLevel !== 1) {
      setCanLoadWorkflowFromUrl(false)
    } else {
      setCanLoadWorkflowFromUrl(true)
    }
  }, [ assignedWorkflowID, workflowAssignmentEnabled, workflowFromUrl ])

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
        workflowFromUrl={(canLoadWorkflowFromUrl) ? workflowFromUrl : null}
        workflowID={workflowID}
        workflows={workflows}
        {...props}
      />
    </>
  )
}

export default ClassifyPageContainer
