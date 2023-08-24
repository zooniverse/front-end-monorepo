import { Grommet } from 'grommet'
import { zooTheme } from '@zooniverse/grommet-theme'
import ContentBox from './ContentBox'
import { ContentBoxMock } from './ContentBox.mock'

export default {
  title: 'Project App / Shared / ContentBox'
}

export const Plain = () => (
  <Grommet theme={zooTheme}>
    <ContentBox>{ContentBoxMock.content}</ContentBox>
  </Grommet>
)

export const ContentWithTitle = () => (
  <Grommet theme={zooTheme}>
    <ContentBox title={ContentBoxMock.title}>
      {ContentBoxMock.content}
    </ContentBox>
  </Grommet>
)

export const ContentWithTitleAndALink = () => (
  <Grommet theme={zooTheme}>
    <ContentBox
      linkLabel={ContentBoxMock.linkLabel}
      linkProps={ContentBoxMock.linkProps}
      title={ContentBoxMock.title}
    >
      {ContentBoxMock.content}
    </ContentBox>
  </Grommet>
)
