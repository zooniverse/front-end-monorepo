import ZoomInButton from './ZoomInButton'
import { ComponentDecorator } from '../shared/ComponentDecorator'

export default {
  title: 'Image Toolbar / ZoomInButton',
  component: ZoomInButton,
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
    <ZoomInButton
      disabled={disabled}
      onClick={onClick}
    />
  )
}
