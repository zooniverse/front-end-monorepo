import { Box, Menu } from 'grommet'
import { More } from 'grommet-icons'
import { bool, func } from 'prop-types'
import styled from 'styled-components'

import { useTranslation } from '../../../translations/i18n'

const MenuContainer = styled(Box)`
  backdrop-filter: blur(2px);
  background: rgba(64, 64, 64, 0.6);
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.25);
  position: absolute;
  right: 4px;
  top: 4px;
  z-index: 3;
`

const StyledMenu = styled(Menu)`
  height: 100%;
  width: 100%;

  div {
    justify-content: center;
    padding: 0;
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
        icon={<More color='white' size='medium' />}
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
