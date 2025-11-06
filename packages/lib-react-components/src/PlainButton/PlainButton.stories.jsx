import { Box } from 'grommet'
import { Add } from 'grommet-icons'

import PlainButton from './PlainButton'

/** This will not work with @storybook/react composeStory function */
// import readme from './README.md'

export default {
  title: 'Components / PlainButton',
  component: PlainButton,
  args: {
    color: {
      dark: 'accent-1',
      light: 'neutral-1'
    },
    disabled: false,
    href: 'https://www.zooniverse.org',
    icon: false,
    labelSize: 'medium',
    text: 'Click me'
  },
  argTypes: {
    labelSize: {
      options: ['small', 'medium', 'large', 'xlarge'],
      control: { type: 'select' }
    },
    onClick: {
      action: 'clicked'
    }
  }
  // parameters: {
  //   docs: {
  //     description: {
  //       component: readme
  //     }
  //   }
  // }
}

export function Default({
  color,
  disabled,
  href,
  labelSize,
  icon,
  onClick,
  text
}) {
  return (
    <Box pad='medium'>
      <PlainButton
        color={color}
        disabled={disabled}
        href={href}
        labelSize={labelSize}
        icon={icon ? <Add size='16px' /> : null}
        onClick={onClick}
        text={text}
      />
    </Box>
  )
}
