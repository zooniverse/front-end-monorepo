import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import LocaleSwitcher from './LocaleSwitcher'
import Router from 'next/router'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import PropTypes from 'prop-types'

const LocaleSwitcherStory = {
  title: 'Project App / Shared / Project Header / LocaleSwitcher',
  component: LocaleSwitcher
}

export default LocaleSwitcherStory

const availableLocales = ['en', 'fr']

function RouterMock ({ children }) {
  const mockRouter = {
    asPath: '/projects/zooniverse/snapshot-serengeti/about/research',
    locale: 'en',
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

export const Default = () => (
  <Grommet theme={zooTheme}>
    <RouterMock>
      <LocaleSwitcher availableLocales={availableLocales} />
    </RouterMock>
  </Grommet>
)
