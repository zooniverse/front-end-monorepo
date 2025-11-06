import { Box, Menu } from 'grommet'
import { SpacedText } from '@zooniverse/react-components'
import { FormDown } from 'grommet-icons'
import styled, { css } from 'styled-components'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { localeMenu } from '@helpers'
import { useStores } from '../../hooks'

const StyledBox = styled(Box)`
  padding: 10px 10px 10px 15px;
  border-radius: 2em;
  color: white;

  ${props =>
    props.isOpen &&
    css`
      background: ${props.theme.global.colors['accent-1']};
    `}

  &:focus,
  &:hover {
    ${props => css`
      background: ${props.theme.global.colors['accent-1']};
      color: ${props.theme.global.colors.brand};
    `}
  }
`

function LocaleSwitcher() {
  const { availableLocales } = useStores()
  const router = useRouter()
  const { asPath, basePath, locale } = router
  const { t } = useTranslation('components')

  const items = availableLocales.map(availableLocale => ({
    href: `${basePath}/${availableLocale}${asPath}`,
    label: <SpacedText>{localeMenu[availableLocale]}</SpacedText>,
    onClick(event) {
      event.preventDefault()
      router.push(asPath, asPath, { locale: availableLocale })
    }
  }))
  return (
    <Menu
      a11yTitle={t('ProjectHeader.LocaleSwitcher.label')}
      alignSelf='center'
      dropAlign={{ top: 'bottom' }}
      dropBackground='brand'
      items={items}
    >
      <StyledBox align='center' direction='row' gap='xsmall' justify='center'>
        <SpacedText weight='bold'>
          {localeMenu[locale]}
        </SpacedText>
        <FormDown />
      </StyledBox>
    </Menu>
  )
}

export default observer(LocaleSwitcher)
