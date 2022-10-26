import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import React from 'react'

import theme from './theme'
import ChoiceButton from './ChoiceButton'

const combinedTheme = Object.assign({}, zooTheme, theme)

const CARACAL_SRC = 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/41bddb25-bb8d-4734-88fe-643d88688489.jpeg'

function getColumnWidth (thumbnailSize) {
  if (thumbnailSize === 'small') {
    return '105px'
  }
  if (thumbnailSize === 'medium') {
    return '175px'
  }
  return '310px'
}

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
  component: ChoiceButton,
  argTypes: {
    onChoose: { action: 'onChoose' },
    onKeyDown: { action: 'onKeyDown' },
  }
}

const Template = ({
  choiceId,
  choiceLabel,
  dark,
  disabled,
  hasFocus,
  onChoose,
  onKeyDown,
  selected,
  src,
  tabIndex,
  thumbnailSize
}) => (
  <StoryContext
    theme={{ ...combinedTheme, dark }}
  >
    <Box
      width={getColumnWidth(thumbnailSize)}
    >
      <ChoiceButton
        choiceId={choiceId}
        choiceLabel={choiceLabel}
        disabled={disabled}
        hasFocus={hasFocus}
        onChoose={onChoose}
        onKeyDown={onKeyDown}
        selected={selected}
        src={src}
        tabIndex={tabIndex}
        thumbnailSize={thumbnailSize}
      />
    </Box>
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
  choiceLabel: 'Label withlongwordthatislong',
  dark: false,
  disabled: false,
  hasFocus: false,
  selected: false,
  src: '',
  tabIndex: -1,
  thumbnailSize: 'small'
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
