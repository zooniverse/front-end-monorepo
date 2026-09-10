import { Box } from 'grommet'

import CollectionCard from './CollectionCard'

export default {
  title: 'Components / CollectionCard',
  component: CollectionCard,
  decorators: [(Story) => <Box pad="medium"><Story /></Box>],
}

const collection = {
  id: '574275',
  display_name: 'Best of the Best',
  slug: 'testuser/best-of-the-best',
  default_subject_src: 'https://panoptes-uploads.zooniverse.org/subject_location/c6d3dd9b-4285-4ddb-90ae-08f9558dcae9.jpeg',
  description: `Only the very best subjects I've found in this project. Cool!!`,
  private: true,
  links: {
    owner: {
      id: '1234',
      display_name: 'Test User'
    },
    collection_roles: ['736999', '755009'],
    subjects: [
      '121787506', '120513648', '70200265', '118123956', '113453873', '96755809', '83746800',
      '115968754', '119223066', '75219502', '70429104', '86525036', '78454341', '119560411'
    ]
  }
}

const basicCollection = {
  ...collection,
  default_subject_src: 'https://panoptes-uploads.zooniverse.org/subject_location/91a4df56-4cd8-429f-9193-d2d8481f74e5.jpeg',
  private: false,
  links: {
    ...collection.links,
    collection_roles: ['736999'],
  }
}

const collectionWithLongStrings = {
  id: '574275',
  display_name: 'Best of the Best of the Best of the Best of the Best',
  slug: 'testuser/best-of-the-best',
  default_subject_src: 'https://panoptes-uploads.zooniverse.org/subject_location/2ffdc5bd-c039-4596-b407-af231c00da5a.png',
  description: `Only the very best subjects I've found in this project. Only the very best subjects I've found in this project. Only the very best subjects I've found in this project. Cool!!`,
  private: true,
  links: {
    owner: {
      id: '1234',
      display_name: 'Test User Display Name Is This Long String'
    },
    collection_roles: ['736999', '755009'],
    subjects: Array.from({ length: 123456 }, (_, index) => `${index + 1}`)
  }
}

const collectionWithPortraitCover = {
  ...collection,
  default_subject_src: 'https://panoptes-uploads.zooniverse.org/subject_location/b2cc2d44-a18b-498a-b60a-bba7541c8822.jpeg'
}

export const Default = {
  args: {
    collection,
    userId: '1234'
  }
}

export const PublicSingle = {
  args: {
    collection: basicCollection,
    userId: '1234'
  }
}

export const WithLongStrings = {
  args: {
    collection: collectionWithLongStrings,
    userId: '1234'
  }
}

export const WithPortraitCover = {
  args: {
    collection: collectionWithPortraitCover,
    userId: '1234'
  }
}

export const WithFailedCover = {
  args: {
    collection: {
      ...collection,
      default_subject_src: 'https://static.inaturalist.org/photos/does-not-exist/original.jpg'
    },
    userId: '1234'
  }
}

export const WithVideo = {
  args: {
    collection: {
      ...collection,
      default_subject_src: 'https://panoptes-uploads.zooniverse.org/subject_location/bc64e5d1-669f-4fc5-ad5d-c2b075c67161.mp4'
    },
    userId: '1234'
  }
}

export const WithPlot = {
  args: {
    collection: {
      ...collection,
      default_subject_src: 'https://panoptes-uploads.zooniverse.org/subject_location/2e940452-4692-4d7a-b432-e85226652919.json'
    },
    userId: '1234'
  }
}

export const WithVolumetricViewer = {
  args: {
    collection: {
      ...collection,
      default_subject_src: 'https://panoptes-uploads.zooniverse.org/subject_location/336a43be-0625-48e5-9015-596596622e0e.json'
    },
    userId: '1234'
  }
}

export const WithGeoJSON = {
  args: {
    collection: {
      ...collection,
      default_subject_src: 'https://panoptes-uploads.zooniverse.org/subject_location/43bf8fb0-c365-4762-86bf-691c4400fdaf.json'
    },
    userId: '1234'
  }
}

export const WithAudio = {
  args: {
    collection: {
      ...collection,
      default_subject_src: 'https://panoptes-uploads.zooniverse.org/subject_location/e588bae3-5ed8-49e5-a8f4-97b70b46332b.mpga'
    },
    userId: '1234'
  }
}

export const WithText = {
  args: {
    collection: {
      ...collection,
      default_subject_src: 'https://panoptes-uploads.zooniverse.org/subject_location/f864319c-420e-48fb-99a2-0ca8207a4b95.txt'
    },
    userId: '1234'
  }
}
