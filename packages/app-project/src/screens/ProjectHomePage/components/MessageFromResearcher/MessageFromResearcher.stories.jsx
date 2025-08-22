import { Provider } from 'mobx-react'
import MessageFromResearcherComponent from './MessageFromResearcher'
import {
  MessageFromResearcherProjectNamedMock,
  MessageFromResearcherProjectNoMessageMock,
  MessageFromResearcherProjectNoResearcherMock
} from './MessageFromResearcher.mock'

export default {
  title: 'Project App / Screens / Project Home / Message From Researcher',
  component: MessageFromResearcherComponent
}

export const MessageFromResearcher = () => (
  <Provider store={MessageFromResearcherProjectNamedMock}>
    <MessageFromResearcherComponent />
  </Provider>
)

export const NoMessageFromResearcher = () => (
  <Provider store={MessageFromResearcherProjectNoMessageMock}>
    <MessageFromResearcherComponent />
  </Provider>
)

export const NoResearcher = () => (
  <Provider store={MessageFromResearcherProjectNoResearcherMock}>
    <MessageFromResearcherComponent />
  </Provider>
)
