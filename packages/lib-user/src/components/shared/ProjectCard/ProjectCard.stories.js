import { Box } from 'grommet'
import ProjectCard from './ProjectCard.js'
import { PROJECTS } from '../../../../test/mocks/panoptes/projects.js'

export default {
  title: 'Components/shared/ProjectCard',
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
