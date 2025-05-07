import { Box } from 'grommet'

export function ComponentDecorator(Story) {
  return (
    <Box
      margin={{ left: '250px' }}
      pad='12px'
      width='72px'
    >
      <Story />
    </Box>
  )
}
