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

export const Default = {
  args: {
    collection,
    userId: '1234'
  }
}
export const WithLongStrings = {
  args: {
    collection: collectionWithLongStrings,
    userId: '1234'
  }
}
