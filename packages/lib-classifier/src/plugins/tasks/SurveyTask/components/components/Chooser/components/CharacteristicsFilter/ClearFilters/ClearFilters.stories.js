import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'

import ClearFilters from './ClearFilters'

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
  title: 'Tasks / SurveyTask / Chooser / CharacteristicsFilter / ClearFilters',
  component: ClearFilters
}

const Template = ({
  dark,
  showingChoices,
  totalChoices
}) => (
  <StoryContext
    theme={{ ...zooTheme, dark }}
  >
    <ClearFilters
      showingChoices={showingChoices}
      totalChoices={totalChoices}
    />
  </StoryContext>
)

export const Default = Template.bind({})
Default.args = {
  dark: false,
  showingChoices: 5,
  totalChoices: 20
}
