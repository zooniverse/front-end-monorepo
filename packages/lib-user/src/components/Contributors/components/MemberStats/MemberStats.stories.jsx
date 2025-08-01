import { Box } from 'grommet'

import { USER } from '../../../../../test/mocks/panoptes'

import MemberStats from './MemberStats'

export default {
  title: 'Components/Contributors/MemberStats',
  component: MemberStats,
  decorators: [ComponentDecorator]
}

function ComponentDecorator(Story) {
  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'neutral-6'
      }}
      pad='30px'
    >
      <Story />
    </Box>
  )
}

export const Default = {
  args: {
    avatar: USER.avatar_src,
    classifications: 1234,
    displayName: USER.display_name,
    hours: 567,
    login: USER.login
  }
}
