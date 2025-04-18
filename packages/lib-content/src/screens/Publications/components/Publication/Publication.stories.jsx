import Publication from './Publication.jsx'

export default {
  title: 'About / Publications / Publication',
  component: Publication
}

export const Default = {
  args: {
    avatarSrc: 'https://panoptes-uploads.zooniverse.org/project_avatar/aabb69c7-33a6-4ff1-b101-ec5cddafd196.jpeg',
    authors: 'Blickhan+',
    title: 'Individual vs. Collaborative Methods',
    url: 'https://hal.archives-ouvertes.fr/hal-02280013v2',
    year: '2019'
  }
}

export const MissingUrl = {
  args: {
    ...Default.args,
    url: ''
  }
}
