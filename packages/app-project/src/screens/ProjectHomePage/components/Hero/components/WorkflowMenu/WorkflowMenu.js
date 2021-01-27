import counterpart from 'counterpart'
import { arrayOf, shape, string } from 'prop-types'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Modal } from '@zooniverse/react-components'

import WorkflowSelector from '@shared/components/WorkflowSelector'
import SubjectSetPicker from '@shared/components/SubjectSetPicker'

import en from './locales/en'
counterpart.registerTranslations('en', en)

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

  function onClose() {
    setActiveWorkflow(null)
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
        closeFn={onClose}
        headingBackground='brand'
        title={activeWorkflow.displayName || counterpart('WorkflowMenu.chooseASubjectSet')}
        titleColor='neutral-6'
      >
        <SubjectSetPicker
          onClose={onClose}
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