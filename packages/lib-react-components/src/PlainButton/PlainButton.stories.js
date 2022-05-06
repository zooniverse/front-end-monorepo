import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { Add } from 'grommet-icons'
import React from 'react'

import PlainButton from './PlainButton'

export default {
  title: 'Components / PlainButton',
  component: PlainButton,
  args: {
    color: {
      dark: 'accent-1',
      light: 'neutral-1'
    },
    dark: false,
    disabled: false,
    href: 'zooniverse.org',
    icon: false,
    labelSize: 'medium',
    text: 'Click me'
  },
  argTypes: {
    labelSize: {
      options: ['small', 'medium', 'large', 'xlarge'],
      control: { type: 'select' }
    },
    onClick: {
      action: 'clicked'
    }
  }
}

export function Default({
  color,
  dark,
  disabled,
  href,
  labelSize,
  icon,
  onClick,
  text
}) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Box pad='medium'>
        <PlainButton
          color={color}
          disabled={disabled}
          href={href}
          labelSize={labelSize}
          icon={icon ? <Add size='16px' /> : null}
          onClick={onClick}
          text={text}
        />
      </Box>
    </Grommet>
  )
}
