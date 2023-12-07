import ProjectCard from './ProjectCard.js'

export default {
  title: 'Components/shared/ProjectCard',
  component: ProjectCard
}

export function Default () {
  return (
    <ProjectCard
      description='Using digital images to investigate ​phenological change in a biodiversity hotspot​'
      displayName={`Notes from Nature - Capturing California's Flowers`}
      href='https://www.zooniverse.org/projects/md68135/notes-from-nature-capturing-californias-flowers'
      imageSrc='https://panoptes-uploads.zooniverse.org/project_avatar/0c4cfec1-a15b-468e-9f57-e9133993532d.jpeg'
    />
  )
}
