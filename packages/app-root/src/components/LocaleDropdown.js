import { Language } from 'grommet-icons'
import { DropButton, Nav, Anchor } from 'grommet'
import styled from 'styled-components'
import { usePathname, useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'

import localeMenu, { supportedLocales } from '../utils/localeMenu'

const StyledDropButton = styled(DropButton)`
  &:hover {
    > svg {
      stroke: white;
    }
  }
`

const StyledUl = styled.ul`
  padding-inline-start: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
`

const StyledLi = styled.li`
  list-style-type: none;
`

const StyledAnchor = styled(Anchor)`
  display: flex;
  padding: 15px;
  justify-content: center;

  &[aria-current='page'] {
    text-decoration: underline;
    background-color: ${props =>
      props.theme.global.colors
        .brand}; // Matches hover and focus styling of our Grommet Select components
  }

  &:hover,
  &:focus,
  &focus-visible {
    background-color: #dddddd66; // Matches hover and focus styling of our Grommet Select components
  }
`

/*
  There are specific route segments where we do NOT want to display the LocaleDropdown.
  The following regex tests the stripLocale(pathname) against the exclusionRoutes array
  because the content on those pages does not have translations enabled.
*/
const exclusionRoutes = [
  '/users/[login]/stats/certificate',
  '/privacy',
  '/security',
  '/youth-privacy'
]

const escapeRegex = str => str.replace(/[.*+?^${}()|\\]/g, '\\$&')

// [^/]+ matches one segment only, so /users/a/b/stats/certificate won't match.
const exclusionPatterns = exclusionRoutes.map(route => {
  const source = route
    .split('/')
    .map(segment => (/^\[[^\]]+\]$/.test(segment) ? '[^/]+' : escapeRegex(segment)))
    .join('/')
  return new RegExp(`^${source}/?$`)
})

function isExcludedRoute(pathname) {
  return exclusionPatterns.some(pattern => pattern.test(pathname))
}

/** Strip the locale code when forming a new href */
function stripLocale(pathname) {
  const [, first, ...rest] = pathname.split('/')
  return supportedLocales.includes(first) ? `/${rest.join('/')}` : pathname
}

/** Do not include 'en' when forming a new href */
const getHrefWithLocale = (href, locale) => {
  return locale !== 'en' ? `/${locale}${href}` : href
}

function LocaleDropdown() {
  const pathname = usePathname()
  const searchParams = useSearchParams().toString()

  const { i18n } = useTranslation()
  const locale = i18n.language

  const noLocalePathname = stripLocale(pathname)
  const excludedRoute = isExcludedRoute(noLocalePathname)

  if (excludedRoute) {
    return null
  }

  // lang={localeCode} lets screen readers pronounce each name correctly.
  const dropContent = (
    <Nav aria-label='List of languages' width='100%' background='neutral-1'>
      <StyledUl as='ul' pad='0' align='center'>
        {Object.entries(localeMenu).map(([localeCode, name]) => (
          <StyledLi key={localeCode}>
            <StyledAnchor
              aria-current={locale === localeCode ? 'page' : undefined}
              href={`${getHrefWithLocale(noLocalePathname, localeCode)}${
                searchParams ? `?${searchParams}` : ''
              }`}
              label={name}
              lang={localeCode}
              color='white'
              plain
              size='1rem'
            />
          </StyledLi>
        ))}
      </StyledUl>
    </Nav>
  )

  return (
    <StyledDropButton
      icon={<Language color='light-5' size='0.8rem' />}
      aria-label='Change Language' // To be translated once it's decided where to store dictionaries of text content definied directly in app-root (like metadata too)
      dropContent={dropContent}
      plain
      margin={{ right: 'small' }}
      dropAlign={{ top: 'bottom' }}
    />
  )
}

export default LocaleDropdown
