import CollectionsList from './CollectionsList'

export default {
  title: 'Project App / Screens / Project Collect / CollectionsList',
  component: CollectionsList
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

const publicSingle = {
  ...collection,
  default_subject_src: 'https://panoptes-uploads.zooniverse.org/subject_location/91a4df56-4cd8-429f-9193-d2d8481f74e5.jpeg',
  display_name: 'Public Single',
  private: false,
  links: {
    ...collection.links,
    collection_roles: ['736999'],
  }
}

const privateSingle = {
  ...collection,
  display_name: 'Private Single',
  private: true,
  links: {
    ...collection.links,
    collection_roles: ['736999'],
  }
}

const publicCollaborators = {
  ...collection,
  display_name: 'Public Collaborators',
  private: false,
  links: {
    ...collection.links,
    collection_roles: ['736999', '755009'],
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
  default_subject_src: 'https://panoptes-uploads.zooniverse.org/subject_location/b2cc2d44-a18b-498a-b60a-bba7541c8822.jpeg',
  display_name: 'Collection With Portrait Cover',
}

const collectionWithFailedCover = {
  ...collection,
  default_subject_src: 'https://static.inaturalist.org/photos/does-not-exist/original.jpg',
  display_name: 'Collection With Failed Cover',
}

const collectionWithVideoCover = {
  ...collection,
  default_subject_src: 'https://panoptes-uploads.zooniverse.org/subject_location/bc64e5d1-669f-4fc5-ad5d-c2b075c67161.mp4',
  display_name: 'Collection With Video Cover',
}

const collectionWithPlotCover = {
  ...collection,
  default_subject_src: 'https://panoptes-uploads.zooniverse.org/subject_location/2e940452-4692-4d7a-b432-e85226652919.json',
  display_name: 'Collection With Plot Cover',
}

const collectionWithVolumetricViewerCover = {
  ...collection,
  default_subject_src: 'https://panoptes-uploads.zooniverse.org/subject_location/336a43be-0625-48e5-9015-596596622e0e.json',
  display_name: 'Collection With Volumetric Viewer Cover',
}

const collectionWithGeoJSONCover = {
  ...collection,
  default_subject_src: 'https://panoptes-uploads.zooniverse.org/subject_location/43bf8fb0-c365-4762-86bf-691c4400fdaf.json',
  display_name: 'Collection With GeoJSON Cover',
}

const collectionWithAudioCover = {
  ...collection,
  default_subject_src: 'https://panoptes-uploads.zooniverse.org/subject_location/4a5b6c7d-8e9f-0123-4567-89abcdef0123.mp3',
  display_name: 'Collection With Audio Cover',
}

const collectionWithTextCover = {
  ...collection,
  default_subject_src: 'https://panoptes-uploads.zooniverse.org/subject_location/f864319c-420e-48fb-99a2-0ca8207a4b95.txt',
  display_name: 'Collection With Text Cover',
}

const collectionsWithImages = [
  collection,
  publicSingle,
  privateSingle,
  publicCollaborators,
  collectionWithLongStrings,
  collectionWithPortraitCover,
  collectionWithFailedCover
]

const collectionsWithOtherMedia = [
  collectionWithVideoCover,
  collectionWithPlotCover,
  collectionWithVolumetricViewerCover,
  collectionWithGeoJSONCover,
  collectionWithAudioCover,
  collectionWithTextCover
]

export const Default = {
  args: {
    collections: collectionsWithImages
  }
}

export const OtherMedia = {
  args: {
    collections: collectionsWithOtherMedia
  }
}
