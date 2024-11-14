import { SpacedText } from '@zooniverse/react-components'
import { Anchor, Box } from 'grommet'
import { useRouter } from 'next/router'
import { bool } from 'prop-types'
import styled, { css } from 'styled-components'
import { useTranslation } from 'next-i18next'

import NavLink from '@shared/components/NavLink'
import { useProjectNavigation } from '../../hooks'

/**
  Link text styles
*/
const StyledSpacedText = styled(SpacedText)`
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.22);
`

/**
  Link styles
*/
const StyledAnchor = styled(Anchor)`
  border-bottom: 3px solid transparent;
  border-top: 3px solid transparent; // to help align-items center in nav
  white-space: nowrap;

  &:hover {
    text-decoration: none;
  }
  ${props => css`
    &[href]:hover {
      border-bottom-color: ${props.color};
    }
    &[aria-current='page'] {
      cursor: default;
      border-bottom-color: ${props.color};
    }
  `}
`

const StyledList = styled(Box)`
  padding-inline-start: 0;
`

function NavItem({ navLink }) {
  const router = useRouter()

  let isCurrentPage
  if (router?.isReady) {
    const routerPath = router.asPath.split('/')
    const hrefPath = navLink.href.split('/')
    /*
      Client-side routerPath will be ['', owner, project, section, ...rest].
      The link hrefPath will be ['', owner, project, section, ...rest].
      The section is always the fourth item in the array.
    */
    isCurrentPage = routerPath[3] === hrefPath[3]
  }

  return (
    <Box as='li' key={navLink.href} flex='grow' pad={{ left: 'small' }}>
      <NavLink
        aria-current={isCurrentPage ? 'page' : undefined}
        color='white'
        link={navLink}
        StyledAnchor={StyledAnchor}
        StyledSpacedText={StyledSpacedText}
        weight='bold'
      />
    </Box>
  )
}

/* /about and /classify are internal routes in this Next.js app. The rest are not. */
function Nav({ adminMode = false }) {
  const navLinks = useProjectNavigation(adminMode)
  const { t } = useTranslation('components')
  return (
    <Box aria-label={t('ProjectHeader.ProjectNav.ariaLabel')} as='nav'>
      <StyledList forwardedAs='ul' direction='row'>
        {navLinks?.map(navLink => (
          <NavItem key={navLink.href} navLink={navLink} />
        ))}
      </StyledList>
    </Box>
  )
}

Nav.propTypes = {
  /** Zooniverse admin mode */
  adminMode: bool
}

export default Nav
