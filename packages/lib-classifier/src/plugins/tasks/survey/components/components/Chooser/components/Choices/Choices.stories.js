import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import React from 'react'

import Choices from './Choices'
import SurveyTask from '@plugins/tasks/survey'
import { task } from '@plugins/tasks/survey/mock-data'

const mockTask = SurveyTask.TaskModel.create(task)
const filteredChoiceIds = Array.from(mockTask.choicesOrder)

const taskWithMoreThanTwentyChoices = {
  taskKey: 'T0',
  required: false,
  type: 'survey',
  choices: {
    FR1: {
      label: 'Firea',
      images: ['fire-1.jpg']
    },
    KD1: {
      label: 'Kudua',
      images: ['kudu-1.jpg', 'kudu-2.jpg', 'kudu-3.jpg']
    },
    HMN1: {
      label: 'Humana',
      images: []
    },
    LPHNT1: {
      label: 'Elephanta',
      images: ['elephant-1.jpg', 'elephant-2.jpg', 'elephant-3.jpg']
    },
    RDVRK1: {
      label: 'Aardvarka',
      images: ['aardvark-1.jpg', 'aardvark-2.jpg', 'aardvark-3.jpg']
    },
    NTHNGHR1: {
      label: 'Nothing herea',
      images: []
    },
    FR2: {
      label: 'Fireb',
      images: ['fire-1.jpg']
    },
    KD2: {
      label: 'Kudub',
      images: ['kudu-1.jpg', 'kudu-2.jpg', 'kudu-3.jpg']
    },
    HMN2: {
      label: 'Humanb',
      images: []
    },
    LPHNT2: {
      label: 'Elephantb',
      images: ['elephant-1.jpg', 'elephant-2.jpg', 'elephant-3.jpg']
    },
    RDVRK2: {
      label: 'Aardvarkb',
      images: ['aardvark-1.jpg', 'aardvark-2.jpg', 'aardvark-3.jpg']
    },
    NTHNGHR2: {
      label: 'Nothing hereb',
      images: []
    },
    FR3: {
      label: 'Firec',
      images: ['fire-1.jpg']
    },
    KD3: {
      label: 'Kuduc',
      images: ['kudu-1.jpg', 'kudu-2.jpg', 'kudu-3.jpg']
    },
    HMN3: {
      label: 'Humanc',
      images: []
    },
    LPHNT3: {
      label: 'Elephantc',
      images: ['elephant-1.jpg', 'elephant-2.jpg', 'elephant-3.jpg']
    },
    RDVRK3: {
      label: 'Aardvarkc',
      images: ['aardvark-1.jpg', 'aardvark-2.jpg', 'aardvark-3.jpg']
    },
    NTHNGHR3: {
      label: 'Nothing herec',
      images: []
    },
    FR4: {
      label: 'Fired',
      images: ['fire-1.jpg']
    },
    KD4: {
      label: 'Kudud',
      images: ['kudu-1.jpg', 'kudu-2.jpg', 'kudu-3.jpg']
    },
    HMN4: {
      label: 'Humand',
      images: []
    },
    LPHNT4: {
      label: 'Elephantd',
      images: ['elephant-1.jpg', 'elephant-2.jpg', 'elephant-3.jpg']
    },
    RDVRK4: {
      label: 'Aardvarkd',
      images: ['aardvark-1.jpg', 'aardvark-2.jpg', 'aardvark-3.jpg']
    },
    NTHNGHR4: {
      label: 'Nothing hered',
      images: []
    }
  },
  choicesOrder: ['FR1', 'KD1', 'HMN1', 'LPHNT1', 'RDVRK1', 'NTHNGHR1', 'FR2', 'KD2', 'HMN2', 'LPHNT2', 'RDVRK2', 'NTHNGHR2', 'FR3', 'KD3', 'HMN3', 'LPHNT3', 'RDVRK3', 'NTHNGHR3', 'FR4', 'KD4', 'HMN4', 'LPHNT4', 'RDVRK4', 'NTHNGHR4'],
  images: {
    'fire-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/1e3bb2db-9306-42f8-875b-72d0ba189c75.jpeg',
    'kudu-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/d7f2f5b3-f67a-4f58-a230-67b788b9366e.jpeg',
    'kudu-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/039e4bcc-49ea-41a3-8e9b-c1aaec915b31.jpeg',
    'kudu-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/0cb53d01-c77c-422e-ab46-f65c63efe24f.jpeg',
    'empty-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/c034d237-006e-4cfc-8746-c3aa5601f229.jpeg',
    'human-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/93ef6d6e-40db-46a7-9bc2-2ec123ebef0b.jpeg',
    'human-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/4a28216c-97e1-483d-a62a-83e9d93bab0b.jpeg',
    'human-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/dea1c721-b036-4970-99a1-34edeea0feee.jpeg',
    'aardvark-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/c4d29784-5c89-4dbe-b9a8-0d72e804ccad.jpeg',
    'aardvark-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/3ab9ec33-5263-42b9-b207-fa8d17ac09da.jpeg',
    'aardvark-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/5ed0f3dc-6124-4df3-ba84-627e9d0d6f37.jpeg',
    'elephant-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/1b587273-cb20-4173-b87b-5db03f5183e0.jpeg',
    'elephant-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/be4673f4-71ec-4044-848c-75032d1fd290.jpeg',
    'elephant-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/29c1d467-d2e7-4859-aa74-e4f6d64027b2.jpeg'
  }
}
const strings = {}
Object.entries(taskWithMoreThanTwentyChoices.choices).forEach(([choiceID, choice]) => {
  const prefix = `choices.${choiceID}`
  strings[`${prefix}.label`] = choice.label
})
taskWithMoreThanTwentyChoices.strings = strings
const mockTaskWithMoreThanTwentyChoices = SurveyTask.TaskModel.create(taskWithMoreThanTwentyChoices)
const filteredChoiceIdsMoreThanTwenty = Array.from(taskWithMoreThanTwentyChoices.choicesOrder)

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
        background={{
          dark: 'dark-3',
          light: 'neutral-6'
        }}
        pad='medium'
        width='380px'
      >
        {children}
      </Box>
    </Grommet>
  )
}

export default {
  title: 'Tasks / SurveyTask / Chooser / Choices',
  component: Choices
}

const Template = ({ autoFocus, dark, disabled, filteredChoiceIds, task }) => (
  <StoryContext
    theme={{ ...zooTheme, dark }}
  >
    <Choices
      autoFocus={autoFocus}
      disabled={disabled}
      filteredChoiceIds={filteredChoiceIds}
      onChoose={() => console.log('button clicked')}
      task={task}
    />
  </StoryContext>
)

export const LessThirtyMoreTwenty = Template.bind({})
LessThirtyMoreTwenty.args = {
  autoFocus: true,
  dark: false,
  disabled: false,
  filteredChoiceIds: filteredChoiceIdsMoreThanTwenty,
  task: mockTaskWithMoreThanTwentyChoices
}

export const LessTwentyMoreFive = Template.bind({})
LessTwentyMoreFive.args = {
  autoFocus: true,
  dark: false,
  disabled: false,
  filteredChoiceIds,
  task: mockTask
}

export const LessThanSix = Template.bind({})
LessThanSix.args = {
  autoFocus: true,
  dark: false,
  disabled: false,
  filteredChoiceIds: Array.from(filteredChoiceIds).splice(0, 4),
  task: mockTask
}
