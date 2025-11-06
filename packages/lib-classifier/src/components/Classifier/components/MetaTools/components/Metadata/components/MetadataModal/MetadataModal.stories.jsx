import { Box } from 'grommet'
import MetadataModal from './MetadataModal'
import { filters } from './filterByLabel'

const args = {
  active: true,
  filters,
  metadata: {
    id: 1,
    href: 'https://zooniverse.org',
    '#hidden': true,
    '!onlyTalk': false,
    foo: null
  }
}

export default {
  title: 'Meta Tools / MetadataModal',
  component: MetadataModal,
  argTypes: {
    closeFn: {
      action: 'clicked'
    }
  },
  args
}

export function Default({ active, closeFn, filters, metadata }) {
  return (
    <Box pad='12px'>
      <MetadataModal
        active={active}
        closeFn={closeFn}
        filters={filters}
        metadata={metadata}
      />
    </Box>
  )
}
