import { useRouter } from 'next/router'
import { arrayOf, shape, string } from 'prop-types'
import { useState } from 'react';
import { Modal } from '@zooniverse/react-components'

import WorkflowSelector from '@shared/components/WorkflowSelector'
import SubjectSetPicker from '@shared/components/SubjectSetPicker'
import SubjectPicker from '@shared/components/SubjectPicker'

/**
  A popup menu which allows you to choose a workflow and optional subject set from the classify page.
*/
export default function WorkflowMenuModal({
  headingBackground = 'brand',
  subjectSetFromUrl,
  titleColor = 'neutral-6',
  workflowFromUrl,
  workflows
}) {
  const router = useRouter()
  const { owner, project } = router?.query || {}

  let modalContent = (
    <WorkflowSelector
      workflows={workflows}
    />
  )
  let baseUrl = `/${owner}/${project}/classify`
  if (workflowFromUrl) {
    modalContent = (
      <SubjectSetPicker
        baseUrl={baseUrl}
        workflow={workflowFromUrl}
      />
    )
  }
  if (subjectSetFromUrl) {
    baseUrl = `${baseUrl}/workflow/${workflowFromUrl.id}`
    modalContent = (
      <SubjectPicker
        baseUrl={baseUrl}
        subjectSet={subjectSetFromUrl}
        workflow={workflowFromUrl}
      />
    )
  }
  return (
    <Modal
      active
      headingBackground={headingBackground}
      title={workflowFromUrl ? (workflowFromUrl.displayName || 'Choose a subject set') : 'Choose a workflow'}
      titleColor={titleColor}
    >
      {modalContent}
    </Modal>
  )
}

const subjectSetType = shape({
  displayName: string,
  id: string
})

const workflowType = shape({
  displayName: string,
  id: string
})

WorkflowMenuModal.propTypes = {
  /**
    Background colour of the title bar.
  */
  headingBackground: string,
  /**
    An optional selected subject set. If present, we can jump straight to subject selection.
  **/
  subjectSetFromUrl: subjectSetType,
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