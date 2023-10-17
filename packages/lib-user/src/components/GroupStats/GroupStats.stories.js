import { Box } from 'grommet'

// import GroupStats from './GroupStats'

function GroupStatsTestComponent () {
  return (
    <Box background='accent-1'>
      <p>This is a test component for testing storybook.</p>
    </Box>
  )
} 

export default {
  title: 'Components/GroupStats',
  component: GroupStatsTestComponent,
}

export const Default = {
  render: () => <GroupStatsTestComponent />
}
