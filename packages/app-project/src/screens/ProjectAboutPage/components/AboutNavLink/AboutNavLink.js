import { string, shape } from 'prop-types'
import styled from 'styled-components'
import { useRouter } from 'next/router'

/** Components */
import NavLink from '@shared/components/NavLink'
import { Anchor, Box } from 'grommet'

const StyledAnchor = styled(Anchor)`
  &:hover {
    text-decoration: none;
  }
`

const AboutNavLink = ({ link }) => {
  const { href } = link
  const router = useRouter()
  let isCurrentPage
  if (router?.asPath) {
    const routerPath = router.asPath.split('/')
    const hrefPath = href.split('/')
    /*
      The path arrays will be ['', owner, project, section, ...rest].
      The section is always the fourth item.
    */
    isCurrentPage = routerPath[3] === hrefPath[3]
  }

  return (
    <Box
      background={isCurrentPage ? 'accent-1' : { light: 'neutral-6', dark: '' }}
      pad={{ horizontal: '20px', vertical: '5px' }}
    >
      <NavLink
        aria-current={ isCurrentPage ? 'page' : undefined }
        link={link}
        color={{ dark: 'neutral-6', light: 'dark-3' }}
        weight={isCurrentPage ? 'bold' : 'normal'}
        StyledAnchor={StyledAnchor}
      />
    </Box>
  )
}

AboutNavLink.propTypes = {
  link: shape({
    href: string,
    text: string
  })
}

export default AboutNavLink
