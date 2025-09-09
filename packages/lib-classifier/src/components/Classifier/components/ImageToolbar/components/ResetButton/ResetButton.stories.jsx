import ResetButton from './ResetButton'
import { ComponentDecorator } from '../shared/ComponentDecorator'

export default {
  title: 'Image Toolbar / ResetButton',
  component: ResetButton,
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
    <ResetButton
      disabled={disabled}
      onClick={onClick}
    />
  )
}
