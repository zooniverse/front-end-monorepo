import { PrimaryButton, SpacedText, withThemeContext } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Button, Text } from 'grommet'
import { Next } from 'grommet-icons'
import NavLink from '@shared/components/NavLink'
import { useRouter } from 'next/router'
import { bool, func, number, shape, string } from 'prop-types'
import theme from './theme'
import addQueryParams from '@helpers/addQueryParams'

import en from './locales/en'

counterpart.registerTranslations('en', en)


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
    <span style={{ textAlign: 'left' }}>
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
    <NavLink
      align='between'
      completeness={completeness}
      disabled={disabled}
      href={href}
      icon={<Next size='15px' />}
      justify='space-between'
      label={label}
      link={(disabled) ? { href: '' } : { href }}
      onClick={selectSubjectSet}
      StyledAnchor={PrimaryButton}
      reverse
      {...rest}
    />
  )
}

WorkflowSelectButton.propTypes = {
  disabled: bool,
  onSelect: func.isRequired,
  workflow: shape({
    completeness: number,
    default: bool,
    displayName: string.isRequired,
    grouped: bool,
    id: string
  }).isRequired
}

export default withThemeContext(WorkflowSelectButton, theme)
