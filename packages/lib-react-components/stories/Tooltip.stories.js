import React from 'react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import { Box, Button, Grommet, Text } from 'grommet'
import { Add } from 'grommet-icons'
import zooTheme from '@zooniverse/grommet-theme'

import { backgrounds } from './lib'
import { Tooltip } from '../src'
import toolTipDocs from '../src/Tooltip/README.md'

class TooltipStoryExample extends React.Component {
  constructor() {
    super()

    this.state = {
      showDrop: false
    }
  }

  render() {
    const { align, animation, backgroundColor, label, icon, pad } = this.props
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
            ref={ref => {
              this.button = ref;
            }}
          />
          {this.state.showDrop &&
            <Tooltip
              align={align}
              boxAnimation={animation}
              boxBackgroundColor={backgroundColor}
              boxPad={pad}
              target={this.button}
            >
              <Text>A helpful tip</Text>
            </Tooltip>}
        </Box>
      </Grommet>
    )
  }
}

storiesOf('Tooltip', module)
  .addDecorator(backgrounds)
  .addDecorator(withKnobs)
  .add('Light theme (default)', withInfo(toolTipDocs)(() => (
    <TooltipStoryExample 
      align={{
        top: 'bottom'
      }} 
      backgroundColor={zooTheme.light.colors.background.default}
      label='Hover over me'
    />
  )))
  .add('Dark theme', withInfo(toolTipDocs)(() => (
    <TooltipStoryExample
      align={{
        top: 'bottom'
      }} 
      backgroundColor={zooTheme.dark.colors.background.default}
      label='Hover over me'
    />
  )))
  .add('Subject Image Viewer toolbar tooltip', withInfo(toolTipDocs)(() => (
    <TooltipStoryExample
      align={{
        right: 'left'
      }}
      animation='slideLeft'
      backgroundColor={zooTheme.global.colors.brand}
      icon={<Add />}
      pad={{ horizontal: 'small', vertical: 'small' }}
    />
  )))

