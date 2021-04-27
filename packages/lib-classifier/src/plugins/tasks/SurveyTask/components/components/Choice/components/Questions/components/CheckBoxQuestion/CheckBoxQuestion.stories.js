import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import React from 'react'

import CheckBoxQuestion from './CheckBoxQuestion'
import { task as mockTask } from '@plugins/tasks/SurveyTask/mock-data'

const questionId = 'WHTBHVRSDS'
const question = mockTask.questions[questionId]
const options = question.answersOrder.map(answerId => ({
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
        pad='1em'
        width='380px'
      >
        {children}
      </Box>
    </Grommet>
  )
}

export default {
  title: 'Tasks / SurveyTask / Choice / CheckBoxQuestion',
  component: CheckBoxQuestion
}

const Template = ({ dark, options, questionId }) => (
  <StoryContext
    theme={{ ...zooTheme, dark }}
  >
    <CheckBoxQuestion
      options={options}
      questionId={questionId}
    />
  </StoryContext>
)

export const Default = Template.bind({})
Default.args = {
  dark: false,
  options,
  questionId
}
