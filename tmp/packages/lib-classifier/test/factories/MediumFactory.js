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
  } })
  .attr('media_type', 'tutorial_attached_image')
  .attr('metadata', {})
  .attr('src', 'https://panoptes-uploads.zooniverse.org/staging/tutorial_attached_image/1ab2bd93-b422-4d10-a700-fa34d4e7e716.gif')

export const FieldGuideMediumFactory = new Factory()
  .extend(medium)
  .attr('content_type', 'image/png')
  .attr('external_link', false)
  .attr('href', ['id'], function (id) {
    return `/field_guides/25/attached_images/${id}`
  })
  .attr('links', {
    linked: {
      href: '/field_guides/25',
      id: '20',
      type: 'field_guides'
    }
  })
  .attr('media_type', 'field_guide_attached_image')
  .attr('metadata', {})
  .attr('src', 'https://panoptes-uploads.zooniverse.org/staging/field_guide_attached_image/a04dc00f-ef28-4e52-9490-368ba9029aca.png')
