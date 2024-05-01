import { SpacedText } from '@zooniverse/react-components'
import { Button } from 'grommet'
import { bool, node, string } from 'prop-types'
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

function HeaderButton({
  icon,
  label,
  primaryItem = false,
  ...rest
}) {
  const padding = primaryItem ? { left: 'xsmall', right: 'medium' } : { horizontal: 'medium' }

  return (
    <StyledButton
      gap={primaryItem ? 'small' : 'xsmall'}
      icon={icon}
      label={
        <SpacedText
          size='.78rem'
          weight={700}
        >
          {label}
        </SpacedText>
      }
      pad={padding}
      {...rest}
    />
  )
}

HeaderButton.propTypes = {
  icon: node,
  label: string.isRequired,
  primaryItem: bool
}

export default HeaderButton
