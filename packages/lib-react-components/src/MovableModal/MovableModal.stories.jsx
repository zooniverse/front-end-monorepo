import { Box, Text, TextArea } from 'grommet'

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

export default {
  title: 'Components / MovableModal',
  component: MovableModal,
  args: {
    animate: false,
    closeFn: () => true,
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
  },
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
}

export const Default = ({
  animate,
  closeFn,
  headingBackground,
  pad,
  plain,
  position,
  title,
  titleColor
}) => {
  return (
    <MovableModal
      active
      animate={animate}
      closeFn={closeFn}
      headingBackground={headingBackground}
      pad={pad}
      plain={plain}
      position={position}
      title={title}
      titleColor={titleColor}
    >
      {EXAMPLE_STRING}
    </MovableModal>
  )
}

export const SubTask = ({
  animate,
  closeFn,
  headingBackground,
  pad,
  plain,
  position,
  title,
  titleColor
}) => {
  return (
    <MovableModal
      active
      animate={animate}
      closeFn={closeFn}
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
  )
}

SubTask.story = {
  args: {
    headingBackground: 'transparent',
    plain: true
  }
}
