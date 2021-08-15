import { Grommet, Grid } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import Router from 'next/router'
import PropTypes from 'prop-types'
import AboutSidebar from './AboutSidebar'

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
  title: 'Project App / Screens / About Pages / AboutSidebar',
  component: AboutSidebar,
  args: {
    dark: false
  }
}

export const Default = ({ dark }) => (
  <RouterMock>
    <Grid columns={['small', 'flex']}>
      <Grommet
        background={{ dark: 'dark-3', light: 'neutral-6' }}
        theme={{ ...zooTheme, dark }}
        themeMode={dark ? 'dark' : 'light'}
      >
        <AboutSidebar aboutNavLinks={[]} />
      </Grommet>
    </Grid>
  </RouterMock>
)

export const MoreLinks = ({ dark }) => (
  <RouterMock>
    <Grid columns={['small', 'flex']}>
      <Grommet
        background={{ dark: 'dark-3', light: 'neutral-6' }}
        theme={{ ...zooTheme, dark }}
        themeMode={dark ? 'dark' : 'light'}
      >
        <AboutSidebar aboutNavLinks={mockAboutNavLinks} />
      </Grommet>
    </Grid>
  </RouterMock>
)
