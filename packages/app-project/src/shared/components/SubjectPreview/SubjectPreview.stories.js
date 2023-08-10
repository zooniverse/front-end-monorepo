import { Box } from 'grommet'
import { Provider } from 'mobx-react'
import Store from '@stores/Store'

import SubjectPreview from './'

const GIRAFFE = {
  favorite: false,
  id: '123',
  locations: [
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/production/subject_location/48972f7b-8a4d-4f98-a85b-ed3578db75f0.jpeg'
    }
  ]
}

const PORTRAIT_PAGE = {
  favorite: false,
  id: '123',
  locations: [
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/production/subject_location/fb2c57e2-96f7-49b1-9bd4-9bdc73d847f8.jpeg'
    }
  ]
}

const VIDEO = {
  favorite: false,
  id: '123',
  locations: [
    {
      'video/mp4':
        'https://panoptes-uploads.zooniverse.org/production/subject_location/279b23de-b1e8-4a1c-90c4-2d25bbee787d.mp4'
    }
  ]
}

const TEXT_SUBJECT = {
  favorite: false,
  id: '123',
  locations: [
    {
      'text/plain':
        'https://panoptes-uploads.zooniverse.org/subject_location/f5506d1c-a0e9-4aba-a418-6a6c46a7731a.txt'
    },
  ]
}

function toggle() {
  this.favorite = !this.favorite
}

;[GIRAFFE, PORTRAIT_PAGE, VIDEO, TEXT_SUBJECT].forEach(subject => {
  subject.toggleFavourite = toggle.bind(subject)
})

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
  title: 'Project App / Shared / Subject Preview',
  component: SubjectPreview
}

export function Plain({ isLoggedIn, subject, slug }) {
  return (
    <Provider store={store}>
      <Box height='medium' pad='medium' width='medium'>
        <SubjectPreview
          height='200px'
          isLoggedIn={isLoggedIn}
          subject={subject}
          slug={slug}
          width='270px'
        />
      </Box>
    </Provider>
  )
}

Plain.args = {
  isLoggedIn: true,
  subject: GIRAFFE,
  slug: 'zooniverse/snapshot-serengeti'
}

export function Transcription({ isLoggedIn, subject, slug }) {
  return (
    <Provider store={store}>
      <Box height='medium' pad='medium' width='medium'>
        <SubjectPreview
          height='200px'
          isLoggedIn={isLoggedIn}
          subject={subject}
          slug={slug}
          width='270px'
        />
      </Box>
    </Provider>
  )
}

Transcription.args = {
  isLoggedIn: true,
  subject: PORTRAIT_PAGE,
  slug: 'zooniverse/snapshot-serengeti'
}

export function Video({ isLoggedIn, subject, slug }) {
  return (
    <Provider store={store}>
      <Box height='medium' pad='medium' width='medium'>
        <SubjectPreview
          height='200px'
          isLoggedIn={isLoggedIn}
          subject={subject}
          slug={slug}
          width='270px'
        />
      </Box>
    </Provider>
  )
}

Video.args = {
  isLoggedIn: true,
  subject: VIDEO,
  slug: 'zooniverse/snapshot-serengeti'
}

export function Text({ isLoggedIn, subject, slug }) {
  return (
    <Provider store={store}>
      <Box height='medium' pad='medium' width='medium'>
        <SubjectPreview
          height='200px'
          isLoggedIn={isLoggedIn}
          subject={subject}
          slug={slug}
          width='270px'
        />
      </Box>
    </Provider>
  )
}

Text.args = {
  isLoggedIn: true,
  subject: TEXT_SUBJECT,
  slug: 'zooniverse/snapshot-serengeti'
}
