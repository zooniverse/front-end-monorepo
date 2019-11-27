import React from 'react'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import styled from 'styled-components'
import { UserHasFinishedWorkflowBannerContainer } from './UserHasFinishedWorkflowBannerContainer'
import readme from '../../README.md'
import backgrounds from '../../../../../../../.storybook/lib/backgrounds'
import { SubjectFactory } from '@test/factories'

const config = {
  notes: {
    markdown: readme
  }
}

const darkThemeConfig = Object.assign({}, config, { backgrounds: backgrounds.darkDefault })

const subject = SubjectFactory.build({ user_has_finished_workflow: true })

const StyledBox = styled(Box)`
  position: relative;
`

storiesOf('Banners | UserHasFinishedWorkflowBanner', module)
  .add('light theme', () => {
    return (
      <Grommet theme={zooTheme}>
        <StyledBox background={{ dark: 'dark-3', light: 'light-3' }} height='medium' width='large'>
          <UserHasFinishedWorkflowBannerContainer
            subject={subject}
          />
        </StyledBox>
      </Grommet>
    )
  }, config)
  .add('dark theme', () => {
    const darkZooTheme = Object.assign({}, zooTheme, { dark: true })
    return (
      <Grommet theme={darkZooTheme}>
        <StyledBox background={{ dark: 'dark-3', light: 'light-3' }} height='medium' width='large'>
          <UserHasFinishedWorkflowBannerContainer
            subject={subject}
          />
        </StyledBox>
      </Grommet>
    )
  }, darkThemeConfig)
