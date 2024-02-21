import { SpacedText } from '@zooniverse/react-components'
import { Box, Tab } from 'grommet'

import Tabs from './Tabs.js'

export default {
  title: 'Components/shared/Tabs',
  component: Tabs,
  decorators: [ComponentDecorator]
}

function ComponentDecorator (Story) {
  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'neutral-6'
      }}
      fill
      pad='30px'
    >
      <Story />
    </Box>
  )
}

export const Default = {
  args: {
    children: [
      <Tab key='classifications' title={<SpacedText>classifications</SpacedText>}><Box>Classification bar chart goes here.</Box></Tab>,
      <Tab key='hours' title={<SpacedText>hours</SpacedText>}><Box>Hours bar chart goes here.</Box></Tab>
    ],
    justify: 'start'
  }
}
