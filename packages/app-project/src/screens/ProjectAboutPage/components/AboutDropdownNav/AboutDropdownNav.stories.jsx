import { Box } from 'grommet'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import AboutDropdownNav from '../AboutDropdownNav'

const mockRouter = {
  asPath: '/projects/zooniverse/snapshot-serengeti/about/research',
  push: () => {},
  prefetch: () => new Promise((resolve, reject) => {}),
  query: {
    owner: 'zooniverse',
    project: 'snapshot-serengeti'
  }
}

function RouterMock(Story) {
  return (
    <RouterContext.Provider value={mockRouter}>
      <Box pad='xsmall'>
        <Story />
      </Box>
    </RouterContext.Provider>
  )
}

const alwaysNavLinks = ['research', 'team']
const mockAboutNavLinks = ['research', 'team', 'education', 'faq']

export default {
  title: 'Project App / Screens / About Pages / AboutDropdownNav',
  component: AboutDropdownNav,
  decorators: [RouterMock]
}

export const Default = () => <AboutDropdownNav aboutNavLinks={alwaysNavLinks} />

export const MoreLinks = () => <AboutDropdownNav aboutNavLinks={mockAboutNavLinks} />
