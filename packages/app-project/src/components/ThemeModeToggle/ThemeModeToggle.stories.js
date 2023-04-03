import { Box } from 'grommet'
import ThemeModeToggle from './ThemeModeToggle'

export default {
  title: 'Project App / Shared / ThemeModeToggle',
  component: ThemeModeToggle,
  argTypes: {
    onClick: {
      action: 'clicked'
    }
  }
}

export const Default = ({ onClick, screenSize }) => {
  return (
    <Box pad='medium'>
      <ThemeModeToggle onClick={onClick} screenSize={screenSize} />
    </Box>
  )
}
