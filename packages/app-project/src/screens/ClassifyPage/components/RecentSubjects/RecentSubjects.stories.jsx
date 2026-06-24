import { Provider } from 'mobx-react'

import RecentSubjects from './RecentSubjects'
import { CollectionsStoreMock } from './CollectionsStoreMock'
import { RecentsMock, PortraitSubjectsMock, DataSubjectsMock, TextSubjectsMock, VideoSubjectsMock } from './RecentSubjects.mock'

export default {
  title: 'Project App / Screens / Classify / Recent Subjects',
  component: RecentSubjects,
  args: {
    login: 'testuser',
    projectId: '2000',
    userId: '1326053'
  }
}

export function Plain({ login, projectId, userId }) {
  return (
    <Provider store={CollectionsStoreMock}>
      <RecentSubjects
        login={login}
        projectId={projectId}
        recents={RecentsMock}
        slug='zooniverse/snapshot-serengeti'
        userId={userId}
      />
    </Provider>
  )
}

export function Placeholder({ login, projectId, userId }) {
  return (
    <Provider store={CollectionsStoreMock}>
      <RecentSubjects
        login={login}
        projectId={projectId}
        recents={RecentsMock.slice(1)}
        slug='zooniverse/snapshot-serengeti'
        userId={userId}
      />
    </Provider>
  )
}

export function NarrowScreens({ login, projectId, userId }) {
  return (
    <Provider store={CollectionsStoreMock}>
      <RecentSubjects
        login={login}
        projectId={projectId}
        recents={RecentsMock}
        size='small'
        slug='zooniverse/snapshot-serengeti'
        userId={userId}
      />
    </Provider>
  )
}

NarrowScreens.parameters = {
  viewport: {
    defaultViewport: 'iphone5'
  }
}

export function Transcription({ login, projectId, userId }) {
  return (
    <Provider store={CollectionsStoreMock}>
      <RecentSubjects
        login={login}
        projectId={projectId}
        recents={PortraitSubjectsMock}
        slug='zooniverse/notes-from-nature'
        userId={userId}
      />
    </Provider>
  )
}

export function Video({ login, projectId, userId }) {
  return (
    <Provider store={CollectionsStoreMock}>
      <RecentSubjects
        login={login}
        projectId={projectId}
        recents={VideoSubjectsMock}
        slug='spotteron/nestcams'
        userId={userId}
      />
    </Provider>
  )
}

export function Data({ login, projectId, userId }) {
  return (
    <Provider store={CollectionsStoreMock}>
      <RecentSubjects
        login={login}
        projectId={projectId}
        recents={DataSubjectsMock}
        slug='hughdickinson/superwasp-black-hole-hunters'
        userId={userId}
      />
    </Provider>
  )
}

export function Text({ login, projectId, userId }) {
  return (
    <Provider store={CollectionsStoreMock}>
      <RecentSubjects
        login={login}
        projectId={projectId}
        recents={TextSubjectsMock}
        slug='zooniverse/notes-from-nature'
        userId={userId}
      />
    </Provider>
  )
}

export function OneSubject({ login, projectId, userId }) {
  return (
    <Provider store={CollectionsStoreMock}>
      <RecentSubjects
        login={login}
        projectId={projectId}
        recents={RecentsMock.slice(0, 1)}
        slug='spotteron/nestcams'
        userId={userId}
      />
    </Provider>
  )
}

export function NoSubjects({ login, projectId, userId }) {
  return (
    <Provider store={CollectionsStoreMock}>
      <RecentSubjects
        login={login}
        projectId={projectId}
        recents={[]}
        slug='zooniverse/snapshot-serengeti'
        userId={userId}
      />
    </Provider>
  )
}
