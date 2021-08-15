import { Grommet, Box } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import Router from 'next/router'
import PropTypes from 'prop-types'
import AboutDropdownNav from '../AboutDropdownNav'

function RouterMock ({ children }) {
  const mockRouter = {
    asPath: '/projects/zooniverse/snapshot-serengeti/about/research',
    push: () => {},
    prefetch: () => new Promise((resolve, reject) => {}),
    query: {
      owner: 'zooniverse',
      project: 'snapshot-serengeti'
    }
  }

  Router.router = mockRouter

  return (
    <RouterContext.Provider value={mockRouter}>
      {children}
    </RouterContext.Provider>
  )
}

RouterMock.propTypes = {
  children: PropTypes.node.isRequired
}

const mockAboutNavLinks = ['research', 'team', 'education', 'faq']

export default {
  title: 'Project App / Screens / About Pages / AboutDropdownNav',
  component: AboutDropdownNav,
  args: {
    dark: false
  }
}

export const Default = ({ dark }) => (
  <RouterMock>
    <Grommet
      background={{ dark: 'dark-3', light: 'neutral-6' }}
      theme={{ ...zooTheme, dark }}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Box pad='xsmall'>
        <AboutDropdownNav aboutNavLinks={[]} />
      </Box>
    </Grommet>
  </RouterMock>
)

export const MoreLinks = ({ dark }) => (
  <RouterMock>
    <Grommet
      background={{ dark: 'dark-3', light: 'neutral-6' }}
      theme={{ ...zooTheme, dark }}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Box pad='xsmall'>
        <AboutDropdownNav aboutNavLinks={mockAboutNavLinks} />
      </Box>
    </Grommet>
  </RouterMock>
)
