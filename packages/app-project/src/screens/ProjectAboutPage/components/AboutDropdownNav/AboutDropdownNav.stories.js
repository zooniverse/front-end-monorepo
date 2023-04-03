import { Box } from 'grommet'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import Router from 'next/router'
import PropTypes from 'prop-types'
import AboutDropdownNav from '../AboutDropdownNav'

function RouterMock({ children }) {
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
      <Box pad='xsmall'>{children}</Box>
    </RouterContext.Provider>
  )
}

RouterMock.propTypes = {
  children: PropTypes.node.isRequired
}

const mockAboutNavLinks = ['research', 'team', 'education', 'faq']

export default {
  title: 'Project App / Screens / About Pages / AboutDropdownNav',
  component: AboutDropdownNav
}

export const Default = ({ dark }) => (
  <RouterMock>
    <AboutDropdownNav aboutNavLinks={[]} />
  </RouterMock>
)

export const MoreLinks = ({ dark }) => (
  <RouterMock>
    <AboutDropdownNav aboutNavLinks={mockAboutNavLinks} />
  </RouterMock>
)
