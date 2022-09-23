import { withThemeContext } from '@zooniverse/react-components'
import { Box, Text } from 'grommet'

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
        aria-label='About the Zooniverse'
        as='nav'
        direction='row'
        margin={{ bottom: 'xsmall' }}
        width='xlarge'
      >
        <NavLink label='About' href='/' />
        <NavLink label='Publications' href='/publications' />
        <NavLink label='Our Team' href='/team' />
        <NavLink label='Acknowledgements' href='/acknowledgements' />
        <NavLink label='Resources' href='/resources' />
        <NavLink label='Contact Us' href='/contact' />
        <NavLink label='FAQ' href='/faq' />
        <NavLink label='Highlights Book' href='/highlights' />
        <NavLink label='Mobile App' href='/mobile-app' />
        <NavLink label='Donate' href='/donate' />
      </Box>
    </Box>
  )
}

export default withThemeContext(AboutHeader, theme)
export { AboutHeader }
