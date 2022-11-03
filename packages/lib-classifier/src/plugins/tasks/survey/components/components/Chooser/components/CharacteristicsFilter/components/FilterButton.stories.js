import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'

import FilterButton from './FilterButton'

const CTDG_SRC = 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/475c469d-448f-4207-8a58-2cb42a3faa60.svg'

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
  title: 'Tasks / Survey / Chooser / CharacteristicsFilter / FilterButton',
  component: FilterButton
}

const Template = ({
  characteristicId,
  checked,
  dark,
  valueImageSrc,
  valueLabel
}) => (
  <StoryContext
    theme={{ ...zooTheme, dark }}
  >
    <FilterButton
      characteristicId={characteristicId}
      checked={checked}
      valueImageSrc={valueImageSrc}
      valueLabel={valueLabel}
    />
  </StoryContext>
)

export const Default = Template.bind({})
Default.args = {
  characteristicId: 'LK',
  checked: false,
  dark: false,
  valueImageSrc: CTDG_SRC,
  valueLabel: 'cat/dog'
}
