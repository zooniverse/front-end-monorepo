import { Anchor, Box } from 'grommet'
import { useRouter } from 'next/router'
import { string, shape } from 'prop-types'
import styled from 'styled-components'

import addQueryParams from '@helpers/addQueryParams'
import NavLink from '@shared/components/NavLink'

const StyledAnchor = styled(Anchor)`
  &:hover {
    text-decoration: none;
  }
`

const AboutNavLink = ({ link }) => {
  const { href } = link
  const router = useRouter()
  const isCurrentPage = router?.isReady && router?.asPath === addQueryParams(href)

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
