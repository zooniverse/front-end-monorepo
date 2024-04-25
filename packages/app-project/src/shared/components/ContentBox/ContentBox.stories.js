import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'

import ContentBox from './ContentBox'
import { ContentBoxMock } from './ContentBox.mock'

const mockRouter = {
  asPath: '/zooniverse/snapshot-serengeti/about/team',
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
  title: 'Project App / Shared / ContentBox',
  decorators: [NextRouterStory]
}

export const Plain = () => (
  <ContentBox>{ContentBoxMock.content}</ContentBox>
)

export const ContentWithTitle = () => (
  <ContentBox title={ContentBoxMock.title}>
    {ContentBoxMock.content}
  </ContentBox>
)

export const ContentWithTitleAndALink = () => (
  <ContentBox
    linkLabel={ContentBoxMock.linkLabel}
    linkProps={ContentBoxMock.linkProps}
    title={ContentBoxMock.title}
  >
    {ContentBoxMock.content}
  </ContentBox>
)
