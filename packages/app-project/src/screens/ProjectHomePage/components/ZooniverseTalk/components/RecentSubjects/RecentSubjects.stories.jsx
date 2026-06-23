import { Box } from 'grommet'

import RecentSubjects from './RecentSubjects'
import RecentSubjectsCarousel from './RecentSubjectsCarousel'

const SUBJECTS = [
  {
    id: '123',
    locations: [
      {
        'image/jpeg':
          'https://panoptes-uploads.zooniverse.org/subject_location/6fb5eebf-f0e7-4c45-8a47-5750c9e2a0bc.jpeg'
      }
    ],
    metadata: {
      title: 'Subject 123',
      type: ['image/jpeg']
    }
  },
  {
    id: '456',
    locations: [
      {
        'image/jpeg':
          'https://panoptes-uploads.zooniverse.org/subject_location/48972f7b-8a4d-4f98-a85b-ed3578db75f0.jpeg'
      }
    ],
    metadata: {
      title: 'Subject 456',
      type: ['image/jpeg']
    }
  },
  {
    id: '789',
    locations: [
      {
        'image/jpeg':
          'https://panoptes-uploads.zooniverse.org/subject_location/a7a12f9d-ec79-45d8-b9ed-61886606f5a5.jpeg'
      }
    ],
    metadata: {
      title: 'Subject 789',
      type: ['image/jpeg']
    }
  }
]

const PORTRAIT_SUBJECTS = [
  {
    id: '123',
    locations: [
      {
        'image/jpeg':
          'https://panoptes-uploads.zooniverse.org/production/subject_location/fb2c57e2-96f7-49b1-9bd4-9bdc73d847f8.jpeg'
      }
    ],
    metadata: {
      title: 'Subject 123',
      type: ['image/jpeg']
    }
  },
  {
    id: '456',
    locations: [
      {
        'image/jpeg':
          'https://panoptes-uploads.zooniverse.org/production/subject_location/7be26d91-9dcf-4a50-a443-51ea9c630c0d.jpeg'
      }
    ],
    metadata: {
      title: 'Subject 456',
      type: ['image/jpeg']
    }
  },
  {
    id: '789',
    locations: [
      {
        'image/jpeg':
          'https://panoptes-uploads.zooniverse.org/production/subject_location/8b7deee1-af99-4400-a235-2bbd21ed4c39.jpeg'
      }
    ],
    metadata: {
      title: 'Subject 789',
      type: ['image/jpeg']
    }
  }
]

const VIDEO_SUBJECTS = [
  {
    id: '123',
    locations: [
      {
        'video/mp4':
          'https://panoptes-uploads.zooniverse.org/production/subject_location/279b23de-b1e8-4a1c-90c4-2d25bbee787d.mp4'
      }
    ],
    metadata: {
      title: 'Subject 123',
      type: ['video/mp4']
    }
  },
  {
    id: '456',
    locations: [
      {
        'video/mp4':
          'https://panoptes-uploads.zooniverse.org/production/subject_location/64e2df1e-830d-4126-a1bc-8f0eef6e9eb9.mp4'
      }
    ],
    metadata: {
      title: 'Subject 456',
      type: ['video/mp4']
    }
  },
  {
    id: '789',
    locations: [
      {
        'video/mp4':
          'https://panoptes-uploads.zooniverse.org/production/subject_location/d3e90135-efda-4391-b7bf-cbed262c9dc8.mp4'
      }
    ],
    metadata: {
      title: 'Subject 789',
      type: ['video/mp4']
    }
  }
]

const DATA_SUBJECTS = [
  {
    id: '69809594',
    locations: [
      {
        'application/json':
          'https://panoptes-uploads.zooniverse.org/subject_location/74fddc9b-790d-47c6-9eac-110c64022ea8.json'
      }
    ],
    metadata: {
      title: 'Subject 69809594',
      type: ['application/json']
    }
  },
  {
    id: '69807024',
    locations: [
      {
        'application/json':
          'https://panoptes-uploads.zooniverse.org/subject_location/57b7546c-1810-4525-95e9-98d7c792b36b.json'
      }
    ],
    metadata: {
      title: 'Subject 69807024',
      type: ['application/json']
    }
  },
  {
    id: '69807855',
    locations: [
      {
        'application/json':
          'https://panoptes-uploads.zooniverse.org/subject_location/f311cd2a-f6c7-4cc2-a411-0e32c5ff55e3.json'
      }
    ],
    metadata: {
      title: 'Subject 69807855',
      type: ['application/json']
    }
  }
]

const TEXT_SUBJECTS = [
  {
    id: '123',
    locations: [
      {
        'text/plain':
          'https://panoptes-uploads.zooniverse.org/subject_location/f5506d1c-a0e9-4aba-a418-6a6c46a7731a.txt'
      }
    ],
    metadata: {
      title: 'Subject 123',
      type: ['text/plain']
    }
  },
  {
    id: '456',
    locations: [
      {
        'text/plain':
          'https://panoptes-uploads.zooniverse.org/subject_location/5e4a7f1a-3427-4772-912d-80b0de90acc7.txt'
      }
    ],
    metadata: {
      title: 'Subject 456',
      type: ['text/plain']
    }
  },
  {
    id: '789',
    locations: [
      {
        'text/plain':
          'https://panoptes-uploads.zooniverse.org/subject_location/47c72ca1-55e0-446d-afdf-9e0b29219b06.txt'
      }
    ],
    metadata: {
      title: 'Subject 789',
      type: ['text/plain']
    }
  }
]

export default {
  title: 'Project App / Screens / Project Home / Recent Subjects',
  component: RecentSubjects
}

export function Plain() {
  return (
    <RecentSubjects
      login='zootester'
      projectId='123'
      projectSlug='zooniverse/snapshot-serengeti'
      subjects={SUBJECTS}
      userId='1'
    />
  )
}

export function CarouselView() {
  return (
    <Box>
      <RecentSubjectsCarousel
        login='zootester'
        projectId='123'
        projectSlug='zooniverse/snapshot-serengeti'
        subjects={SUBJECTS}
        userId='1'
      />
    </Box>
  )
}

CarouselView.parameters = {
  viewport: {
    defaultViewport: 'iphone5'
  }
}

export function Transcription() {
  return (
    <RecentSubjects
      login='zootester'
      projectId='123'
      projectSlug='zooniverse/snapshot-serengeti'
      subjects={PORTRAIT_SUBJECTS}
      userId='1'
    />
  )
}

export function Video() {
  return (
    <RecentSubjects
      login='zootester'
      projectId='123'
      projectSlug='zooniverse/snapshot-serengeti'
      subjects={VIDEO_SUBJECTS}
      userId='1'
    />
  )
}

export function Data() {
  return (
    <RecentSubjects
      login='zootester'
      projectId='456'
      projectSlug='hughdickinson/superwasp-black-hole-hunters'
      subjects={DATA_SUBJECTS}
      userId='1'
    />
  )
}

export function Text() {
  return (
    <RecentSubjects
      login='zootester'
      projectId='789'
      projectSlug='zooniverse/notes-from-nature'
      subjects={TEXT_SUBJECTS}
      userId='1'
    />
  )
}
