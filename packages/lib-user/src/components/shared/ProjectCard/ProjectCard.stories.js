import { Box } from 'grommet'
import ProjectCard from './ProjectCard.js'

export default {
  title: 'Components/shared/ProjectCard',
  component: ProjectCard,
  decorators: [ComponentDecorator]
}
function ComponentDecorator (Story) {
  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'neutral-6'
      }}
      fill
      pad='30px'
    >
      <Story />
    </Box>
  )
}

export const Default = {
  args: {
    description: 'Using digital images to investigate ​phenological change in a biodiversity hotspot​',
    displayName: `Notes from Nature - Capturing California's Flowers`,
    href: 'https://www.zooniverse.org/projects/md68135/notes-from-nature-capturing-californias-flowers',
    imageSrc: 'https://panoptes-uploads.zooniverse.org/project_avatar/0c4cfec1-a15b-468e-9f57-e9133993532d.jpeg'
  }
}

export const NestQuestGo = {
  args: {
    description: 'Help us understand the historical nesting patterns of these beloved bluebirds!',
    displayName: 'NEST QUEST GO: EASTERN BLUEBIRDS',
    href: 'https://www.zooniverse.org/projects/brbcornell/nest-quest-go-eastern-bluebirds',
    imageSrc: 'https://panoptes-uploads.zooniverse.org/project_avatar/d93adaec-c45e-45c8-a88a-ad68bf90020b.jpeg'
  }
}

export const PlanetHuntersTess = {
  args: {
    description: 'Join the Search for Undiscovered Worlds',
    displayName: 'Planet Hunters TESS',
    href: 'https://www.zooniverse.org/projects/nora-dot-eisner/planet-hunters-tess',
    imageSrc: 'https://panoptes-uploads.zooniverse.org/project_avatar/442e8392-6c46-4481-8ba3-11c6613fba56.jpeg'
  }
}

export const CorrespondingWithQuakers = {
  args: {
    description: 'Investigating race, gender, class, and religion in 18th- and 19th-Century Irish Quaker Documents',
    displayName: 'Corresponding with Quakers',
    href: 'https://www.zooniverse.org/projects/rachaelsking/corresponding-with-quakers',
    imageSrc: 'https://panoptes-uploads.zooniverse.org/project_avatar/252e7e80-949b-4324-8af4-8d3ad7aafbde.jpeg'
  }
}

export const WildwatchKenya = {
  args: {
    description: 'We need your help to count, identify, and track the giraffes and other wildlife living in our field conservation sites in northern Kenya! We need your help to count, identify, and track the giraffes and other wildlife living in our field conservation sites in northern Kenya!',
    displayName: 'Wildwatch Kenya Wildwatch Kenya Wildwatch Kenya',
    href: 'https://www.zooniverse.org/projects/sandiegozooglobal/wildwatch-kenya',
    imageSrc: 'https://panoptes-uploads.zooniverse.org/project_avatar/5dc89775-a658-4d3a-8295-4d48903e142d.jpeg'
  }
}
