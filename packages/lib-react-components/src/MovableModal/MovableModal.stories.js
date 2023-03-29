import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet, Text, TextArea } from 'grommet'
import { useState } from 'react'

import MovableModal from './MovableModal'
import PrimaryButton from '../PrimaryButton'
import readme from './README.md'

const EXAMPLE_STRING =
  'Leo mollis dictum id dis maecenas consectetur metus elementum vivamus nisl, suscipit tristique lectus nulla mus etiam nisi facilisis magnis, scelerisque ligula montes luctus cursus nibh vulputate parturient risus.'

const layerPositions = [
  'bottom',
  'bottom-left',
  'bottom-right',
  'center',
  'end',
  'hidden',
  'left',
  'right',
  'start',
  'top',
  'top-left',
  'top-right'
]

const config = {
  docs: {
    description: {
      component: readme
    }
  }
}

export default {
  title: 'Components / MovableModal',
  component: MovableModal,
  args: {
    animate: false,
    dark: false,
    headingBackground: 'brand',
    pad: 'medium',
    plain: false,
    position: 'top-left',
    title: 'Title',
    titleColor: ''
  },
  argTypes: {
    position: {
      options: layerPositions,
      control: { type: 'select' }
    }
  }
}

export const Default = ({
  animate,
  dark,
  headingBackground,
  pad,
  plain,
  position,
  title,
  titleColor
}) => {
  const [active, setActive] = useState(true)
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <MovableModal
        active={active}
        animate={animate}
        closeFn={() => setActive(!active)}
        headingBackground={headingBackground}
        pad={pad}
        plain={plain}
        position={position}
        title={title}
        titleColor={titleColor}
      >
        {EXAMPLE_STRING}
      </MovableModal>
    </Grommet>
  )
}

Default.story = {
  parameters: config
}

export const SubTask = ({
  animate,
  dark,
  headingBackground,
  pad,
  plain,
  position,
  title,
  titleColor
}) => {
  const [active, setActive] = useState(true)

  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <MovableModal
        active={active}
        animate={animate}
        closeFn={() => setActive(!active)}
        headingBackground={headingBackground}
        pad={pad}
        plain={plain}
        position={position}
        title={title}
        titleColor={titleColor}
      >
        <Box gap='xsmall'>
          <label>
            <Text size='small'>Transcribe the text</Text>
            <TextArea />
          </label>
          <PrimaryButton label='Save' />
        </Box>
      </MovableModal>
    </Grommet>
  )
}

SubTask.story = {
  parameters: config,
  args: {
    headingBackground: 'transparent',
    plain: true
  }
}
