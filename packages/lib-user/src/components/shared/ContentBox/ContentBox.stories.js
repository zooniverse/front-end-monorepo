import { Box, Grid } from 'grommet'
import styled from 'styled-components'

import ContentBox from './ContentBox'

import ProjectCard from '../ProjectCard/ProjectCard'
import { Default as NfNCaliFlowers, NestQuestGo, PlanetHuntersTess, CorrespondingWithQuakers, WildwatchKenya } from '../ProjectCard/ProjectCard.stories'

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
      pad='30px'
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
        <ProjectCard {...NfNCaliFlowers.args} />
        <ProjectCard {...NestQuestGo.args} />
        <ProjectCard {...PlanetHuntersTess.args} />
        <ProjectCard {...CorrespondingWithQuakers.args} />
        <ProjectCard {...WildwatchKenya.args} />
      </Box>
    </ContentBox>
  )
}

export const FewerTopProjectsFull = {
  render: () => (
    <ContentBox
      linkLabel='See more'
      linkProps={{ href: 'https://www.zooniverse.org/projects' }}
      title='Top Projects'
    >
      <Box
        direction='row'
        gap='30px'
        pad={{ horizontal: 'xxsmall', bottom: 'xsmall' }}
        overflow={{ horizontal: 'auto' }}
      >
        <ProjectCard {...NfNCaliFlowers.args} />
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
        columns='1/3'
        gap='small'
      >
        <ProjectCard {...NfNCaliFlowers.args} />
        <ProjectCard {...NestQuestGo.args} />
        <ProjectCard {...PlanetHuntersTess.args} />
        <ProjectCard {...CorrespondingWithQuakers.args} />
        <ProjectCard {...WildwatchKenya.args} />
      </Grid>
    </ContentBox>
  )
}
