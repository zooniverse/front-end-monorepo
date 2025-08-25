import { Box } from 'grommet'
import SpacedHeading from './SpacedHeading'

/** This will not work with @storybook/react composeStory function */
// import readme from './README.md'

export default {
  title: 'Components / SpacedHeading',
  component: SpacedHeading,
  args: {
    children: 'Zooniverse Spaced Heading',
    color: undefined,
    level: 2,
    size: 'medium',
    weight: 'bold'
  },
  argTypes: {
    level: {
      options: [1, 2, 3, 4, 5, 6],
      control: { type: 'select' }
    },
    size: {
      options: ['small', 'medium', 'large', 'xlarge'],
      control: { type: 'select' }
    },
    weight: {
      options: ['normal', 'bold'],
      control: { type: 'radio' }
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

export function Default({ children, color, level, size, weight }) {
  return (
    <Box pad='medium'>
      <SpacedHeading color={color} level={level} size={size} weight={weight}>
        {children}
      </SpacedHeading>
    </Box>
  )
}
