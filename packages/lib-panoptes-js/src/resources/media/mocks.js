const medium = {
  content_type: 'image/jpeg',
  created_at: '2016-12-07T23:11:47.452Z',
  external_link: false,
  links: {},
  metadata: null,
  updated_at: '2016-12-07T23:11:47.452Z'
}

const mediaResourceTypes = {
  attached_images: 'attached_images',
  avatar: 'avatar',
  background: 'background'
}

const resourcesThatCanHaveMedia = {
  field_guide: 'field_guide',
  organization: 'organization',
  project: 'project',
  tutorial: 'tutorial',
  user: 'user'
}

function getRandomID (min, max) {
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString()
}

export function buildMockedMediumResource (resourceType, linkResourceType) {
  const resource = mediaResourceTypes[resourceType]
  const linkedResource = resourcesThatCanHaveMedia[linkResourceType]
  const randomID = getRandomID(0, 100)
  const mediaType = `${linkedResource}_${resource}`
  return Object.assign({}, medium, {
    href: `/${linkedResource}s/${randomID}/${resource}`,
    id: randomID,
    media_type: mediaType,
    src: `https://panoptes-uploads.zooniverse.org/production/${mediaType}/random-string-example.jpeg`
  })
}
