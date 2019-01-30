import { Factory } from 'rosie'

const medium = new Factory()
  .sequence('id', (id) => { return id.toString() })
  .attr('external_link', false)

export const TutorialMediumFactory = new Factory()
  .extend(medium)
  .attr('content_type', 'image/gif')
  .attr('href', ['id'], function (id) {
    return `/tutorials/20/attached_images/${id}`
  })
  .attr('links', { linked: {
    href: '/tutorials/20',
    id: '20',
    type: 'tutorials'
  }})
  .attr('media_type', 'tutorial_attached_image')
  .attr('metadata', {})
  .attr('src', 'https://panoptes-uploads.zooniverse.org/staging/tutorial_attached_image/1ab2bd93-b422-4d10-a700-fa34d4e7e716.gif')
