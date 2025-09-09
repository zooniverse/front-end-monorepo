import InvertButton from './InvertButton'
import { ComponentDecorator } from '../shared/ComponentDecorator'

export default {
  title: 'Image Toolbar / InvertButton',
  component: InvertButton,
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
    <InvertButton
      active={active}
      disabled={disabled}
      onClick={onClick}
    />
  )
}
