import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

import RecentSubjects from './RecentSubjects'

const RECENTS = [
  {
    favorite: false,
    subjectId: '123',
    locations: [
      { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/6fb5eebf-f0e7-4c45-8a47-5750c9e2a0bc.jpeg' }
    ]
  },
  {
    favorite: true,
    subjectId: '456',
    locations: [
      { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/48972f7b-8a4d-4f98-a85b-ed3578db75f0.jpeg' }
    ]
  },
  {
    favorite: false,
    subjectId: '789',
    locations: [
      { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/a7a12f9d-ec79-45d8-b9ed-61886606f5a5.jpeg' }
    ]
  }
]

const PORTRAIT_SUBJECTS = [
  {
    favorite: false,
    subjectId: '123',
    locations: [
      { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/fb2c57e2-96f7-49b1-9bd4-9bdc73d847f8.jpeg' }
    ]
  },
  {
    favorite: true,
    subjectId: '456',
    locations: [
      { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/7be26d91-9dcf-4a50-a443-51ea9c630c0d.jpeg' }
    ]
  },
  {
    favorite: false,
    subjectId: '789',
    locations: [
      { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/8b7deee1-af99-4400-a235-2bbd21ed4c39.jpeg' }
    ]
  }
]

const VIDEO_SUBJECTS = [
  {
    favorite: false,
    subjectId: '123',
    locations: [
      { 'video/mp4': 'https://panoptes-uploads.zooniverse.org/production/subject_location/279b23de-b1e8-4a1c-90c4-2d25bbee787d.mp4' }
    ]
  },
  {
    favorite: true,
    subjectId: '456',
    locations: [
      { 'video/mp4': 'https://panoptes-uploads.zooniverse.org/production/subject_location/64e2df1e-830d-4126-a1bc-8f0eef6e9eb9.mp4' }
    ]
  },
  {
    favorite: false,
    subjectId: '789',
    locations: [
      { 'video/mp4': 'https://panoptes-uploads.zooniverse.org/production/subject_location/d3e90135-efda-4391-b7bf-cbed262c9dc8.mp4' }
    ]
  }
]

function toggle () {
  this.favorite = !this.favorite
}
RECENTS.forEach(recent => {
  recent.toggleFavourite = toggle.bind(recent)
})

export default {
  title: 'Project App / Screens / Classify / Recent Subjects',
  component: RecentSubjects,
  args: {
    dark: false,
    isLoggedIn: true
  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    }
  }
}

export function Plain({ dark, isLoggedIn }) {
  return (
    <Grommet theme={{ ...zooTheme, dark }}>
      <RecentSubjects
        isLoggedIn={isLoggedIn}
        recents={RECENTS}
        projectName='Snapshot Serengeti'
        slug='zooniverse/snapshot-serengeti'
      />
    </Grommet>
  )
}

export function Placeholder({ dark, isLoggedIn }) {
  return (
    <Grommet theme={{ ...zooTheme, dark }}>
      <RecentSubjects
        isLoggedIn={isLoggedIn}
        recents={RECENTS.slice(1)}
        projectName='Snapshot Serengeti'
        slug='zooniverse/snapshot-serengeti'
      />
    </Grommet>
  )
}

export function NarrowScreens({ dark, isLoggedIn }) {
  return (
    <Grommet theme={{ ...zooTheme, dark }}>
      <RecentSubjects
        isLoggedIn={isLoggedIn}
        recents={RECENTS}
        projectName='Snapshot Serengeti'
        size={1}
        slug='zooniverse/snapshot-serengeti'
      />
    </Grommet>
  )
}

NarrowScreens.parameters = {
  viewport: {
    defaultViewport: 'iphone5' 
  }
}

export function Transcription({ dark, isLoggedIn }) {
  return (
    <Grommet theme={{ ...zooTheme, dark }}>
      <RecentSubjects
        isLoggedIn={isLoggedIn}
        recents={PORTRAIT_SUBJECTS}
        projectName='Notes from Nature'
        slug='zooniverse/notes-from-nature'
      />
    </Grommet>
  )
}

export function Video({ dark, isLoggedIn }) {
  return (
    <Grommet theme={{ ...zooTheme, dark }}>
      <RecentSubjects
        isLoggedIn={isLoggedIn}
        recents={VIDEO_SUBJECTS}
        projectName='NestCams'
        slug='spotteron/nestcams'
      />
    </Grommet>
  )
}

export function OneSubject({ dark, isLoggedIn }) {
  return (
    <Grommet theme={{ ...zooTheme, dark }}>
      <RecentSubjects
        isLoggedIn={isLoggedIn}
        recents={RECENTS.slice(0, 1)}
        projectName='NestCams'
        slug='spotteron/nestcams'
      />
    </Grommet>
  )
}
