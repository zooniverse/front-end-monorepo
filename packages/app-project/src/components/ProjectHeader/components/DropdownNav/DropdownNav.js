import { SpacedText } from '@zooniverse/react-components'
import { Anchor, Box, DropButton } from 'grommet'
import { FormDown } from 'grommet-icons'
import NavLink from '@shared/components/NavLink'
import { bool, object, oneOfType, string } from 'prop-types'
import { useState } from 'react'
import styled, { css } from 'styled-components'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { useProjectNavigation } from '../../hooks'

const StyledAnchor = styled(Anchor)`
  padding: 10px 20px;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.22);
  &:focus,
  &:hover {
    ${props => css`background: ${props.theme.global.colors['neutral-1']};`}
    text-decoration: none;
  }
`

// `tabindex="-1"` is for the button's open state.
const StyledDropButton = styled(DropButton)`
  padding: 10px 10px 10px 15px;
  border-radius: 2em;
  color: white;

  ${props => props.isOpen && css`
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

const defaultMargin = {
  top: 0
}

function DropdownNav({
  adminMode = false,
  className,
  margin = defaultMargin,
  organizationSlug = '',
  organizationTitle = ''
}) {
  const { t } = useTranslation('components')
  const navLinks = useProjectNavigation(adminMode)
  const [ isOpen, setIsOpen ] = useState(false)

  function onClose() {
    setIsOpen(false)
  }

  function onOpen() {
    setIsOpen(true)
  }

  function NavItem({ navLink }) {
    const router = useRouter()
    let isCurrentPage
    if (router?.asPath) {
      const routerPath = router.asPath.split('/')
      const hrefPath = navLink.href.split('/')
      /*
        The path arrays will be ['', owner, project, section, ...rest].
        The section is always the fourth item.
      */
      isCurrentPage = routerPath[3] === hrefPath[3]
    }

    return (
      <Box as='li' key={navLink.href}>
        <NavLink
          aria-current={isCurrentPage ? 'page' : undefined}
          color='white'
          link={navLink}
          StyledAnchor={StyledAnchor}
          weight='bold'
        />
      </Box>
    )
  }

  /* /about and /classify are internal routes in this Next.js app. The rest are not. */
  const dropContent = (
    <Box
      aria-label={t('ProjectHeader.ProjectNav.ariaLabel')}
      as='nav'
      background='brand'
      elevation='medium'
    >
      <Box as='ul' pad='0'>
      {navLinks?.map(navLink => (
          <NavItem key={navLink.href} navLink={navLink} />
        ))}
        {organizationTitle ? (
          <Box as='li' key={organizationSlug}>
            <StyledAnchor
              href={`/organizations/${organizationSlug}`}
              label={
                <Box pad='none'>
                  <SpacedText color='white' size='xsmall'>
                    {t('ProjectHeader.organization')}
                  </SpacedText>
                  <SpacedText color='white' weight='bold'>
                    {organizationTitle}
                  </SpacedText>
                </Box>
              }
            />
          </Box>
        ) : null}
      </Box>
    </Box>
  )

  return (
    <StyledDropButton
      a11yTitle={t('ProjectHeader.exploreProject')}
      alignSelf='center'
      className={className}
      dropContent={dropContent}
      dropAlign={{ top: 'bottom' }}
      isOpen={isOpen}
      margin={margin}
      onClose={onClose}
      onOpen={onOpen}
    >
      <Box
        align='center'
        as='span'
        direction='row'
        gap='xsmall'
        justify='center'
      >
        <SpacedText weight='bold' style={{ width: 'max-content' }}>
          {t('ProjectHeader.exploreProject')}
        </SpacedText>
        <FormDown />
      </Box>
    </StyledDropButton>
  )
}

DropdownNav.propTypes = {
  /** Zooniverse admin mode */
  adminMode: bool,
  /** CSS class */
  className: string,
  /** Margin for the dropdown button (Grommet t-shirt size, CSS length or Grommet margin object.) */
  margin: oneOfType([string, object]),
  /** Organization slug */
  organizationSlug: string,
  /** Organization title */
  organizationTitle: string
}

export default DropdownNav
// export { DropdownNav, StyledDropButton }
