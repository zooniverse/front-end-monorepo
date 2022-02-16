import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import MetadataModal from './MetadataModal'
import { filters } from './filterByLabel'

const args = {
  active: true,
  dark: false,
  filters: filters,
  metadata: {
    id: '1',
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

export function Default({
  active,
  closeFn,
  dark,
  filters,
  metadata
}) {
  const theme = { ...zooTheme, dark }
  return (
    <Grommet
      background={{
        dark: 'dark-3',
        light: 'white'
      }}
      theme={theme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Box pad='12px'>
        <MetadataModal
          active={active}
          closeFn={closeFn}
          filters={filters}
          metadata={metadata}
        />
      </Box>
    </Grommet>
  )
}
