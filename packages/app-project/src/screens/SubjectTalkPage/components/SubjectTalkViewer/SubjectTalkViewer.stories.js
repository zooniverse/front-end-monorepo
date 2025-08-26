import { Box } from 'grommet'

import SubjectTalkViewer from './SubjectTalkViewer'

const SinglePortraitImageSubjectMock = {
  id: '1234',
  locations: [
    {
      'image/jpeg':
        'https://panoptes-uploads-staging.zooniverse.org/subject_location/89cdf135-3349-4149-8255-57bc7875323f.png'
    }
  ],
}

const SingleLandscapeImageSubjectMock = {
  id: '1235',
  locations: [
    {
      'image/jpeg':
        'https://panoptes-uploads-staging.zooniverse.org/subject_location/db95206a-7ddc-4c18-9501-3add4a54a756.jpeg'
    }
  ],
}

const MultiImageSubjectMock = {
  id: '5678',
  locations: [
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/production/subject_location/3eecf251-7205-4ef3-b13f-e930c97d92de.jpeg'
    },
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/production/subject_location/11f98201-1c3f-44d5-965b-e00373daeb18.jpeg'
    },
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/production/subject_location/512649e3-33d7-4811-b0f2-64703e687160.jpeg'
    }
  ]
}

const VideoSubjectMock = {
  id: '91011',
  locations: [
    {
      'video/mp4':
        'https://panoptes-uploads.zooniverse.org/subject_location/5338cc13-764a-4b04-88b4-cab728cb7898.mp4',
    },
  ],
}

export default {
  title: 'Project App / Screens / Subject Talk / SubjectTalkViewer',
  component: SubjectTalkViewer
}

export const SinglePortraitImageSubject = {
  args: {
    subject: SinglePortraitImageSubjectMock
  }
}

export const SingleLandscapeImageSubject = {
  args: {
    subject: SingleLandscapeImageSubjectMock
  }
}

export const MultiImageSubject = {
  args: {
    subject: MultiImageSubjectMock
  }
}

export const VideoSubject = {
  args: {
    subject: VideoSubjectMock
  }
}
