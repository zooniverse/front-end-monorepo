import { Box } from 'grommet'
import PrimaryButton from './PrimaryButton'

/** This will not work with @storybook/react composeStory function */
// import readme from './README.md'

export default {
  title: 'Components / PrimaryButton',
  component: PrimaryButton,
  args: {
    color: 'gold',
    disabled: false,
    href: 'https://www.zooniverse.org',
    label: 'Click me'
  },
  argTypes: {
    color: {
      options: ['blue', 'gold', 'green', 'teal', 'invalid'],
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

export const Default = ({ color, disabled, href, label, onClick }) => (
  <Box pad='medium'>
    <PrimaryButton
      color={color}
      disabled={disabled}
      href={href}
      label={label}
      onClick={onClick}
    />
  </Box>
)

const imgLabel = (
  <img
    src='https://static.zooniverse.org/login.zooniverse.org/img/avatar.png'
    alt='test image label'
    width='30px'
  />
)

export const ImgLabel = ({ color, disabled, href, label, onClick }) => (
  <Box pad='medium'>
    <PrimaryButton
      color={color}
      disabled={disabled}
      href={href}
      label={label}
      onClick={onClick}
    />
  </Box>
)

ImgLabel.args = {
  label: imgLabel
}
