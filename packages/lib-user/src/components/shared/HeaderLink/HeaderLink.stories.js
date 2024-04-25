import { Box } from 'grommet'

import HeaderLink from './HeaderLink'

export default {
  title: 'Components/shared/HeaderLink',
  component: HeaderLink,
  decorators: [ComponentDecorator]
}

function ComponentDecorator(Story) {
  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'neutral-6'
      }}
      fill
      pad='30px'
    >
      <Box direction='row' flex='shrink'>
        <Story />
      </Box>
    </Box>
  )
}

export const HeaderLinkPrimaryItem = {
  args: {
    href: 'https://zooniverse.org/users/testUser',
    label: 'back to profile',
    primaryItem: true
  }
}
