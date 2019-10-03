import { SpacedText, withThemeContext } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Button } from 'grommet'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { bool, shape, string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import theme from './theme'
import addQueryParams from '@helpers/addQueryParams'

import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledButton = styled(Button)`
  text-align: left;
`
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
      <StyledButton
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
    asPath: string.isRequired
  }).isRequired,
  workflow: shape({
    default: bool,
    displayName: string.isRequired,
    id: string
  }).isRequired
}

const DecoratedWorkflowSelectButton = withRouter(withThemeContext(WorkflowSelectButton, theme))

export {
  DecoratedWorkflowSelectButton as default,
  WorkflowSelectButton
}
