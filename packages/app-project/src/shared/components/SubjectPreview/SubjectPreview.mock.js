import Store from '@stores/Store'

export const SubjectPreviewState = {
  isLoggedIn: true,
  slug: 'zooniverse/snapshot-serengeti',
  subjectId: '123'
}

export const AudioSubjectMock = {
  favorite: false,
  id: SubjectPreviewState.subjectId,
  locations: [
    {
      'audio/mpeg':
        'https://panoptes-uploads.zooniverse.org/production/subject_location/1c93591f-5d7e-4129-a6da-a65419b88048.mpga'
    }
  ]
}

export const PlainSubjectMock = {
  favorite: false,
  id: SubjectPreviewState.subjectId,
  locations: [
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/production/subject_location/48972f7b-8a4d-4f98-a85b-ed3578db75f0.jpeg'
    }
  ]
}

export const TranscriptionSubjectMock = {
  favorite: false,
  id: SubjectPreviewState.subjectId,
  locations: [
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/production/subject_location/fb2c57e2-96f7-49b1-9bd4-9bdc73d847f8.jpeg'
    }
  ]
}

export const VideoSubjectMock = {
  favorite: false,
  id: SubjectPreviewState.subjectId,
  locations: [
    {
      'video/mp4':
        'https://panoptes-uploads.zooniverse.org/production/subject_location/279b23de-b1e8-4a1c-90c4-2d25bbee787d.mp4'
    }
  ]
}

export const TextSubjectMock = {
  favorite: false,
  id: '123',
  locations: [
    {
      'text/plain':
        'https://panoptes-uploads.zooniverse.org/subject_location/f5506d1c-a0e9-4aba-a418-6a6c46a7731a.txt'
    },
  ]
}

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

export const StoreMock = Store.create(snapshot)
