import { PrimaryButton, SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Next } from 'grommet-icons'
import NavLink from '@shared/components/NavLink'
import { useRouter } from 'next/router'
import { bool, func, number, object, shape, string } from 'prop-types'
import addQueryParams from '@helpers/addQueryParams'
import styled, { css, withTheme } from 'styled-components'

import en from './locales/en'

counterpart.registerTranslations('en', en)

export const StyledNavLink = styled(NavLink)`
  position: relative;

  &:before {
    content: "";
    width: 100%;
    position: absolute;
    height: 5px;
    ${({ progressGradient }) => css`background: linear-gradient(to right, ${progressGradient});`}
    top: 0;
    left: 0;
  }
`

function WorkflowSelectButton (props) {
  const { disabled = false, onSelect, theme: { global: { colors } }, workflow, ...rest } = props
  const router = useRouter()
  const { owner, project } = router?.query || {}

  const url = `/projects/${owner}/${project}/classify/workflow/${workflow.id}`

  const href = addQueryParams(url, router)
  const completeness = parseInt(workflow.completeness * 100, 10)
  const buttonLabel = workflow.grouped ?
    `${workflow.displayName} - ${counterpart('WorkflowSelectButton.setSelection')}` :
    workflow.displayName
  const Label = () => (
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

  const percentComplete = `${completeness}%`
  const progressGradient = [
    `${colors['accent-2']} ${percentComplete}`,
    `transparent ${percentComplete}`
  ].join(',')

  return (
    <StyledNavLink
      align='between'
      completeness={completeness}
      disabled={disabled}
      icon={<Next size='15px' />}
      justify='space-between'
      link={(disabled) ? { href: '' } : { href }}
      onClick={selectSubjectSet}
      progressGradient={progressGradient}
      StyledAnchor={PrimaryButton}
      StyledSpacedText={Label}
      reverse
      {...rest}
    />
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

export default withTheme(WorkflowSelectButton)
export { WorkflowSelectButton }
