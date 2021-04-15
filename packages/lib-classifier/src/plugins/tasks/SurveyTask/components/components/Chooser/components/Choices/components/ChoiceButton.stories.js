import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'

import ChoiceButton from './ChoiceButton'

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
  title: 'Tasks / SurveyTask / ChoiceButton',
  component: ChoiceButton
}

const Template = ({
  choiceId,
  choiceLabel,
  dark,
  selected,
  src,
  thumbnailSize
}) => (
  <StoryContext
    theme={{ ...zooTheme, dark }}
  >
    <ChoiceButton
      choiceId={choiceId}
      choiceLabel={choiceLabel}
      onChoose={() => console.log(choiceId)}
      selected={selected}
      src={src}
      thumbnailSize={thumbnailSize}
    />
  </StoryContext>
)

export const Default = Template.bind({});
Default.args = {
  choiceId: 'AARDVARK',
  choiceLabel: 'Aardvark',
  dark: false,
  selected: false,
  src: '',
  thumbnailSize: 'none'
}

export const LongLabel = Template.bind({});
LongLabel.args = {
  choiceId: 'LONG',
  choiceLabel: 'Long label is really long label',
  dark: false,
  selected: false,
  src: '',
  thumbnailSize: 'none'
}

export const SmallThumbnail = Template.bind({});
SmallThumbnail.args = {
  choiceId: 'CRCL',
  choiceLabel: 'Caracal',
  dark: false,
  selected: false,
  src: CARACAL_SRC,
  thumbnailSize: 'small'
}

export const MediumThumbnail = Template.bind({});
MediumThumbnail.args = {
  choiceId: 'CRCL',
  choiceLabel: 'Caracal',
  dark: false,
  selected: false,
  src: CARACAL_SRC,
  thumbnailSize: 'medium'
}

export const LargeThumbnail = Template.bind({});
LargeThumbnail.args = {
  choiceId: 'CRCL',
  choiceLabel: 'Caracal',
  dark: false,
  selected: false,
  src: CARACAL_SRC,
  thumbnailSize: 'large'
}
