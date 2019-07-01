import { withThemeContext } from '@zooniverse/react-components'
import { Box, Text } from 'grommet'
import React from 'react'

import NavLink from './components/NavLink'
import theme from './theme'

function AboutHeader () {
  return (
    <Box align='center' as='header' background='brand'>

      <Box margin={{ bottom: 'large', top: 'xlarge' }} width='xlarge'>
        <Text color='white' size='xxlarge'>
          About
        </Text>
      </Box>

      <Box
        as='nav'
        direction='row'
        margin={{ bottom: 'xsmall' }}
        width='xlarge'
      >
        <NavLink label='About' href='/about' />
        <NavLink label='Publications' href='/about/publications' />
        <NavLink label='Our Team' href='/about/team' />
        <NavLink label='Acknowledgements' href='/about/acknowledgements' />
        <NavLink label='Resources' href='/about/resources' />
        <NavLink label='Contact Us' href='/about/contact' />
        <NavLink label='FAQ' href='/about/faq' />
      </Box>
    </Box>
  )
}

export default withThemeContext(AboutHeader, theme)
export { AboutHeader }
