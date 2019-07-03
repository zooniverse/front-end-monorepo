import { withActions } from '@storybook/addon-actions'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Button, Grommet, Text } from 'grommet'
import { Add } from 'grommet-icons'
import React from 'react'

import readme from './README.md'
import Tooltip from './Tooltip'

const config = {
  notes: {
    markdown: readme
  }
}

storiesOf('Tooltip', module)
  .addDecorator(withKnobs)
  .addDecorator(withActions('click button'))
  .add('Light theme (default)', () => (
    <TooltipStoryExample
      align={{
        top: 'bottom'
      }}
      backgroundColor='light-1'
      label={text('Label text', 'Hover over me')}
      showDropKnob={boolean('Show tooltip')}
      tooltipText={text('Tooltip text', 'A helpful tip')}
    />
  ), config)
  .add('Dark theme', () => (
    <TooltipStoryExample
      align={{
        top: 'bottom'
      }}
      backgroundColor='dark-1'
      label={text('Label text', 'Hover over me')}
      showDropKnob={boolean('Show tooltip')}
      tooltipText={text('Tooltip text', 'A helpful tip')}
    />
  ), config)
  .add('Subject Image Viewer toolbar tooltip', () => (
    <TooltipStoryExample
      align={{
        right: 'left'
      }}
      animation={{
        'type': 'slideLeft',
        'delay': 20
      }}
      backgroundColor='brand'
      icon={<Add />}
      pad={{ horizontal: 'small', vertical: 'small' }}
      showDropKnob={boolean('Show tooltip')}
      tooltipText={text('Tooltip text', 'A helpful tip')}
    />
  ), config)

class TooltipStoryExample extends React.Component {
  constructor () {
    super()
    this.state = {
      showDrop: false
    }
  }

  render () {
    const { align, animation, backgroundColor, label, icon, pad, showDropKnob, tooltipText } = this.props
    return (
      <Grommet theme={zooTheme}>
        <Box align='center' justify='center' pad='medium'>
          <Button
            icon={icon}
            label={label}
            onClick={() => {}}
            onMouseOver={() => this.setState({ showDrop: true })}
            onMouseOut={() => this.setState({ showDrop: false })}
            primary
            ref={ref => { this.button = ref }}
          />
          {(this.state.showDrop || showDropKnob) &&
            <Tooltip
              align={align}
              boxAnimation={animation}
              boxBackgroundColor={backgroundColor}
              boxPad={pad}
              target={this.button}
            >
              <Text>
                {tooltipText}
              </Text>
            </Tooltip>}
        </Box>
      </Grommet>
    )
  }
}
