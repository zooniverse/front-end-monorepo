import { Provider } from 'mobx-react'

import RecentSubjects from './RecentSubjects'
import { CollectionsStoreMock } from './CollectionsStoreMock'
import { RecentsMock, PortraitSubjectsMock, DataSubjectsMock, TextSubjectsMock, VideoSubjectsMock } from './RecentSubjects.mock'

export default {
  title: 'Project App / Screens / Classify / Recent Subjects',
  component: RecentSubjects,
  args: {
    isLoggedIn: true
  }
}

export function Plain({ isLoggedIn }) {
  return (
    <Provider store={CollectionsStoreMock}>
      <RecentSubjects
        isLoggedIn={isLoggedIn}
        recents={RecentsMock}
        slug='zooniverse/snapshot-serengeti'
      />
    </Provider>
  )
}

export function Placeholder({ isLoggedIn }) {
  return (
    <Provider store={CollectionsStoreMock}>
      <RecentSubjects
        isLoggedIn={isLoggedIn}
        recents={RecentsMock.slice(1)}
        slug='zooniverse/snapshot-serengeti'
      />
    </Provider>
  )
}

export function NarrowScreens({ isLoggedIn }) {
  return (
    <Provider store={CollectionsStoreMock}>
      <RecentSubjects
        isLoggedIn={isLoggedIn}
        recents={RecentsMock}
        size={1}
        slug='zooniverse/snapshot-serengeti'
      />
    </Provider>
  )
}

NarrowScreens.parameters = {
  viewport: {
    defaultViewport: 'iphone5'
  }
}

export function Transcription({ isLoggedIn }) {
  return (
    <Provider store={CollectionsStoreMock}>
      <RecentSubjects
        isLoggedIn={isLoggedIn}
        recents={PortraitSubjectsMock}
        slug='zooniverse/notes-from-nature'
      />
    </Provider>
  )
}

export function Video({ isLoggedIn }) {
  return (
    <Provider store={CollectionsStoreMock}>
      <RecentSubjects
        isLoggedIn={isLoggedIn}
        recents={VideoSubjectsMock}
        slug='spotteron/nestcams'
      />
    </Provider>
  )
}

export function Data({ isLoggedIn }) {
  return (
    <Provider store={CollectionsStoreMock}>
      <RecentSubjects
        isLoggedIn={isLoggedIn}
        recents={DataSubjectsMock}
        slug='hughdickinson/superwasp-black-hole-hunters'
      />
    </Provider>
  )
}

export function Text({ isLoggedIn }) {
  return (
    <Provider store={CollectionsStoreMock}>
      <RecentSubjects
        isLoggedIn={isLoggedIn}
        recents={TextSubjectsMock}
        slug='zooniverse/notes-from-nature'
      />
    </Provider>
  )
}

export function OneSubject({ isLoggedIn }) {
  return (
    <Provider store={CollectionsStoreMock}>
      <RecentSubjects
        isLoggedIn={isLoggedIn}
        recents={RecentsMock.slice(0, 1)}
        slug='spotteron/nestcams'
      />
    </Provider>
  )
}
