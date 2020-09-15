import { SpacedText, withThemeContext } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Button } from 'grommet'
import { Next } from 'grommet-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { bool, number, shape, string } from 'prop-types'
import React, { useState } from 'react'

import theme from './theme'
import addQueryParams from '@helpers/addQueryParams'
import SubjectSetPicker from '../SubjectSetPicker'

import en from './locales/en'

counterpart.registerTranslations('en', en)

const WorkflowLink = withThemeContext(Link, theme)

function WorkflowSelectButton (props) {
  const { workflow, ...rest } = props
  const router = useRouter()
  const { owner, project } = router?.query || {}
  const [ showPicker, setShowPicker ] = useState(false)

  const url = (workflow.default)
    ? `/projects/${owner}/${project}/classify`
    : `/projects/${owner}/${project}/classify/workflow/${workflow.id}`
  const href = (workflow.default)
    ? '/projects/[owner]/[project]/classify'
    : '/projects/[owner]/[project]/classify/workflow/[workflowID]'

  const as = addQueryParams(url, router)
  const completeness = parseInt(workflow.completeness * 100, 10)
  const label = (
    <span>
      <SpacedText size='10px'>
        {counterpart('WorkflowSelectButton.complete', { completeness })}
      </SpacedText><br />
      {workflow.displayName}
    </span>
  )

  function selectSubjectSet(event) {
    if (workflow.grouped) {
      event.preventDefault()
      setShowPicker(true)
      return false
    }
    return true
  }

  return (
    <>
      <WorkflowLink as={as} href={href} passHref>
        <Button
          completeness={completeness}
          icon={<Next />}
          reverse
          label={label}
          primary
          onClick={selectSubjectSet}
          {...rest}
        />
      </WorkflowLink>
      {showPicker &&
        <SubjectSetPicker
          active={showPicker}
          closeFn={() => setShowPicker(false)}
          owner={owner}
          project={project}
          title={workflow.displayName || 'Choose a subject set'}
          workflow={workflow}
        />
      }
    </>
  )
}

WorkflowSelectButton.propTypes = {
  workflow: shape({
    completeness: number,
    default: bool,
    displayName: string.isRequired,
    id: string
  }).isRequired
}

export default WorkflowSelectButton
export { WorkflowLink }
