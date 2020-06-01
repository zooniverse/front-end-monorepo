import { withKnobs, object, select, text, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'

import MovableModal from './MovableModal'
// import readme from './README.md'

const EXAMPLE_STRING = 'Leo mollis dictum id dis maecenas consectetur metus elementum vivamus nisl, suscipit tristique lectus nulla mus etiam nisi facilisis magnis, scelerisque ligula montes luctus cursus nibh vulputate parturient risus.'

const config = {
  // notes: {
  //   markdown: readme
  // }
}


const layerPositions = [
  "bottom",
  "bottom-left",
  "bottom-right",
  "center",
  "end",
  "hidden",
  "left",
  "right",
  "start",
  "top",
  "top-left",
  "top-right"
]
storiesOf('MovableModal', module)
  .addDecorator(withKnobs)

  .add('Light theme (default)', () => (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode='light'
    >
      <MovableModal
        active={boolean('Active', true)}
        animate={boolean('Animate layer', false)}
        headingBackground={text('Heading background color', '')}
        closeFn={action('Close modal')}
        plain={boolean('Plain layer', false)}
        position={select('Layer position', layerPositions, 'center')}
        rndProps={object('RND props')}
        title={text('Title', '')}
      >
        {text('Content', EXAMPLE_STRING)}
      </MovableModal>
    </Grommet>
  ), config)

  .add('Dark theme', () => (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={Object.assign({}, zooTheme, { dark: true })}
      themeMode='dark'
    >
      <MovableModal
        active={boolean('Active', true)}
        animate={boolean('Animate layer', false)}
        closeFn={action('Close modal')}
        headingBackground={text('Heading background color', '')}
        plain={boolean('Plain layer', false)}
        position={select('Layer position', layerPositions, 'center')}
        rndProps={object('RND props')}
        title={text('Title', '')}
      >
        {text('Content', EXAMPLE_STRING)}
      </MovableModal>
    </Grommet>
  ), config)
