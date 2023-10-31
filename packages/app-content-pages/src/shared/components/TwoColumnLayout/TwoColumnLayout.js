import { Box } from 'grommet'
import { node } from 'prop-types'

function TwoColumnLayout({ heading, sidebar, main }) {
  return (
    <Box align='center' pad={{ horizontal: 'medium', vertical: 'large' }}>
      <Box direction='row' gap='medium' width='xlarge'>
        <Box width='medium' />
        <Box fill gridArea='heading'>
          {heading}
        </Box>
      </Box>
      <Box direction='row' gap='medium' width='xlarge'>
        <Box as='aside' gridArea='sidebar' width='medium'>
          {sidebar}
        </Box>
        <Box fill gridArea='main'>
          {main}
        </Box>
      </Box>
    </Box>
  )
}

TwoColumnLayout.propTypes = {
  main: node,
  sidebar: node,
  heading: node
}

export default TwoColumnLayout
