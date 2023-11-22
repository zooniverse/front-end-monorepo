import { Provider } from 'mobx-react'

import Store from '@stores/Store'

import RecentSubjects from './RecentSubjects'
import { CollectionsStoreMock } from './CollectionsStoreMock';
import { RecentsMock, PortraitSubjectsMock, DataSubjectsMock, TextSubjectsMock, VideoSubjectsMock } from './RecentSubjects.mock';

const snapshot = {
  project: {
    strings: {
      display_name: 'Snapshot Serengeti',
    }
  },
  user: {
    collections: {
      collections: [],
    }
  }
}

const store = Store.create(snapshot)

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
        projectName='Snapshot Serengeti'
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
        projectName='Snapshot Serengeti'
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
        projectName='Snapshot Serengeti'
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
        projectName='Notes from Nature'
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
        projectName='NestCams'
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
        projectName='SuperWASP Black Hole Hunters'
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
        projectName='Notes from Nature'
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
        projectName='NestCams'
        slug='spotteron/nestcams'
      />
    </Provider>
  )
}
