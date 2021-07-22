import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'

import theme from './theme'
import ChoiceButton from './ChoiceButton'

const combinedTheme = Object.assign({}, zooTheme, theme)

const CARACAL_SRC = 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/41bddb25-bb8d-4734-88fe-643d88688489.jpeg'

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
  title: 'Tasks / SurveyTask / Chooser / Choices / ChoiceButton',
  component: ChoiceButton
}

const Template = ({
  choiceId,
  choiceLabel,
  dark,
  disabled,
  hasFocus,
  selected,
  src,
  tabIndex,
  thumbnailSize
}) => (
  <StoryContext
    theme={{ ...combinedTheme, dark }}
  >
    <ChoiceButton
      choiceId={choiceId}
      choiceLabel={choiceLabel}
      disabled={disabled}
      hasFocus={hasFocus}
      onChoose={() => console.log(choiceId)}
      onKeyDown={({ key }) => console.log(choiceId, key)}
      selected={selected}
      src={src}
      tabIndex={tabIndex}
      thumbnailSize={thumbnailSize}
    />
  </StoryContext>
)

export const Default = Template.bind({})
Default.args = {
  choiceId: 'AARDVARK',
  choiceLabel: 'Aardvark',
  dark: false,
  disabled: false,
  hasFocus: false,
  selected: false,
  src: '',
  tabIndex: -1,
  thumbnailSize: 'none'
}

export const LongLabel = Template.bind({})
LongLabel.args = {
  choiceId: 'LONG',
  choiceLabel: 'Long label is really long label',
  dark: false,
  disabled: false,
  hasFocus: false,
  selected: false,
  src: '',
  tabIndex: -1,
  thumbnailSize: 'none'
}

export const SmallThumbnail = Template.bind({})
SmallThumbnail.args = {
  choiceId: 'CRCL',
  choiceLabel: 'Caracal',
  dark: false,
  disabled: false,
  hasFocus: false,
  selected: false,
  src: CARACAL_SRC,
  tabIndex: -1,
  thumbnailSize: 'small'
}

export const MediumThumbnail = Template.bind({})
MediumThumbnail.args = {
  choiceId: 'CRCL',
  choiceLabel: 'Caracal',
  dark: false,
  disabled: false,
  hasFocus: false,
  selected: false,
  src: CARACAL_SRC,
  tabIndex: -1,
  thumbnailSize: 'medium'
}

export const LargeThumbnail = Template.bind({})
LargeThumbnail.args = {
  choiceId: 'CRCL',
  choiceLabel: 'Caracal',
  dark: false,
  disabled: false,
  hasFocus: false,
  selected: false,
  src: CARACAL_SRC,
  tabIndex: -1,
  thumbnailSize: 'large'
}
