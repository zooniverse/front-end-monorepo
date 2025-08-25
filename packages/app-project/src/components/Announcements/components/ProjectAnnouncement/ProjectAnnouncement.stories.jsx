import { Provider } from 'mobx-react'
import ProjectAnnouncementConnector from './ProjectAnnouncementConnector'

export const mockStore = {
  project: {
    configuration: {
      announcement:
        'Neque magnis massa cum elementum dignissim nibh congue facilisis suscipit dictumst, porta hac porttitor praesent purus velit nullam nascetur eu ultricies libero, ipsum viverra molestie orci mollis faucibus habitant a placerat.'
    }
  },
  ui: {
    dismissProjectAnnouncementBanner: () => {},
    showAnnouncement: true
  }
}

const mockParagraphsStore = {
  project: {
    configuration: {
      announcement: `Welcome to BMT's Documentation Detectives! Check out our project intro video [here](https://www.youtube.com).
Our accession register records may contain offensive and outdated terms. For more information, please see the [Content Note](https://www.zooniverse.org) etc.

We value your feedback and would love to hear your thoughts about our project! If you would like to tell us more, click here: https://www.surveymonkey.com to take part in our survey. The survey is available until Friday 20th September 2024, 4pm (UK time)

New subjects sets have been uploaded to the handwritten workflow today, the next upload will be on the 2nd of October.`
    }
  },
  ui: {
    dismissProjectAnnouncementBanner: () => {},
    showAnnouncement: true
  }
}

export default {
  title:
    'Project App / Screens / Project Home / Announcements / ProjectAnnouncement',
  component: ProjectAnnouncementConnector,
  excludeStories: ['mockStore']
}

export const Default = () => (
  <Provider store={mockStore}>
    <ProjectAnnouncementConnector />
  </Provider>
)

export const MultipleParagraphs = () => (
  <Provider store={mockParagraphsStore}>
    <ProjectAnnouncementConnector />
  </Provider>
)
