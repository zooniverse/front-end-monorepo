import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import React from 'react'

import RadioQuestion from './RadioQuestion'
import { task as mockTask } from '@plugins/tasks/SurveyTask/mock-data'

const questionId = 'HWMN'
const question = mockTask.questions[questionId]
const labels = question.answersOrder.map(answerId => ({
  label: question.answers[answerId].label,
  value: answerId
}))

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
        pad='1em'
        width='380px'
      >
        {children}
      </Box>
    </Grommet>
  )
}

export default {
  title: 'Tasks / SurveyTask / Choice / RadioQuestion',
  component: RadioQuestion
}

const Template = ({ dark, labels, questionId }) => (
  <StoryContext
    theme={{ ...zooTheme, dark }}
  >
    <RadioQuestion
      labels={labels}
      questionId={questionId}
    />
  </StoryContext>
)

export const Default = Template.bind({})
Default.args = {
  dark: false,
  labels,
  questionId
}
