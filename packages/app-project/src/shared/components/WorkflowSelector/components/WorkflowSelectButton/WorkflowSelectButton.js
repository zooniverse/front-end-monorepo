import { SpacedText, withThemeContext } from '@zooniverse/react-components'
import { Button } from 'grommet'
import counterpart from 'counterpart'
import { Next } from 'grommet-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { bool, func, number, object, shape, string } from 'prop-types'
import addQueryParams from '@helpers/addQueryParams'
import theme from './theme'

import en from './locales/en'

counterpart.registerTranslations('en', en)

export const ThemedButton = withThemeContext(Button, theme)

function WorkflowSelectButton ({
  disabled = false,
  workflow,
  ...rest }
) {
  const router = useRouter()
  const { owner, project } = router?.query || {}

  const url = `/${owner}/${project}/classify/workflow/${workflow.id}`

  const href = addQueryParams(url, router)
  const completeness = parseInt(workflow.completeness * 100, 10)
  let workflowStatus = workflow.grouped ? counterpart('WorkflowSelectButton.setSelection') : ''
  // indexed workflows use subject selection
  workflowStatus = workflow.hasIndexedSubjects ? counterpart('WorkflowSelectButton.subjectSelection') : workflowStatus

  const label = (
    <span>
      <SpacedText size='10px'>
        {counterpart('WorkflowSelectButton.complete', { completeness })}
        {workflowStatus &&
          <>
            &#xB7;
            {workflowStatus}
          </>
        }
      </SpacedText><br />
      {workflow.displayName}
    </span>
  )

  if (href && disabled) {
    return (
      <ThemedButton
        completeness={completeness}
        disabled={disabled}
        icon={<Next size='15px' />}
        reverse
        label={label}
        primary
        {...rest}
      />
    )
  }
  return (
    <Link href={href} passHref>
      <ThemedButton
        completeness={completeness}
        icon={<Next  size='15px' />}
        reverse
        label={label}
        primary
        {...rest}
      />
    </Link>
  )
}

WorkflowSelectButton.propTypes = {
  disabled: bool,
  theme: object,
  workflow: shape({
    completeness: number,
    default: bool,
    displayName: string.isRequired,
    grouped: bool,
    id: string
  }).isRequired
}

export default WorkflowSelectButton
