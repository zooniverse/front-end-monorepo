import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'

import SurveyTask from '@plugins/tasks/survey'
import { task } from '@plugins/tasks/survey/mock-data'
const mockTask = SurveyTask.TaskModel.create(task)

import CharacteristicSection from './CharacteristicSection'

const characteristicLike = mockTask.characteristics.LK

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
      {children}
    </Grommet>
  )
}

export default {
  title: 'Tasks / Survey / Chooser / CharacteristicsFilter / CharacteristicSection',
  component: CharacteristicSection
}

const Template = ({
  characteristic,
  characteristicId,
  dark,
  images,
  selectedValueId,
  strings
}) => (
  <StoryContext
    theme={{ ...zooTheme, dark }}
  >
    <CharacteristicSection
      characteristic={characteristic}
      characteristicId={characteristicId}
      images={images}
      label={strings.get(`characteristics.${characteristicId}.label`)}
      selectedValueId={selectedValueId}
      strings={strings}
    />
  </StoryContext>
)

export const Default = Template.bind({})
Default.args = {
  characteristic: characteristicLike,
  characteristicId: 'LK',
  dark: false,
  images: mockTask.images,
  selectedValueId: '',
  strings: mockTask.strings
}
