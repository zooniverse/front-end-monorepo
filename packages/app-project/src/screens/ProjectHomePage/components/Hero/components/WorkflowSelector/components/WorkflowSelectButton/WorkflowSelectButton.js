import { withThemeContext } from '@zooniverse/react-components'
import { Button } from 'grommet'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { bool, shape, string } from 'prop-types'
import React from 'react'

import theme from './theme'

function WorkflowSelectButton (props) {
  const { router, workflow, ...rest } = props

  const as = workflow.default
    ? `${router.asPath}/classify`
    : `${router.asPath}/classify/workflow/${workflow.id}`
  const href = '/Classify'

  return (
    <Link as={as} href={href} passHref>
      <Button label={workflow.displayName} {...rest} />
    </Link>
  )
}

WorkflowSelectButton.propTypes = {
  router: shape({
    asPath: string.isRequired
  }),
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
