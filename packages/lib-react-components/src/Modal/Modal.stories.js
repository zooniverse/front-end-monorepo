import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

import Modal,{ Modal as ModalComponent } from './Modal'
import readme from './README.md'

const EXAMPLE_STRING = 'Leo mollis dictum id dis maecenas consectetur metus elementum vivamus nisl, suscipit tristique lectus nulla mus etiam nisi facilisis magnis, scelerisque ligula montes luctus cursus nibh vulputate parturient risus.'

const { colors } = zooTheme.global


export default {
  title: 'Components/Modal',
  component: ModalComponent,
  args: {
    active: true,
    content: EXAMPLE_STRING,
    headingBackground: colors.brand,
    title: 'Modal Title',
    titleColor: colors['neutral-6']
  },
  argTypes: {
    closeFn: {
      action: 'Close modal'
    },
    headingBackground: {
      control: 'color'
    },
    titleColor: {
      control: 'color'
    }
  },
  parameters: {
    docs: {
      description: {
        component: readme
      },
      inlineStories: false
    }
  }
}

export function LightTheme({ active, closeFn, content, headingBackground, title, titleColor }) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode='light'
    >
      <Modal
        active={active}
        closeFn={closeFn}
        headingBackground={headingBackground}
        title={title}
        titleColor={titleColor}
      >
        {content}
      </Modal>
    </Grommet>
  )
}

export function DarkTheme({ active, closeFn, content, headingBackground, title, titleColor }) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode='dark'
    >
      <Modal
        active={active}
        closeFn={closeFn}
        headingBackground={headingBackground}
        title={title}
        titleColor={titleColor}
      >
        {content}
      </Modal>
    </Grommet>
  )
}

export function Required({ content, headingBackground, title, titleColor }) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode='light'
    >
      <Modal
        active
        headingBackground={headingBackground}
        title={title}
        titleColor={titleColor}
      >
        {content}
      </Modal>
    </Grommet>
  )
}
