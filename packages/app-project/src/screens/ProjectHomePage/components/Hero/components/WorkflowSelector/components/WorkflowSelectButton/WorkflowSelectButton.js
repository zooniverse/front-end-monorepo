import { withThemeContext } from '@zooniverse/react-components'
import { Button } from 'grommet'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { bool, shape, string } from 'prop-types'
import React from 'react'

import theme from './theme'
import addQueryParams from '@helpers/addQueryParams'

function WorkflowSelectButton (props) {
  const { router, workflow, ...rest } = props
  const { owner, project } = router.query

  const url = (workflow.default)
    ? `/projects/${owner}/${project}/classify`
    : `/projects/${owner}/${project}/classify/workflow/${workflow.id}`

  const as = addQueryParams(url, router)
  const href = '/projects/[owner]/[project]/classify'
  const a11yTitle = `${workflow.displayName} ${parseInt(workflow.completeness * 100)}% complete`

  return (
    <Link as={as} href={href} passHref>
      <Button
        a11yTitle={a11yTitle}
        completeness={workflow.completeness}
        label={workflow.displayName}
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
