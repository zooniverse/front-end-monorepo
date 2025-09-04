import { Box } from 'grommet'

import MetaTools from './MetaTools'

export default {
  title: 'Components / MetaTools',
  component: MetaTools,
  decorators: [
    (Story) => (
      <Box
        background={{ dark: 'dark-3', light: 'white' }}
      >
        <Story />
      </Box>
    )
  ]
}

export const LoggedOut = {
  args: {
    invert: false,
    location: {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/3eecf251-7205-4ef3-b13f-e930c97d92de.jpeg'
    },
    login: null,
    onInvert: () => console.log('Invert clicked'),
    projectId: '1234',
    projectSlug: 'test/project',
    subjectId: '5678',
    userId: null
  }
}

export const LoggedIn = {
  args: {
    invert: false,
    location: {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/3eecf251-7205-4ef3-b13f-e930c97d92de.jpeg'
    },
    login: 'zootester1',
    onInvert: () => console.log('Invert clicked'),
    projectId: '1234',
    projectSlug: 'test/project',
    subjectId: '5678',
    userId: '91011'
  }
}

export const NotAnImage = {
  args: {
    invert: false,
    location: {
      'video/mp4': 'https://panoptes-uploads.zooniverse.org/subject_location/5338cc13-764a-4b04-88b4-cab728cb7898.mp4'
    },
    login: 'zootester1',
    onInvert: () => console.log('Invert clicked'),
    projectId: '1234',
    projectSlug: 'test/project',
    subjectId: '5678',
    userId: '91011'
  }
}

export const WithoutInvert = {
  args: {
    location: {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/3eecf251-7205-4ef3-b13f-e930c97d92de.jpeg'
    },
    login: 'zootester1',
    projectId: '1234',
    projectSlug: 'test/project',
    subjectId: '5678',
    userId: '91011'
  }
}
