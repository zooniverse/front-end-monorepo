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

function WorkflowSelectButton (props) {
  const { disabled = false, onSelect, workflow, ...rest } = props
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
        onClick={selectSubjectSet}
        {...rest}
      />
    </Link>
  )
}

WorkflowSelectButton.propTypes = {
  disabled: bool,
  onSelect: func.isRequired,
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
