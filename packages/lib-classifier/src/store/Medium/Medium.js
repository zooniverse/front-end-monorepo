import { types } from 'mobx-state-tree'

import Resource from '@store/Resource'

const Medium = types
  .model('Medium', {
    content_type: types.string,
    external_link: types.boolean,
    href: types.string,
    links: types.frozen({
      linked: types.frozen({
        href: types.string,
        id: types.string,
        type: types.string
      })
    }),
    media_type: types.string,
    metadata: types.frozen({}),
    src: types.string
  })

export default types.compose('MediumResource', Resource, Medium)
