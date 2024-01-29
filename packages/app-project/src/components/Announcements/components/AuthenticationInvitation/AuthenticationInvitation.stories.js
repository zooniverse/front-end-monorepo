import { Provider } from 'mobx-react'

import AuthenticationInvitationConnector from './AuthenticationInvitationConnector'
import readme from './README.md'

export default {
  title: 'Project App / Screens / Project Home / Announcements / AuthenticationInvitation',
  component: AuthenticationInvitationConnector,
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
}

const stores = {
  project: {
    isComplete: false
  },
  ui: {
    setAuthModalActiveIndex: () => {}
  },
  user: {
    isLoggedIn: false,
    personalization: {
      sessionCount: 5
    }
  }
}

export const Default = () => (
  <Provider store={stores}>
    <AuthenticationInvitationConnector />
  </Provider>
)
