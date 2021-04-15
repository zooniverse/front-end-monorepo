import { SpacedText, withThemeContext } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Button } from 'grommet'
import { Next } from 'grommet-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { bool, func, number, shape, string } from 'prop-types'
import React from 'react'

import theme from './theme'
import addQueryParams from '@helpers/addQueryParams'

import en from './locales/en'

counterpart.registerTranslations('en', en)

const WorkflowLink = withThemeContext(Link, theme)

function WorkflowSelectButton (props) {
  const { onSelect, workflow, ...rest } = props
  const router = useRouter()
  const { owner, project } = router?.query || {}

  const url = `/projects/${owner}/${project}/classify/workflow/${workflow.id}`

  const href = addQueryParams(url, router)
  const completeness = parseInt(workflow.completeness * 100, 10)
  const buttonLabel = workflow.grouped ?
    `${workflow.displayName} - ${counterpart('WorkflowSelectButton.setSelection')}` :
    workflow.displayName
  const label = (
    <span>
      <SpacedText size='10px'>
        {counterpart('WorkflowSelectButton.complete', { completeness })}
      </SpacedText><br />
      {buttonLabel}
    </span>
  )

  function selectSubjectSet(event) {
    return onSelect(event, workflow)
  }

  return (
    <>
      <WorkflowLink href={href} passHref>
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
    </>
  )
}

WorkflowSelectButton.propTypes = {
  onSelect: func.isRequired,
  workflow: shape({
    completeness: number,
    default: bool,
    displayName: string.isRequired,
    grouped: bool,
    id: string
  }).isRequired
}

export default WorkflowSelectButton
export { WorkflowLink }
