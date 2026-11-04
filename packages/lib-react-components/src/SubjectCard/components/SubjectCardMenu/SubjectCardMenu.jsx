import { Box, Menu } from 'grommet'
import { bool, func } from 'prop-types'
import styled from 'styled-components'

import { useTranslation } from '../../../translations/i18n'
import MoreOptionsIcon from './MoreOptionsIcon'

const MenuContainer = styled(Box)`
  position: absolute;
  right: 4px;
  top: 4px;
  z-index: 3;
`

const StyledMenu = styled(Menu)`
  align-items: center;
  border: 1.5px solid transparent;
  border-radius: 50%;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;

  div {
    justify-content: center;
    padding: 0;
  }

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.global.colors['accent-1']};
  }

  &:focus-visible:not(:disabled) {
    border: 1.5px solid ${props => props.theme.global.colors['accent-1']};
    box-shadow: 0px 0px 8px ${props => props.theme.global.colors['accent-1']};
    outline: none;
  }

  &:active:not(:disabled),
  &[aria-expanded='true'] {
    background-color: ${props => props.theme.global.colors['neutral-1']};
  }

  &:hover:not(:disabled),
  &:active:not(:disabled),
  &[aria-expanded='true'] {
    svg {
      filter: none;
    }

    circle {
      fill: ${props => props.theme.global.colors['neutral-6']};
      stroke: ${props => props.theme.global.colors['neutral-6']};
    }
  }
`

function SubjectCardMenu({
  isCover = false,
  onSetCover
}) {
  const { t } = useTranslation()

  const items = [
    {
      disabled: isCover,
      label: t('SubjectCard.setAsCollectionCover'),
      onClick: onSetCover
    }
  ]

  return (
    <MenuContainer
      height='40px'
      pad='none'
      width='40px'
    >
      <StyledMenu
        a11yTitle={t('SubjectCard.moreOptions')}
        dropAlign={{ right: 'right', top: 'bottom' }}
        icon={<MoreOptionsIcon size='22px' />}
        items={items}
      />
    </MenuContainer>
  )
}

SubjectCardMenu.propTypes = {
  isCover: bool,
  onSetCover: func.isRequired
}

export default SubjectCardMenu
