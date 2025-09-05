import { Edit } from 'grommet-icons'

import TaskInput from './TaskInput'
import InputStatus from '../InputStatus/InputStatus'

export default {
  title: 'Tasks / TaskInput',
  component: TaskInput,
  args: {
    checked: true
  }
}

export const Default = {}

Default.args = {
  label: 'Label',
  index: 0,
  name: 'default',
  type: 'radio'
}

export const CustomIcon = {}

CustomIcon.args = {
  label: 'Drawing a point',
  labelIcon: <Edit color='gold' />,
  index: 0,
  name: 'custom-icon',
  type: 'radio'
}

export const ImageAndTextLabel = {}

ImageAndTextLabel.args = {
  label: '![alt](https://thumbnails.zooniverse.org/60x/panoptes-uploads.zooniverse.org/production/project_attached_image/1ec52a74-9e49-4579-91ff-0140eb5371e6.png) Galaxies',
  index: 0,
  name: 'markdownz',
  type: 'checkbox'
}

export const WithLabelStatus = {}

WithLabelStatus.args = {
  index: 0,
  label: 'Do the task',
  labelStatus: <InputStatus count={3} />,
  name: 'drawing',
  type: 'radio'
}
