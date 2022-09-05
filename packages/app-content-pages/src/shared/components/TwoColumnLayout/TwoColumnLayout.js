import { Box } from 'grommet'
import { node } from 'prop-types'

import AboutHeader from '../AboutHeader'

function TwoColumnLayout (props) {
  const { heading, sidebar, main } = props
  return (
    <>
      <AboutHeader />
      <Box align='center' pad={{ horizontal: 'medium', vertical: 'large' }}>
        <Box 
            direction='row'
            gap='medium'
            width='xlarge'
            >
              {heading}

          </Box>
        <Box
          direction='row'
          gap='medium'
          width='xlarge'
        >
          

          <Box
            as='aside'
            gridArea='sidebar'
            width='medium'
          >
            {sidebar}
          </Box>
          
          <Box fill gridArea='main'>
            {main}
          </Box>
          
        </Box>
      </Box>
    </>
  )
}

TwoColumnLayout.propTypes = {
  main: node,
  sidebar: node,
  heading: node
}

export default TwoColumnLayout
