import { Box } from 'grommet'

import SubjectCard from '../SubjectCard'

const DEFAULT_METADATA = {
  id: 1,
  href: 'https://zooniverse.org',
  '#hidden': 'hidden value',
  '!onlyTalk': 'only talk value',
  foo: null
}

export const BELUGA_BITS_SUBJECT = {
  id: '70429104',
  links: { project: '3606' },
  locations: [
    {
      'image/png': 'https://panoptes-uploads.zooniverse.org/subject_location/b723502e-5ca4-40ed-8b8b-5aaaacf7b88d.png'
    }
  ],
  metadata: DEFAULT_METADATA
}

export const RADIO_METEOR_ZOO_SUBJECT = {
  id: '75219502',
  links: { project: '2471' },
  locations: [
    {
      'image/png': 'https://panoptes-uploads.zooniverse.org/subject_location/2ffdc5bd-c039-4596-b407-af231c00da5a.png'
    }
  ],
  metadata: DEFAULT_METADATA
}

export const PENGUIN_WATCH_SUBJECT = {
  id: '78454341',
  links: { project: '6263' },
  locations: [
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/c6d3dd9b-4285-4ddb-90ae-08f9558dcae9.jpeg'
    }
  ],
  metadata: DEFAULT_METADATA
}

export const PRINT_SUBJECT = {
  id: '115968754',
  links: { project: '17426' },
  locations: [
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/b2cc2d44-a18b-498a-b60a-bba7541c8822.jpeg'
    }
  ],
  metadata: DEFAULT_METADATA
}

export const IGUANAS_FROM_ABOVE_SUBJECT = {
  id: '83746800',
  links: { project: '5110' },
  locations: [
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/91a4df56-4cd8-429f-9193-d2d8481f74e5.jpeg'
    }
  ],
  metadata: DEFAULT_METADATA
}

export const WILDWATCH_KENYA_SUBJECT = {
  id: '86525036',
  links: { project: '2789' },
  locations: [
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/2f27096b-572c-44ea-b287-cdc355e90c54.jpeg'
    }
  ],
  metadata: DEFAULT_METADATA
}

export const DARK_ENERGY_EXPLORERS_SUBJECT = {
  id: '119223066',
  links: { project: '7332' },
  locations: [
    {
      'image/png': 'https://panoptes-uploads.zooniverse.org/subject_location/6022e144-5e70-4973-a9c2-8630a0999c91.png'
    }
  ],
  metadata: DEFAULT_METADATA
}

export const GALAXY_ZOO_SUBJECT = {
  id: '119560411',
  links: { project: '5733' },
  locations: [
    {
      'image/png': 'https://panoptes-uploads.zooniverse.org/subject_location/61281301-f2f2-413b-9314-c163423ac5f7.png'
    }
  ],
  metadata: DEFAULT_METADATA
}

export const FLORIDA_KEYS_SUBJECT = {
  id: '120994401',
  links: { project: '24617' },
  locations: [
    {
      'video/mp4': 'https://panoptes-uploads.zooniverse.org/subject_location/bc64e5d1-669f-4fc5-ad5d-c2b075c67161.mp4'
    }
  ],
  metadata: DEFAULT_METADATA
}

export const WOODPECKER_CAVITY_CAM_SUBJECT = {
  id: '84034748',
  links: { project: '12767' },
  locations: [
    {
      'video/mp4': 'https://panoptes-uploads.zooniverse.org/subject_location/6d83e7bd-14d1-41cb-8245-8d70a4d3921a.mp4'
    }
  ],
  metadata: DEFAULT_METADATA
}

export const BLACK_HOLE_HUNTERS_SUBJECT = {
  id: '95577274',
  links: { project: '14770' },
  locations: [
    {
      'application/json': 'https://panoptes-uploads.zooniverse.org/subject_location/2e940452-4692-4d7a-b432-e85226652919.json'
    }
  ],
  metadata: DEFAULT_METADATA
}

export const MIND_MAPPER_SUBJECT = {
  id: '113452377',
  links: { project: '25108' },
  locations: [
    {
      'application/json': 'https://panoptes-uploads.zooniverse.org/subject_location/336a43be-0625-48e5-9015-596596622e0e.json'
    }
  ],
  metadata: {
    ...DEFAULT_METADATA,
    'metadata:volumetric': 'true'
  }
}

export const NOTES_FROM_NATURE_GEOJSON_SUBJECT = {
  id: '118377532',
  links: { project: '31997' },
  locations: [
    {
      'application/json': 'https://panoptes-uploads.zooniverse.org/subject_location/43bf8fb0-c365-4762-86bf-691c4400fdaf.json'
    }
  ],
  metadata: DEFAULT_METADATA
}

export const FROG_FIND_SUBJECT = {
  id: '85811604',
  links: { project: '15424' },
  locations: [
    {
      'audio/mpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/e588bae3-5ed8-49e5-a8f4-97b70b46332b.mpga'
    }
  ],
  metadata: DEFAULT_METADATA
}

export const NOTES_FROM_NATURE_TEXT_SUBJECT = {
  id: '88727951',
  links: { project: '9485' },
  locations: [
    {
      'text/plain': 'https://panoptes-uploads.zooniverse.org/subject_location/f864319c-420e-48fb-99a2-0ca8207a4b95.txt'
    }
  ],
  metadata: DEFAULT_METADATA
}

export const SMITHSONIAN_WILDLIFE_MULTI_IMAGE_SUBJECT = {
  id: '121787506',
  links: { project: '31959' },
  locations: [
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/e0d9ca1b-778e-426c-ba96-eeb5bf4fce35.jpeg'
    },
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/909abfce-2a23-49ff-8ab0-f386d045e917.jpeg'
    },
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/0edc85fe-dd12-4f35-a73c-de5f0e18af08.jpeg'
    },
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/2d9e24c6-d8cc-417e-bb06-871dbbf5948d.jpeg'
    },
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/5abd63db-4180-4899-aca5-9ef79a01bd77.jpeg'
    },
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/8f00b8f2-d90f-426e-98c3-e60967125fe4.jpeg'
    },
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/cdb96c0c-bcf4-4ffb-93b0-fa6db9533da9.jpeg'
    },
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/c9963b08-3c91-42db-b894-dde0dd53ab23.jpeg'
    },
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/df06afff-52f6-4ceb-92dd-bdd6cbddc20e.jpeg'
    },
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/c4565b17-4afe-4a2f-be8c-6497ec25feee.jpeg'
    }
  ],
  metadata: DEFAULT_METADATA
}

export function StoryRow({
  login,
  subject
}) {
  const projectSlug = 'team/example-project'
  const userId = login ? '1234' : null

  return (
    <Box direction='row' gap='medium' pad='medium'>
      <SubjectCard
        login={login}
        projectId={subject.links.project}
        projectSlug={projectSlug}
        size='large'
        subject={subject}
        userId={userId}
      />
      <SubjectCard
        login={login}
        projectId={subject.links.project}
        projectSlug={projectSlug}
        size='medium'
        subject={subject}
        userId={userId}
      />
      <SubjectCard
        login={login}
        projectId={subject.links.project}
        projectSlug={projectSlug}
        size='small'
        subject={subject}
        userId={userId}
      />
    </Box>
  )
}

export function InteractiveStory({
  login,
  subject
}) {
  const projectSlug = 'team/example-project'
  const userId = login ? '1234' : null

  return (
    <Box direction='row' gap='medium' pad='medium'>
      <SubjectCard
        interactive={true}
        login={login}
        projectId={subject.links.project}
        projectSlug={projectSlug}
        subject={subject}
        userId={userId}
      />
    </Box>
  )
}
