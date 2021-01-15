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

export function Default ({ choiceId, choiceLabel, dark }) {
  return (
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
}
Default.args = {
  choiceId: 'AARDVARK',
  choiceLabel: 'Aardvark',
  dark: false
}
