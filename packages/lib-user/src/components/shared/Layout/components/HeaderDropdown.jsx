import { arrayOf, node } from 'prop-types'
import { useState } from 'react'
import styled, { css } from 'styled-components'
import { Box, DropButton } from 'grommet'
import { FormDown } from 'grommet-icons'
import { SpacedText } from '@zooniverse/react-components'
import { useTranslation } from '@translations/i18n'

const StyledDropButton = styled(DropButton)`
  position: relative;

  // This is the same styling as HeaderButton, but applied to a DropButton
  ${props => css`
    color: ${props.theme.global.colors.white};
    background: ${props.theme.global.colors['neutral-1']};
  `}
  border: none;
  border-radius: 24px;
  box-shadow: none;

  &:hover,
  &:focus {
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

  ${props =>
    props.open &&
    css`
      background: ${props.theme.global.colors['neutral-1']};

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        background: ${props.theme.global.colors.brand};
        height: 50%;
        width: 100%;
        z-index: -1;
      }
    `}
`

const StyledLi = styled.li`
  list-style-type: none;
  display: flex;
  width: 100%;
`

function HeaderDropdown({ secondaryHeaderItems = [] }) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const dropContent = (
    <Box
      as='ul'
      pad={{ vertical: 'small', horizontal: '0' }}
      margin='0'
      gap='small'
      background='neutral-1'
    >
      {secondaryHeaderItems.map(item => (
        <StyledLi key={item.key}>{item}</StyledLi>
      ))}
    </Box>
  )

  return (
    <StyledDropButton
      alignSelf='center'
      dropAlign={{ top: 'bottom' }}
      onClose={handleClose}
      onOpen={handleOpen}
      open={isOpen}
      dropContent={dropContent}
    >
      <Box
        align='center'
        direction='row'
        gap='xsmall'
        justify='center'
        pad={{ horizontal: 'medium', vertical: 'xsmall' }}
      >
        <SpacedText size='.78rem' weight={700}>
          {t('HeaderDropdown.label')}
        </SpacedText>
        <FormDown color='white' />
      </Box>
    </StyledDropButton>
  )
}

HeaderDropdown.propTypes = {
  secondaryHeaderItems: arrayOf(node)
}

export default HeaderDropdown
