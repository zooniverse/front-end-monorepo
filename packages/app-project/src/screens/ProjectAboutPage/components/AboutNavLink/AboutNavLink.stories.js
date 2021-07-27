import { storiesOf } from '@storybook/react'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'

import AboutNavLink from './AboutNavLink'

const defaultLink = {
  href: '/projects/zooniverse/snapshot-serengeti/about/research',
  text: 'research'
}

const mockedRouter = {
  asPath: '/projects/zooniverse/snapshot-serengeti/about/team',
  query: {
    owner: 'zooniverse',
    project: 'snapshot-serengeti'
  }
}

const currentLink = {
  href: '/projects/zooniverse/snapshot-serengeti/about/team',
  text: 'team'
}

storiesOf('Project App / Screens / About Pages / AboutNavLink', module)
  .add('default', () => (
    <Grommet theme={zooTheme}>
      <AboutNavLink router={mockedRouter} link={defaultLink} />
    </Grommet>
  ))
  .add('current page', () => (
    <Grommet theme={zooTheme}>
      <AboutNavLink router={mockedRouter} link={currentLink} />
    </Grommet>
  ))
