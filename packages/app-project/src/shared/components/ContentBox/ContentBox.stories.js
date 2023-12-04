import ContentBox from './ContentBox'
import { ContentBoxMock } from './ContentBox.mock'

export default {
  title: 'Project App / Shared / ContentBox'
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
