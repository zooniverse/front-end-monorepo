import { Box } from 'grommet'
import ProjectCard from './ProjectCard'

export default {
  title: 'Components / ProjectCard',
  component: ProjectCard
}

export const NfnCaliFlowers = {
  args: {
    badge: 3,
    description: 'Using digital images to investigate ​phenological change in a biodiversity hotspot​',
    displayName: `Notes from Nature - Capturing California's Flowers`,
    imageSrc: 'https://panoptes-uploads.zooniverse.org/project_avatar/0c4cfec1-a15b-468e-9f57-e9133993532d.jpeg',
    href: 'https://www.zooniverse.org/projects/md68135/notes-from-nature-capturing-californias-flowers'
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

export const LargeNumbers = {
  args: {
    badge: 3758947489327,
    description: 'Using digital images to investigate ​phenological change in a biodiversity hotspot​',
    displayName: `Notes from Nature - Capturing California's Flowers`,
    imageSrc: 'https://panoptes-uploads.zooniverse.org/project_avatar/0c4cfec1-a15b-468e-9f57-e9133993532d.jpeg',
    href: 'https://www.zooniverse.org/projects/md68135/notes-from-nature-capturing-californias-flowers'
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
    description: 'Join the Search for Undiscovered Worlds',
    displayName: 'Planet Hunters TESS',
    imageSrc: 'https://panoptes-uploads.zooniverse.org/project_avatar/442e8392-6c46-4481-8ba3-11c6613fba56.jpeg',
    href: 'https://www.zooniverse.org/projects/nora-dot-eisner/planet-hunters-tess'
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

export const PausedProject = {
  args: {
    badge: 42,
    description: 'Using digital images to investigate ​phenological change in a biodiversity hotspot​',
    displayName: `Notes from Nature - Capturing California's Flowers`,
    imageSrc: 'https://panoptes-uploads.zooniverse.org/project_avatar/0c4cfec1-a15b-468e-9f57-e9133993532d.jpeg',
    href: 'https://www.zooniverse.org/projects/md68135/notes-from-nature-capturing-californias-flowers',
    state: 'paused',
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

export const FinishedProject = {
  args: {
    description: 'Join the Search for Undiscovered Worlds',
    displayName: 'Planet Hunters TESS',
    imageSrc: 'https://panoptes-uploads.zooniverse.org/project_avatar/442e8392-6c46-4481-8ba3-11c6613fba56.jpeg',
    href: 'https://www.zooniverse.org/projects/nora-dot-eisner/planet-hunters-tess',
    state: 'finished',
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
