import { Box } from 'grommet'

import MetadataModal from './MetadataModal'

export default {
  title: 'Components / MetadataIconButton / MetadataModal',
  component: MetadataModal,
  argTypes: {
    closeFn: {
      action: 'clicked'
    }
  },
  args: {
    active: true,
    filters: ['#', '!'],
    metadata: {
      id: 1,
      href: 'https://zooniverse.org',
      '#hidden': true,
      '!onlyTalk': false,
      foo: null
    },
  },
  decorators: [
    (Story) => (
      <Box pad='small'>
        <Story />
      </Box>
    )
  ]
}

export function Default({ active, closeFn, filters, metadata }) {
  return (
    <MetadataModal
      active={active}
      closeFn={closeFn}
      filters={filters}
      metadata={metadata}
    />
  )
}
