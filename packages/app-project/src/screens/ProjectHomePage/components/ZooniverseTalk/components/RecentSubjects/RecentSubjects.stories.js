import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

import RecentSubjects from './RecentSubjects'
import RecentSubjectsCarousel from './RecentSubjectsCarousel'

const SUBJECTS = [
  {
    favorite: false,
    id: '123',
    locations: [
      { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/6fb5eebf-f0e7-4c45-8a47-5750c9e2a0bc.jpeg' }
    ]
  },
  {
    favorite: true,
    id: '456',
    locations: [
      { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/48972f7b-8a4d-4f98-a85b-ed3578db75f0.jpeg' }
    ]
  },
  {
    favorite: false,
    id: '789',
    locations: [
      { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/a7a12f9d-ec79-45d8-b9ed-61886606f5a5.jpeg' }
    ]
  }
]

const PORTRAIT_SUBJECTS = [
  {
    favorite: false,
    id: '123',
    locations: [
      { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/fb2c57e2-96f7-49b1-9bd4-9bdc73d847f8.jpeg' }
    ]
  },
  {
    favorite: true,
    id: '456',
    locations: [
      { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/7be26d91-9dcf-4a50-a443-51ea9c630c0d.jpeg' }
    ]
  },
  {
    favorite: false,
    id: '789',
    locations: [
      { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/8b7deee1-af99-4400-a235-2bbd21ed4c39.jpeg' }
    ]
  }
]

const VIDEO_SUBJECTS = [
  {
    favorite: false,
    id: '123',
    locations: [
      { 'video/mp4': 'https://panoptes-uploads.zooniverse.org/production/subject_location/279b23de-b1e8-4a1c-90c4-2d25bbee787d.mp4' }
    ]
  },
  {
    favorite: true,
    id: '456',
    locations: [
      { 'video/mp4': 'https://panoptes-uploads.zooniverse.org/production/subject_location/64e2df1e-830d-4126-a1bc-8f0eef6e9eb9.mp4' }
    ]
  },
  {
    favorite: false,
    id: '789',
    locations: [
      { 'video/mp4': 'https://panoptes-uploads.zooniverse.org/production/subject_location/d3e90135-efda-4391-b7bf-cbed262c9dc8.mp4' }
    ]
  }
]
export default {
  title: 'Project App / Screens / Project Home / Recent Subjects',
  component: RecentSubjects,
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    }
  }
}

export function Plain() {
  return (
    <Grommet theme={zooTheme}>
      <RecentSubjects
        href='/projects/zooniverse/snapshot-serengeti/talk'
        subjects={SUBJECTS}
      />
    </Grommet>
  )
}

export function CarouselView() {
  return (
    <Grommet theme={zooTheme}>
      <RecentSubjectsCarousel
        href='/projects/zooniverse/snapshot-serengeti/talk'
        subjects={SUBJECTS}
      />
    </Grommet>
  )
}

CarouselView.parameters = {
  viewport: {
    defaultViewport: 'iphone5'
  }
}

export function Transcription() {
  return (
    <Grommet theme={zooTheme}>
      <RecentSubjects
        href='/projects/zooniverse/snapshot-serengeti/talk'
        subjects={PORTRAIT_SUBJECTS}
      />
    </Grommet>
  )
}

export function Video() {
  return (
    <Grommet theme={zooTheme}>
      <RecentSubjects
        href='/projects/zooniverse/snapshot-serengeti/talk'
        subjects={VIDEO_SUBJECTS}
      />
    </Grommet>
  )
}
