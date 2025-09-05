import MoveButton from './MoveButton'
import { ComponentDecorator } from '../shared/ComponentDecorator'

export default {
  title: 'Image Toolbar / MoveButton',
  component: MoveButton,
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
    <MoveButton
      active={active}
      disabled={disabled}
      onClick={onClick}
    />
  )
}
