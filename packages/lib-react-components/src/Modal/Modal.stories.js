import zooTheme from '@zooniverse/grommet-theme'
import { useState } from 'react'

import Modal, { Modal as ModalComponent } from './Modal'
import readme from './README.md'

const EXAMPLE_STRING =
  'Leo mollis dictum id dis maecenas consectetur metus elementum vivamus nisl, suscipit tristique lectus nulla mus etiam nisi facilisis magnis, scelerisque ligula montes luctus cursus nibh vulputate parturient risus.'

const { colors } = zooTheme.global

export default {
  title: 'Components / Modal',
  component: ModalComponent,
  args: {
    content: EXAMPLE_STRING,
    headingBackground: colors.brand,
    title: 'Modal Title',
    titleColor: colors['neutral-6']
  },
  argTypes: {
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
      }
    }
  }
}

export function Default({
  content,
  headingBackground,
  title,
  titleColor
}) {
  const [active, setActive] = useState(true)

  return (
    <Modal
      active={active}
      closeFn={() => setActive(!active)}
      headingBackground={headingBackground}
      title={title}
      titleColor={titleColor}
    >
      {content}
    </Modal>
  )
}

export function Required({
  content,
  headingBackground,
  title,
  titleColor
}) {
  return (
    <Modal
      active
      headingBackground={headingBackground}
      title={title}
      titleColor={titleColor}
    >
      {content}
    </Modal>
  )
}
