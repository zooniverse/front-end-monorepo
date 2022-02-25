import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import React from 'react'

import ConfusedWith from './ConfusedWith'
import { task as mockTask } from '@plugins/tasks/survey/mock-data'

const KUDU = mockTask.choices.KD

function StoryContext (props) {
  const { children, theme } = props

  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={theme}
      themeMode={(theme.dark) ? 'dark' : 'light'}
    >
      <Box
        align='center'
        width='full'
      >
        <Box
          justify='center'
          height='large'
          width='380px'
        >
          {children}
        </Box>
      </Box>
    </Grommet>
  )
}

export default {
  title: 'Tasks / SurveyTask / Choice / ConfusedWith',
  component: ConfusedWith
}

const Template = ({ choices, confusions, confusionsOrder, dark, images }) => (
  <StoryContext
    theme={{ ...zooTheme, dark }}
  >
    <ConfusedWith
      choices={choices}
      confusions={confusions}
      confusionsOrder={confusionsOrder}
      images={images}
    />
  </StoryContext>
)

export const Default = Template.bind({})
Default.args = {
  choices: mockTask.choices,
  confusions: KUDU.confusions,
  confusionsOrder: KUDU.confusionsOrder,
  dark: false,
  images: mockTask.images
}
