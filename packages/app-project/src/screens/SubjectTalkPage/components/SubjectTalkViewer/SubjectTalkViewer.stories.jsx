import { Box } from 'grommet'

import SubjectTalkViewer from './SubjectTalkViewer'
import { ContainerGrid } from '../../SubjectTalkPage'

const MockTalkDataSection = () => (
  <Box
    gap='small'
    style={{ gridArea: 'talkData' }}
  >
    {/* <TalkSearch /> */}
    <input type='text' placeholder='placeholder text' />
    {/* <TalkData /> */}
    <Box
      background={{
        dark: 'dark-3',
        light: 'white'
      }}
    >
      Talk data goes here
    </Box>
  </Box>
)

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

const VideoSubjectMock = {
  id: '91011',
  locations: [
    {
      'video/mp4':
        'https://panoptes-uploads.zooniverse.org/subject_location/5338cc13-764a-4b04-88b4-cab728cb7898.mp4',
    },
  ],
}

const TranscriptionSubjectMock = {
  id: '121314',
  locations: [
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/subject_location/003bc7bf-078a-432c-8d9f-34f03055e806.jpeg',
    },
  ]
}

const DataSubjectMock = {
  id: '141516',
  locations: [
    {
      'application/json': 'https://panoptes-uploads.zooniverse.org/subject_location/bbb6116d-7591-4e19-8e11-fc597425797a.json'
    },
  ]
}

const VideoAndImagesSubjectMock = {
  id: '151617',
  locations: [
    {
      'video/mp4': 'https://panoptes-uploads.zooniverse.org/subject_location/8e992d90-6cad-49b0-8880-bec28f4de200.mp4'
    },
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/e7d33eb9-1ecd-4bf0-b8ae-d86c7408b739.jpeg'
    },
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/fb845ccb-73ba-4a5f-a323-e96a40d5693b.jpeg'
    },
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/df9dad6e-2dfc-4a82-ab0e-f8220b9986c6.jpeg'
    },
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/741a89b9-d90e-4430-803d-a7ea49415265.jpeg'
    },
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/6a67adae-441d-4d48-9afd-688108b4f97e.jpeg'
    },
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/bd38f4cf-b525-4be8-b5f0-04448b1f2c92.jpeg'
    },
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/dc944e43-2c66-480a-9a23-0594fed1b8d2.jpeg'
    },
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/42d37472-b392-4d31-ab35-f3ae85416226.jpeg'
    },
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/4294bbc2-1049-41d5-beb9-2d409cb48c34.jpeg'
    },
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/51c0aeb9-4177-4a82-919b-04dd7abd9eb2.jpeg'
    },
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/623a1b21-dc92-4bf3-a523-4c284e78255d.jpeg'
    },
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/a23ac07d-a46e-46e5-b646-23e91a0a3629.jpeg'
    },
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/0044b560-a8c3-48c8-8ff7-4d54609d67c8.jpeg'
    },
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/bf572ee5-2ee3-4b8d-9198-d99fb310895a.jpeg'
    },
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/643f4b1f-7d95-435d-8af5-099ff1571a2b.jpeg'
    }
  ]
}

export default {
  title: 'Project App / Screens / Subject Talk / SubjectTalkViewer',
  component: SubjectTalkViewer,
}

export const SingleImageSubject = {
  args: {
    subject: SingleImageSubjectMock,
  },
  decorators: [(Story) => (
    <ContainerGrid>
      <Story />
      <MockTalkDataSection />
    </ContainerGrid>
  )]
}

export const MultiImageSubject = {
  args: {
    subject: MultiImageSubjectMock,
  },
  decorators: [(Story) => (
    <ContainerGrid>
      <Story />
      <MockTalkDataSection />
    </ContainerGrid>
  )]
}

export const VideoSubject = {
  args: {
    subject: VideoSubjectMock,
  },
  decorators: [(Story) => (
    <ContainerGrid>
      <Story />
      <MockTalkDataSection />
    </ContainerGrid>
  )]
}

export const TranscriptionSubject = {
  args: {
    subject: TranscriptionSubjectMock,
  },
  decorators: [(Story) => (
    <ContainerGrid>
      <Story />
      <MockTalkDataSection />
    </ContainerGrid>
  )]
}

export const DataSubject = {
  args: {
    subject: DataSubjectMock,
  },
  decorators: [(Story) => (
    <ContainerGrid>
      <Story />
      <MockTalkDataSection />
    </ContainerGrid>
  )]
}

export const VideoAndImagesSubject = {
  args: {
    subject: VideoAndImagesSubjectMock,
  },
  decorators: [(Story) => (
    <ContainerGrid>
      <Story />
      <MockTalkDataSection />
    </ContainerGrid>
  )]
}
