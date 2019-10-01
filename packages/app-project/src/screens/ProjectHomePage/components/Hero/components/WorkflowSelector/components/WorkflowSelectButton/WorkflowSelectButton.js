import { SpacedText, withThemeContext } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { GoldButton } from '@zooniverse/react-components'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { bool, number, shape, string } from 'prop-types'
import React from 'react'

import addQueryParams from '@helpers/addQueryParams'

import en from './locales/en'

counterpart.registerTranslations('en', en)

function WorkflowSelectButton (props) {
  const { router, workflow, ...rest } = props
  const { owner, project } = router.query

  const url = (workflow.default)
    ? `/projects/${owner}/${project}/classify`
    : `/projects/${owner}/${project}/classify/workflow/${workflow.id}`

  const as = addQueryParams(url, router)
  const href = '/projects/[owner]/[project]/classify'
  const completeness = parseInt(workflow.completeness * 100, 10)
  const label = (
    <span>
      {workflow.displayName}<br />
      <SpacedText size='xsmall'>
        {counterpart('WorkflowSelectButton.complete', { completeness })}
      </SpacedText>
    </span>
  )

  return (
    <Link as={as} href={href} passHref>
      <GoldButton
        completeness={completeness}
        label={label}
        primary
        {...rest}
      />
    </Link>
  )
}

WorkflowSelectButton.propTypes = {
  router: shape({
    asPath: string.isRequired,
    query: {
      owner: string.isRequired,
      project: string.isRequired
    }
  }).isRequired,
  workflow: shape({
    completeness: number,
    default: bool,
    displayName: string.isRequired,
    id: string
  }).isRequired
}

const DecoratedWorkflowSelectButton = withRouter(WorkflowSelectButton)

export {
  DecoratedWorkflowSelectButton as default,
  WorkflowSelectButton
}
