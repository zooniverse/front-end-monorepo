import { withThemeContext } from '@zooniverse/react-components'
import { Button } from 'grommet'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { bool, shape, string } from 'prop-types'
import React from 'react'

import theme from './theme'

function WorkflowSelectButton (props) {
  const { workflow } = props
  const router = useRouter()

  const as = workflow.default
    ? `${router.asPath}/classify`
    : `${router.asPath}/classify/workflow/${workflow.id}`

  const href = '/Classify'

  return (
    <Link as={as} href={href} passHref>
      <Button label={workflow.displayName} />
    </Link>
  )
}

WorkflowSelectButton.propTypes = {
  workflow: shape({
    default: bool.isRequired,
    displayName: string.isRequired,
    id: string.isRequired
  }).isRequired
}

export default withThemeContext(WorkflowSelectButton, theme)
