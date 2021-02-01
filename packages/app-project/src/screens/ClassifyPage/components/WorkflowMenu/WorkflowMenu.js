import { useRouter } from 'next/router'
import { arrayOf, shape, string } from 'prop-types'
import React, { useState } from 'react'
import { Modal } from '@zooniverse/react-components'

import WorkflowSelector from '@shared/components/WorkflowSelector'
import SubjectSetPicker from '@shared/components/SubjectSetPicker'

/**
  A popup menu which allows you to choose a workflow and optional subject set from the classify page.
*/
export default function WorkflowMenu({
  headingBackground = 'brand',
  titleColor = 'neutral-6',
  workflowFromUrl,
  workflows
}) {
  const router = useRouter()
  const { owner, project } = router?.query || {}
  const [ activeWorkflow, setActiveWorkflow ] = useState(workflowFromUrl)

  function onSelectWorkflow(event, workflow) {
    if (workflow.grouped) {
      event.preventDefault()
      setActiveWorkflow(workflow)
      return false
    }
    return true
  }

  function onClose() {
    setActiveWorkflow(null)
  }

  return (
    <Modal
      active
      headingBackground={headingBackground}
      title={activeWorkflow ? (activeWorkflow.displayName || 'Choose a subject set') : 'Choose a workflow'}
      titleColor={titleColor}
    >
      {!activeWorkflow ?
        <WorkflowSelector
          onSelect={onSelectWorkflow}
          workflows={workflows}
        /> :
        <SubjectSetPicker
          onClose={onClose}
          owner={owner}
          project={project}
          workflow={activeWorkflow}
        />
      }
    </Modal>
  )
}

const workflowType = shape({
  displayName: string,
  id: string
})

WorkflowMenu.propTypes = {
  /**
    Background colour of the title bar.
  */
  headingBackground: string,
  /**
    text colour of the title bar.
  */
  titleColor: string,
  /**
    An optional selected workflow. If present, we jump straight to subject set selecton.
  */
  workflowFromUrl: workflowType,
  /**
    A list of workflows to use for the menu.
  */
  workflows: arrayOf(workflowType)
}