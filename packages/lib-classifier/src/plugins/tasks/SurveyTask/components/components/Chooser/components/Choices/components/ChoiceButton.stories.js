import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'

import ChoiceButton from './ChoiceButton'

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
  title: 'Tasks / SurveyTask / ChoiceButton',
  component: ChoiceButton
}

const Template = ({ choiceId, choiceLabel, dark }) => (
  <StoryContext
    theme={{ ...zooTheme, dark }}
  >
    <ChoiceButton
      choiceId={choiceId}
      choiceLabel={choiceLabel}
      onChoose={() => console.log(choiceId)}
    />
  </StoryContext>
)

export const Default = Template.bind({});
Default.args = {
  choiceId: 'AARDVARK',
  choiceLabel: 'Aardvark',
  dark: false
}

export const LongLabel = Template.bind({});
LongLabel.args = {
  choiceId: 'LONG',
  choiceLabel: 'Long label is really long label',
  dark: false
}
