import { Box } from 'grommet'
import SpacedText from './SpacedText'

/** This will not work with @storybook/react composeStory function */
// import readme from './README.md'

export default {
  title: 'Components / SpacedText',
  component: SpacedText,
  args: {
    children: 'Zooniverse Spaced Text',
    margin: 'none',
    size: 'medium',
    uppercase: true,
    weight: 'normal'
  },
  argTypes: {
    size: {
      options: ['small', 'medium', 'large', 'xlarge'],
      control: { type: 'select' }
    },
    uppercase: {
      options: [true, false],
      control: { type: 'radio' }
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

export const Default = ({ children, margin, size, uppercase, weight }) => (
  <Box pad='medium'>
    <SpacedText margin={margin} size={size} uppercase={uppercase} weight={weight}>
      {children}
    </SpacedText>
  </Box>
)
