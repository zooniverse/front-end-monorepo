import { SpacedText, withThemeContext } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Button } from 'grommet'
import { Next } from 'grommet-icons'
import Link from 'next/link'
import { bool, func, number, shape, string } from 'prop-types'
import React from 'react'

import theme from './theme'
import addQueryParams from '@helpers/addQueryParams'

import en from './locales/en'

counterpart.registerTranslations('en', en)

const WorkflowLink = withThemeContext(Link, theme)

function WorkflowSelectButton (props) {
  const { onSelect, workflow, ...rest } = props

  const url = `/projects/${owner}/${project}/classify/workflow/${workflow.id}`
  const href = '/projects/[owner]/[project]/classify/workflow/[workflowID]'

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
    return onSelect(event, workflow)
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
    </>
  )
}

WorkflowSelectButton.defaultProps = {
  selected: false
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
