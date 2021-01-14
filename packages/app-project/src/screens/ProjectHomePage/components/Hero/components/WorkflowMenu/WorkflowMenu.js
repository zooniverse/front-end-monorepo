import { arrayOf, shape, string } from 'prop-types'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Modal } from '@zooniverse/react-components'

import WorkflowSelector from '@shared/components/WorkflowSelector'
import SubjectSetPicker from '@shared/components/SubjectSetPicker'

export default function WorkflowMenu({ workflows }) {
  const [ activeWorkflow, setActiveWorkflow ] = useState()
  const router = useRouter()
  const { owner, project } = router?.query || {}

  function onSelectWorkflow(event, workflow) {
    if (workflow.grouped) {
      event.preventDefault()
      setActiveWorkflow(workflow)
      return false
    }
    return true
  }
  return (
    <>
    <WorkflowSelector
      onSelect={onSelectWorkflow}
      workflows={workflows}
    />
    {activeWorkflow &&
      <Modal
        active
        closeFn={() => setActiveWorkflow(null)}
        headingBackground='brand'
        title={activeWorkflow.displayName || 'Choose a subject set'}
        titleColor='neutral-6'
      >
        <SubjectSetPicker
          owner={owner}
          project={project}
          workflow={activeWorkflow}
        />
      </Modal>
    }
    </>
  )
}

WorkflowMenu.defaultProps = {
  workflows: []
}

WorkflowMenu.propTypes = {
  workflows: arrayOf(shape({
    id: string.isRequired
  }))
}