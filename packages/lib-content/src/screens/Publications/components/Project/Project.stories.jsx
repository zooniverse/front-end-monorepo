import Project from './Project'

export default {
  title: 'About / Publications / Project',
  component: Project
}

export const Default = {
  args: {
    avatarSrc: 'https://panoptes-uploads.zooniverse.org/project_avatar/aabb69c7-33a6-4ff1-b101-ec5cddafd196.jpeg',
    projectId: '4973',
    publications: [
      {
        authors: 'Blickhan+',
        title: 'Individual vs. Collaborative Methods',
        url: 'https://hal.archives-ouvertes.fr/hal-02280013v2',
        year: '2019'
      },
      {
        authors: 'Blickhan+',
        title: 'The role of information community',
        url: 'http://doi.org/10.3233/ISU-220169',
        year: '2022'
      }
    ],
    title: 'Project Title'
  }
}

export const PlaceholderAvatar = {
  args: {
    avatarSrc: '',
    projectId: '4973',
    publications: [
      {
        authors: 'Blickhan+',
        title: 'Individual vs. Collaborative Methods',
        url: 'https://hal.archives-ouvertes.fr/hal-02280013v2',
        year: '2019'
      },
      {
        authors: 'Blickhan+',
        title: 'The role of information community',
        url: 'http://doi.org/10.3233/ISU-220169',
        year: '2022'
      }
    ],
    title: 'Project Title'
  }
}
