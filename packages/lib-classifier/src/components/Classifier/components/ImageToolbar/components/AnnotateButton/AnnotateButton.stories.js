import AnnotateButton from './AnnotateButton'
import { ComponentDecorator } from '../shared/ComponentDecorator'

export default {
  title: 'Image Toolbar / AnnotateButton',
  component: AnnotateButton,
  decorators: [ComponentDecorator],
  argTypes: {
    active: {
      control: 'boolean',
      value: false
    },
    disabled: {
      control: 'boolean',
      value: false
    },
    onClick: {
      action: 'clicked'
    }
  },
}

export function Default({ active, disabled, onClick }) {
  return (
    <AnnotateButton
      active={active}
      disabled={disabled}
      onClick={onClick}
    />
  )
}
