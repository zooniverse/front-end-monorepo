import FullscreenButton from './FullscreenButton'
import { ComponentDecorator } from '../shared/ComponentDecorator'

export default {
  title: 'Image Toolbar / FullscreenButton',
  component: FullscreenButton,
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
  }
}

export function Default({ active, disabled, onClick }) {
  return (
    <FullscreenButton
      active={active}
      disabled={disabled}
      onClick={onClick}
    />
  )
}
