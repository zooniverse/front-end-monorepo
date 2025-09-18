import { Grid } from 'grommet'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import Router from 'next/router'
import { node } from 'prop-types'
import AboutSidebar from './AboutSidebar'

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
      {children}
    </RouterContext.Provider>
  )
}

RouterMock.propTypes = {
  children: node.isRequired
}

const mockAboutNavLinks = ['research', 'team', 'education', 'faq']

export default {
  title: 'Project App / Screens / About Pages / AboutSidebar',
  component: AboutSidebar
}

export const Default = () => (
  <RouterMock>
    <Grid columns={['small', 'flex']}>
      <AboutSidebar aboutNavLinks={[]} />
    </Grid>
  </RouterMock>
)

export const MoreLinks = () => (
  <RouterMock>
    <Grid columns={['small', 'flex']}>
      <AboutSidebar aboutNavLinks={mockAboutNavLinks} />
    </Grid>
  </RouterMock>
)
