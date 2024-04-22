import { SpacedText } from '@zooniverse/react-components'
import { Button } from 'grommet'
import { FormPrevious } from 'grommet-icons'
import { string } from 'prop-types'
import styled, { css } from 'styled-components'

const StyledButton = styled(Button)`
  ${props => css`
    color: ${props.theme.global.colors.white};
    background: ${props.theme.global.colors['neutral-1']};`
  }
  border: none;
  border-radius: 24px;
  box-shadow: none;

  &:hover {
    ${props => css`
      color: ${props.theme.global.colors.brand};
      background: ${props.theme.global.colors['accent-1']};

      svg {
        fill: ${props.theme.global.colors.brand};
        stroke: ${props.theme.global.colors.brand};
      }
    `}
    border: none;
    box-shadow: none;
  }
`

function HeaderLink({
  href,
  label
}) {
  return (
    <StyledButton
      href={href}
      icon={<FormPrevious color='white' />}
      label={<SpacedText weight={700}>{label}</SpacedText>}
      pad={{ left: 'xxsmall', right: 'medium' }}
    />
  )
}

HeaderLink.propTypes = {
  href: string.isRequired,
  label: string.isRequired
}

export default HeaderLink
