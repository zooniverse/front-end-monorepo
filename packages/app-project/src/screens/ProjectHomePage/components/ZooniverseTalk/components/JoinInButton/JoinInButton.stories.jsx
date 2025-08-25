import JoinInButton from './JoinInButton'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'

const mockRouter = {
  asPath: '/zooniverse/snapshot-serengeti/classify',
  basePath: '/projects',
  locale: 'en',
  push() {},
  prefetch: () => new Promise((resolve, reject) => {}),
  query: {
    owner: 'zooniverse',
    project: 'snapshot-serengeti'
  }
}

function NextRouterStory(Story) {
  return (
    <RouterContext.Provider value={mockRouter}>
      <Story />
    </RouterContext.Provider>
  )
}

export default {
  title: 'Project App / Screens / Project Home / Join In Button',
  component: JoinInButton,
  decorators: [NextRouterStory]
}

export const Default = {}
