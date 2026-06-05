import { Box } from 'grommet'

import SubjectCard from './SubjectCard'

// Beluga Bits subject, landscape, dark
const BELUGA_BITS_SUBJECT = {
  id: '70429104',
  links: { project: '3606' },
  locations: [
    {
      'image/png': 'https://panoptes-uploads.zooniverse.org/subject_location/b723502e-5ca4-40ed-8b8b-5aaaacf7b88d.png'
    }
  ]
}

// Radio Meteor Zoo subject, landscape, dark
const RADIO_METEOR_ZOO_SUBJECT = {
  id: '75219502',
  links: { project: '2471' },
  locations: [
    {
      'image/png': 'https://panoptes-uploads.zooniverse.org/subject_location/2ffdc5bd-c039-4596-b407-af231c00da5a.png'
    }
  ]
}  

// Penguin Watch subject, landscape, busy
const PENGUIN_WATCH_SUBJECT = {
  id: '78454341',
  links: { project: '6263' },
  locations: [
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/c6d3dd9b-4285-4ddb-90ae-08f9558dcae9.jpeg'
    }
  ]
}

// Print subject, portrait, light
const PRINT_SUBJECT = {
  id: '115968754',
  links: { project: '17426' },
  locations: [
    {
      "image/jpeg": "https://panoptes-uploads.zooniverse.org/subject_location/b2cc2d44-a18b-498a-b60a-bba7541c8822.jpeg"
    }
  ]
}

// Iguanas from Above, square
const IGUANAS_FROM_ABOVE_SUBJECT = {
  id: '83746800',
  links: { project: '5110' },
  locations: [
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/91a4df56-4cd8-429f-9193-d2d8481f74e5.jpeg'
    }
  ]
}

// Wildwatch Kenya subject, landscape, busy
const WILDWATCH_KENYA_SUBJECT = {
  id: '86525036',
  links: { project: '2789' },
  locations: [
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/2f27096b-572c-44ea-b287-cdc355e90c54.jpeg'
    }
  ]
}

// Dark Energy Explorers subject, portrait, busy
const DARK_ENERGY_EXPLORERS_SUBJECT = {
  id: '119223066',
  links: { project: '7332' },
  locations: [
    {
      'image/png': 'https://panoptes-uploads.zooniverse.org/subject_location/6022e144-5e70-4973-a9c2-8630a0999c91.png'
    }
  ]
}
  
// Galaxy Zoo subject, square, dark  
const GALAXY_ZOO_SUBJECT = {
  id: '119560411',
  links: { project: '5733' },
  locations: [
    {
      'image/png': 'https://panoptes-uploads.zooniverse.org/subject_location/61281301-f2f2-413b-9314-c163423ac5f7.png'
    }
  ]
}

function StoryRow({
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

export default {
  title: 'Components / SubjectCard',
  component: SubjectCard
}

export const LoggedOutLandscape = {
  render: () => <StoryRow subject={BELUGA_BITS_SUBJECT} />
}

export const LoggedOutLandscapeBusy = {
  render: () => <StoryRow subject={WILDWATCH_KENYA_SUBJECT} />
}

export const LoggedInLandscape = {
  render: () => <StoryRow login={'TestUser'} subject={RADIO_METEOR_ZOO_SUBJECT} />
}

export const LoggedInLandscapeBusy = {
  render: () => <StoryRow login={'TestUser'} subject={PENGUIN_WATCH_SUBJECT} />
}

export const LoggedInPortrait = {
  render: () => <StoryRow login={'TestUser'} subject={PRINT_SUBJECT} />
}

export const LoggedInPortraitBusy = {
  render: () => <StoryRow login={'TestUser'} subject={DARK_ENERGY_EXPLORERS_SUBJECT} />
}

export const LoggedInSquare = {
  render: () => <StoryRow login={'TestUser'} subject={IGUANAS_FROM_ABOVE_SUBJECT} />
}

export const LoggedInSquareDark = {
  render: () => <StoryRow login={'TestUser'} subject={GALAXY_ZOO_SUBJECT} />
}
