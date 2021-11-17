import { SpacedText } from '@zooniverse/react-components'
import { Anchor } from 'grommet'
import Link from 'next/link'
import styled, { css, withTheme } from 'styled-components'
import localeMenu from '@helpers/localeMenu'
import { useRouter } from 'next/router'

const StyledAnchor = styled(Anchor)`
  padding: 10px 20px;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.22);
  &:focus,
  &:hover {
    ${props =>
      css`
        background: ${props.theme.global.colors['neutral-1']};
      `}
    text-decoration: none;
  }
`

const LocaleLink = ({ availableLocale }) => {
  const router = useRouter()
  const { pathname, query, asPath } = router

  const label = (
    <SpacedText>
      {localeMenu[availableLocale]}
    </SpacedText>
  )

  return (
    <Link href={{ pathname, query }} as={asPath} locale={availableLocale} passHref>
      <StyledAnchor label={label} />
    </Link>
  )
}

export default withTheme(LocaleLink)
export { LocaleLink }
