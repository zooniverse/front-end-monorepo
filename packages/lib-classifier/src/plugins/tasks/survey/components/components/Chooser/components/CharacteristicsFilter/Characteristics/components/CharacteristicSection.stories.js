import { Grommet } from 'grommet'
import React from 'react'
import zooTheme from '@zooniverse/grommet-theme'

import SurveyTask from '@plugins/tasks/survey'
import { task } from '@plugins/tasks/survey/mock-data'

import CharacteristicSection from './CharacteristicSection'

const mockTask = SurveyTask.TaskModel.create(task)
const characteristicLike = mockTask.characteristics.LK

export default {
  title: 'Tasks / Survey / Chooser / CharacteristicsFilter / CharacteristicSection',
  component: CharacteristicSection,
  args: {
    dark: false,
    selectedValueId: ''
  },
  argTypes: {
    selectedValueId: {
      type: 'select',
      options: mockTask.characteristics.LK.valuesOrder
    }
  }
}

const background = {
  dark: 'dark-1',
  light: 'light-1'
}

export const Default = ({
  dark,
  selectedValueId
}) => {
  const themeMode = dark ? 'dark' : 'light'

  return (
    <Grommet
      background={background}
      theme={zooTheme}
      themeMode={themeMode}
    >
      <CharacteristicSection
        characteristic={characteristicLike}
        characteristicId='LK'
        images={mockTask.images}
        label={mockTask.strings.get(`characteristics.LK.label`)}
        selectedValueId={selectedValueId}
        strings={mockTask.strings}
      />  
    </Grommet>
  )
}
