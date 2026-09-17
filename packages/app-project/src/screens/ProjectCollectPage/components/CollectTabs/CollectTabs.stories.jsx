import { Box } from 'grommet'
import { Provider } from 'mobx-react'

import CollectTabs from './CollectTabs'

const loggedOutStore = {
  user: {
    isLoggedIn: false
  }
}

const loggedInStore = {
  user: {
    isLoggedIn: true,
    login: 'test-user'
  }
}

export default {
  title: 'Project App / Screens / Project Collect / CollectTabs',
  component: CollectTabs,
  decorators: [(Story) => (
    <Box pad='medium'>
      <Story />
    </Box>
  )]
}

export function Default(args) {
  return (
    <Provider store={loggedOutStore}>
      <CollectTabs {...args} />
    </Provider>
  )
}
Default.args = {
  activeTab: 'favorites',
  projectDisplayName: 'Test Project',
  projectSlug: 'test-owner/test-project'
}

export function LoggedIn(args) {
  return (
    <Provider store={loggedInStore}>
      <CollectTabs {...args} />
    </Provider>
  )
}
LoggedIn.args = {
  activeTab: 'collections',
  loginParam: 'test-user',
  projectDisplayName: 'Test Project',
  projectSlug: 'test-owner/test-project'
}
