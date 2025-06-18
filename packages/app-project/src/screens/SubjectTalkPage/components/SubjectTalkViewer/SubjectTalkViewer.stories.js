import SubjectTalkViewer from './SubjectTalkViewer'

const SingleImageSubjectMock = {
  id: '1234',
  locations: [
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/production/subject_location/11f98201-1c3f-44d5-965b-e00373daeb18.jpeg',
    },
  ],
}

const MultiImageSubjectMock = {
  id: '5678',
  locations: [
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/production/subject_location/3eecf251-7205-4ef3-b13f-e930c97d92de.jpeg',
    },
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/production/subject_location/11f98201-1c3f-44d5-965b-e00373daeb18.jpeg',
    },
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/production/subject_location/512649e3-33d7-4811-b0f2-64703e687160.jpeg',
    }
  ],
}

export default {
  title: 'Project App / Screens / Subject Talk / SubjectTalkViewer',
  component: SubjectTalkViewer,
}

export const SingleImageSubject = {
  args: {
    subject: SingleImageSubjectMock,
  },
}

export const MultiImageSubject = {
  args: {
    subject: MultiImageSubjectMock,
  },
}
