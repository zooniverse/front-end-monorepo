import React from 'react'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { AlreadySeenBannerContainer } from './AlreadySeenBannerContainer'
import readme from '../../README.md'
import backgrounds from '../../../../../../../.storybook/lib/backgrounds'
import { SubjectFactory } from '@test/factories'

const config = {
  notes: {
    markdown: readme
  }
}

const darkThemeConfig = Object.assign({}, config, { backgrounds: backgrounds.darkDefault })

const subject = SubjectFactory.build()

const stories = storiesOf('Banners | AlreadySeenBanner', module)

stories.addDecorator(withKnobs)

stories.add('light theme', () => {
    return (
      <Grommet theme={zooTheme}>
        <Box background={{ dark: 'dark-3', light: 'light-3' }} height='medium' width='large'>
          <AlreadySeenBannerContainer
            subject={Object.assign({}, subject, { already_seen: boolean('already_seen', true) })}
          />
          <img src="https://placekitten.com/800/400" alt='placeholder' />
        </Box>
      </Grommet>
    )
  }, config)
  .add('dark theme', () => {
    const darkZooTheme = Object.assign({}, zooTheme, { dark: true })
    return (
      <Grommet theme={darkZooTheme}>
        <Box background={{ dark: 'dark-3', light: 'light-3' }} height='medium' width='large'>
          <AlreadySeenBannerContainer
            subject={Object.assign({}, subject, { already_seen: boolean('already_seen', true) })}
          />
          <img src="https://placekitten.com/800/400" alt='placeholder' />
        </Box>
      </Grommet>
    )
  }, darkThemeConfig)
