import { Box, Menu } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import { SpacedText } from '@zooniverse/react-components'
import { FormDown } from 'grommet-icons'
import styled, { css, withTheme } from 'styled-components'
import { useRouter } from 'next/router'

import { localeMenu } from '@helpers'

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

const LocaleSwitcher = ({ availableLocales }) => {
  const router = useRouter()
  const { asPath, basePath, locale } = router

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

LocaleSwitcher.propTypes = {
  availableLocales: arrayOf(string),
  theme: shape({
    global: shape({
      colors: shape({
        'accent-1': string,
        brand: string
      })
    })
  })
}

export default withTheme(LocaleSwitcher)
export { LocaleSwitcher }
