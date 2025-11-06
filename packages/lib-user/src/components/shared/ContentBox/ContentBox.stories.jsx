import { Box, Grid } from 'grommet'
import ProjectCard from '@zooniverse/react-components/ProjectCard'

import { Tip } from '@components/shared'

import { PROJECTS, USERS } from '../../../../test/mocks/panoptes'

import MemberCard from '../../GroupStats/components/MemberCard'
import ContentBox from './ContentBox'

const NfnCaliFlowers = {
  displayName: PROJECTS[0].display_name,
  imageSrc: PROJECTS[0].avatar_src,
  ...PROJECTS[0]
}

const NestQuestGo = {
  displayName: PROJECTS[1].display_name,
  imageSrc: PROJECTS[1].avatar_src,
  ...PROJECTS[1]
}

const PlanetHuntersTess = {
  displayName: PROJECTS[2].display_name,
  imageSrc: PROJECTS[2].avatar_src,
  ...PROJECTS[2]
}

const CorrespondingWithQuakers = {
  displayName: PROJECTS[3].display_name,
  imageSrc: PROJECTS[3].avatar_src,
  ...PROJECTS[3]
}

const WildwatchKenya = {
  displayName: PROJECTS[4].display_name,
  imageSrc: PROJECTS[4].avatar_src,
  ...PROJECTS[4]
}

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
        <ProjectCard {...NfnCaliFlowers} />
        <ProjectCard {...NestQuestGo} />
        <ProjectCard {...PlanetHuntersTess} />
        <ProjectCard {...CorrespondingWithQuakers} />
        <ProjectCard {...WildwatchKenya} />
      </Box>
    </ContentBox>
  )
}

export const TopProjectsFullWithFewerProjects = {
  render: () => (
    <ContentBox
      title='Top Projects'
    >
      <Box
        direction='row'
        gap='small'
        pad={{ horizontal: 'xxsmall', bottom: 'xsmall' }}
        overflow={{ horizontal: 'auto' }}
      >
        <ProjectCard {...NfnCaliFlowers} />
        <ProjectCard {...NestQuestGo} />
        <ProjectCard {...PlanetHuntersTess} />
      </Box>
    </ContentBox>
  )
}

export const TopProjectsGrid = {
  render: () => (
    <ContentBox
      title='Top Projects'
      width='625px'
    >
      <Grid justify='center' columns='1/3' gap='small'>
        <ProjectCard {...NfnCaliFlowers} size='small' />
        <ProjectCard {...NestQuestGo} size='small' />
        <ProjectCard {...PlanetHuntersTess} size='small' />
        <ProjectCard {...CorrespondingWithQuakers} size='small' />
        <ProjectCard {...WildwatchKenya} size='small' />
      </Grid>
    </ContentBox>
  )
}

export const TopContributors = {
  render: () => (
    <ContentBox
      linkLabel='See all contributors and detailed stats'
      linkProps={{ href: '/groups/12345/contributors' }}
      title='Top Contributors'
      toolTip={
        <Tip
          contentText='Includes active and inactive members.'
          buttonProps={{
            margin: { left: 'xsmall' }
          }}
        />
      }
      width='625px'
    >
      <Grid
        columns={[ 'auto', 'auto' ]}
        gap='small'
        rows={['repeat(5, auto)']}
        style={{ gridAutoFlow: 'column' }}
      >
        {USERS.map((user, index) => (
          <MemberCard
            key={`MemberCard-${index}`}
            avatar={user.avatar_src}
            classifications={Math.floor(Math.random() * 5000)}
            displayName={user.display_name}
            login={user.login}
          />
        ))}
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
