# Media request helpers

- [Testing](#testing)
  - [buildMockedMediumResource](#buildMockedMediumResource)

## Testing

### buildMockedMediumResource

A factory function to create a mocked medium resource.

**Function**

``` javascript
import { media } from '@zooniverse/panoptes-js'

const { buildMockedMediumResource } = media.mocks

buildMockedMediumResource('avatar', 'user')
```

**Arguments**

- resourceType _(string)_ - the resource type for the medium: avatar, background, or attached_images
- linkResourceType _(string)_ the link resource type for the medium: field_guides, organizations, projects, tutorials, users

**Returns**

- resource _(object)_ - the mocked medium resource object

**Example**

``` javascript
import { media } from '@zooniverse/panoptes-js'

const { buildMockedMediumResource } = media.mocks

// If calling this...
const mockedMediuaResource = buildMockedMediumResource('avatar', 'user')

// The return would look like this. Note the ID is a random string number between 1-100
{
  content_type: "image/jpeg",
  created_at: "2016-12-07T23:11:47.452Z",
  external_link: false,
  href: '/users/24/avatar`,
  id: '24,
  links: {},
  media_type: 'users_avatar',
  metadata: null,
  src: `https://panoptes-uploads.zooniverse.org/production/users_avatar/random-string-example.jpeg`
  updated_at: "2016-12-07T23:11:47.452Z"
}
```

