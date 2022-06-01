import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import React from 'react'

import PrimaryButton from './PrimaryButton'

export default {
  title: 'Components / PrimaryButton',
  component: PrimaryButton,
  args: {
    color: 'gold',
    dark: false,
    disabled: false,
    href: 'https://www.zooniverse.org',
    label: 'Click me'
  },
  argTypes: {
    color: {
      options: ['blue', 'gold', 'green', 'teal', 'invalid'],
      control: { type: 'select' }
    },
    onClick: {
      action: 'clicked'
    }
  }
}

export const Default = ({ color, dark, disabled, href, label, onClick }) => (
  <Grommet
    background={{
      dark: 'dark-1',
      light: 'light-1'
    }}
    theme={zooTheme}
    themeMode={dark ? 'dark' : 'light'}
  >
    <Box pad='medium'>
      <PrimaryButton
        color={color}
        disabled={disabled}
        href={href}
        label={label}
        onClick={onClick}
      />
    </Box>
  </Grommet>
)

const imgLabel = (
  <img
    src='https://static.zooniverse.org/login.zooniverse.org/img/avatar.png'
    alt='test image label'
    width='30px'
  />
)

export const ImgLabel = ({ color, dark, disabled, href, label, onClick }) => (
  <Grommet
    background={{
      dark: 'dark-1',
      light: 'light-1'
    }}
    theme={zooTheme}
    themeMode={dark ? 'dark' : 'light'}
  >
    <Box pad='medium'>
      <PrimaryButton
        color={color}
        disabled={disabled}
        href={href}
        label={label}
        onClick={onClick}
      />
    </Box>
  </Grommet>
)

ImgLabel.args = {
  label: imgLabel
}
