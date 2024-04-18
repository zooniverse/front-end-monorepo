import { Box } from 'grommet'
import ProjectCard from './ProjectCard.js'

const PROJECTS = [
  {
    avatar_src: 'https://panoptes-uploads.zooniverse.org/project_avatar/0c4cfec1-a15b-468e-9f57-e9133993532d.jpeg',
    description: 'Using digital images to investigate ​phenological change in a biodiversity hotspot​',
    display_name: `Notes from Nature - Capturing California's Flowers`,
    id: '1',
    slug: 'md68135/notes-from-nature-capturing-californias-flowers'
  },
  {
    avatar_src: 'https://panoptes-uploads.zooniverse.org/project_avatar/d93adaec-c45e-45c8-a88a-ad68bf90020b.jpeg',
    description: 'Help us understand the historical nesting patterns of these beloved bluebirds!',
    display_name: 'NEST QUEST GO: EASTERN BLUEBIRDS',
    id: '2',
    slug: 'brbcornell/nest-quest-go-eastern-bluebirds'
  },
  {
    avatar_src: 'https://panoptes-uploads.zooniverse.org/project_avatar/442e8392-6c46-4481-8ba3-11c6613fba56.jpeg',
    description: 'Join the Search for Undiscovered Worlds',
    display_name: 'Planet Hunters TESS',
    id: '3',
    slug: 'nora-dot-eisner/planet-hunters-tess'
  },
  {
    avatar_src: 'https://panoptes-uploads.zooniverse.org/project_avatar/252e7e80-949b-4324-8af4-8d3ad7aafbde.jpeg',
    description: 'Investigating race, gender, class, and religion in 18th- and 19th-Century Irish Quaker Documents',
    display_name: 'Corresponding with Quakers',
    id: '4',
    slug: 'rachaelsking/corresponding-with-quakers'
  },
  {
    avatar_src: 'https://panoptes-uploads.zooniverse.org/project_avatar/5dc89775-a658-4d3a-8295-4d48903e142d.jpeg',
    description: 'We need your help to count, identify, and track the giraffes and other wildlife living in our field conservation sites in northern Kenya!',
    display_name: 'Wildwatch Kenya is a short project name compared to the longest live project at 80',
    id: '5',
    slug: 'sandiegozooglobal/wildwatch-kenya'
  }
]


export default {
  title: 'Components / ProjectCard',
  component: ProjectCard
}

export const NfnCaliFlowers = {
  args: {
    displayName: PROJECTS[0].display_name,
    imageSrc: PROJECTS[0].avatar_src,
    ...PROJECTS[0]
  },
  render: args => (
    <Box gap='medium' pad='medium' direction='row'>
      <ProjectCard size='xlarge' {...args} />
      <ProjectCard size='large' {...args} />
      <ProjectCard size='medium' {...args} />
      <ProjectCard size='small' {...args} />
    </Box>
  )
}

/* This code looks repetitive instead of mapping over PROJECTS,
   but Storybook requires named exports, so each project
   is explicitely written out below */

export const NestQuestGo = {
  args: {
    displayName: PROJECTS[1].display_name,
    imageSrc: PROJECTS[1].avatar_src,
    ...PROJECTS[1]
  },
  render: args => (
    <Box gap='medium' pad='medium' direction='row'>
      <ProjectCard size='xlarge' {...args} />
      <ProjectCard size='large' {...args} />
      <ProjectCard size='medium' {...args} />
      <ProjectCard size='small' {...args} />
    </Box>
  )
}

export const PlanetHuntersTess = {
  args: {
    displayName: PROJECTS[2].display_name,
    imageSrc: PROJECTS[2].avatar_src,
    ...PROJECTS[2]
  },
  render: args => (
    <Box gap='medium' pad='medium' direction='row'>
      <ProjectCard size='xlarge' {...args} />
      <ProjectCard size='large' {...args} />
      <ProjectCard size='medium' {...args} />
      <ProjectCard size='small' {...args} />
    </Box>
  )
}

export const CorrespondingWithQuakers = {
  args: {
    displayName: PROJECTS[3].display_name,
    imageSrc: PROJECTS[3].avatar_src,
    ...PROJECTS[3]
  },
  render: args => (
    <Box gap='medium' pad='medium' direction='row'>
      <ProjectCard size='xlarge' {...args} />
      <ProjectCard size='large' {...args} />
      <ProjectCard size='medium' {...args} />
      <ProjectCard size='small' {...args} />
    </Box>
  )
}

export const WildwatchKenya = {
  args: {
    displayName: PROJECTS[4].display_name,
    imageSrc: PROJECTS[4].avatar_src,
    ...PROJECTS[4]
  },
  render: args => (
    <Box gap='medium' pad='medium' direction='row'>
      <ProjectCard size='xlarge' {...args} />
      <ProjectCard size='large' {...args} />
      <ProjectCard size='medium' {...args} />
      <ProjectCard size='small' {...args} />
    </Box>
  )
}
