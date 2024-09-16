import { Provider } from 'mobx-react'
import ProjectAnnouncementConnector from './ProjectAnnouncementConnector'

const ANNOUNCEMENT =
  'Neque magnis massa cum elementum dignissim nibh congue facilisis suscipit dictumst, porta hac porttitor praesent purus velit nullam nascetur eu ultricies libero, ipsum viverra molestie orci mollis faucibus habitant a placerat.'

export const mockStore = {
  project: {
    configuration: {
      announcement: ANNOUNCEMENT
    }
  },
  ui: {
    dismissProjectAnnouncementBanner: () => {},
    showAnnouncement: true
  }
}

export default {
  title: 'Project App / Screens / Project Home / Announcements / ProjectAnnouncement',
  component: ProjectAnnouncementConnector,
  excludeStories: ['mockStore']
}

export const Default = () => (
  <Provider store={mockStore}>
    <ProjectAnnouncementConnector />
  </Provider>
)
