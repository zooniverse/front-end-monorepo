import ZoomOutButton from './ZoomOutButton'
import { ComponentDecorator } from '../shared/ComponentDecorator'

export default {
  title: 'Image Toolbar / ZoomOutButton',
  component: ZoomOutButton,
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
    <ZoomOutButton
      disabled={disabled}
      onClick={onClick}
    />
  )
}
