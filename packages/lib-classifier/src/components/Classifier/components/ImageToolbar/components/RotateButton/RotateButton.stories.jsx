import RotateButton from './RotateButton'
import { ComponentDecorator } from '../shared/ComponentDecorator'

export default {
  title: 'Image Toolbar / RotateButton',
  component: RotateButton,
  decorators: [ComponentDecorator],
  argTypes: {
    disabled: {
      control: 'boolean',
      value: false
    },
    onClick: {
      action: 'clicked'
    }
  }
}

export function Default({ disabled, onClick }) {
  return (
    <RotateButton
      disabled={disabled}
      onClick={onClick}
    />
  )
}
