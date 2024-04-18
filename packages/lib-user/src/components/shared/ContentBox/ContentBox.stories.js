import { Box, Grid } from 'grommet'

import ContentBox from './ContentBox'

import ProjectCard from '../ProjectCard/ProjectCard'
import { NfnCaliFlowers, NestQuestGo, PlanetHuntersTess, CorrespondingWithQuakers, WildwatchKenya } from '../ProjectCard/ProjectCard.stories'

export default {
  title: 'Components/shared/ContentBox',
  component: ContentBox,
  decorators: [ComponentDecorator]
}

function ComponentDecorator (Story) {
  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'neutral-6'
      }}
      height='900px'
    >
      <Story />
    </Box>
  )
}

export const TopProjectsFull = {
  render: () => (
    <ContentBox
      linkLabel='See more'
      linkProps={{ href: 'https://www.zooniverse.org/projects' }}
      title='Top Projects'
    >
      <Box
        direction='row'
        gap='small'
        pad={{ horizontal: 'xxsmall', bottom: 'xsmall' }}
        overflow={{ horizontal: 'auto' }}
      >
        <ProjectCard {...NfnCaliFlowers.args} />
        <ProjectCard {...NestQuestGo.args} />
        <ProjectCard {...PlanetHuntersTess.args} />
        <ProjectCard {...CorrespondingWithQuakers.args} />
        <ProjectCard {...WildwatchKenya.args} />
      </Box>
    </ContentBox>
  )
}

export const TopProjectsFullWithFewerProjects = {
  render: () => (
    <ContentBox
      linkLabel='See more'
      linkProps={{ href: 'https://www.zooniverse.org/projects' }}
      title='Top Projects'
    >
      <Box
        direction='row'
        gap='small'
        pad={{ horizontal: 'xxsmall', bottom: 'xsmall' }}
        overflow={{ horizontal: 'auto' }}
      >
        <ProjectCard {...NfnCaliFlowers.args} />
        <ProjectCard {...NestQuestGo.args} />
        <ProjectCard {...PlanetHuntersTess.args} />
      </Box>
    </ContentBox>
  )
}

export const TopProjectsSplit = {
  render: () => (
    <ContentBox
      linkLabel='See more'
      linkProps={{ href: 'https://www.zooniverse.org/projects' }}
      title='Top Projects'
      width='625px'
    >
      <Grid
        justify='center'
        columns='1/3'
        gap='small'
      >
        <ProjectCard {...NfnCaliFlowers.args} size='small' />
        <ProjectCard {...NestQuestGo.args} size='small' />
        <ProjectCard {...PlanetHuntersTess.args} size='small' />
        <ProjectCard {...CorrespondingWithQuakers.args} size='small' />
        <ProjectCard {...WildwatchKenya.args} size='small' />
      </Grid>
    </ContentBox>
  )
}

export const NoTitle = {
  render: () => (
    <ContentBox
      linkLabel='See more'
      linkProps={{ href: 'https://www.zooniverse.org/projects' }}
    >
      <Box>
        This is a ContentBox with no title
      </Box>
    </ContentBox>
  )
}

export const NoLink = {
  render: () => (
    <ContentBox
      title='No link'
    >
      <Box>
        This is a ContentBox with no link
      </Box>
    </ContentBox>
  )
}

export const NoTitleNoLink = {
  render: () => (
    <ContentBox>
      <Box>
        This is a ContentBox with no title or link
      </Box>
    </ContentBox>
  )
}
