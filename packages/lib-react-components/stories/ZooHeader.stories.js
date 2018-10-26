import React from 'react'
import { Grommet, Button } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import styled from 'styled-components'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withInfo } from '@storybook/addon-info'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'
import { backgrounds } from './lib'
import { SpacedText, ZooHeader } from '../src'
import headerDocs from '../src/ZooHeader/README.md'

function ExampleSignInButtonLabel() {
  return (
    <SpacedText color="#B2B2B2" weight="bold" size="xsmall">Sign in</SpacedText>
  )
}

function ExampleSignInButton(props) {
  return (
    <Button
      label={<ExampleSignInButtonLabel />}
      plain={true}
      onClick={props.onClick}
    />
  )
}

// Why don't these styles work?
const StyledExampleSignInButton = styled(ExampleSignInButton)`
  border-bottom: 2px solid transparent !important;

  &:hover, &:focus {
    border-bottom-color: ${zooTheme.global.colors.teal} !important;
  }
`

const signInButton = <StyledExampleSignInButton onClick={() => { return action('Sign in button clicked') }} />
const signOut = action('Sign out button clicked')

storiesOf('ZooHeader', module)
  .addDecorator(backgrounds)
  .add('Signed out', withInfo(headerDocs)(() =>
    <Grommet theme={zooTheme}>
      <ZooHeader signInButton={signInButton} signOut={signOut} user={{}} />
    </Grommet>
  ))
  .add('Signed in', () => (
    <Grommet theme={zooTheme}>
      <ZooHeader signInButton={signInButton} signOut={signOut} user={{ display_name: 'zootester1', login: 'zootester1' }} />
    </Grommet>
  ))
  .add('Signed in as admin', () => (
    <Grommet theme={zooTheme}>
      <ZooHeader isAdmin={true} signInButton={signInButton} signOut={signOut} user={{admin: true, display_name: 'zootester1', login: 'zootester1' }} />
    </Grommet>
  ))

