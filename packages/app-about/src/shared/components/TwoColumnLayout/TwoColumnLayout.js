import { Box } from 'grommet'
import { node } from 'prop-types'
import React from 'react'

import AboutHeader from '../AboutHeader'

function TwoColumnLayout (props) {
  const { main, sidebar } = props
  return (
    <>
      <AboutHeader />
      <Box align='center'>
        <Box
          direction='row-reverse'
          gap='medium'
          width='xlarge'
        >
          <Box fill gridArea='main' pad={{ vertical: 'medium' }} >
            {main}
          </Box>
          <Box
            as='aside'
            gridArea='sidebar'
            pad={{ vertical: 'medium' }}
            width='medium'
          >
            {sidebar}
          </Box>
        </Box>
      </Box>
    </>
  )
}

TwoColumnLayout.propTypes = {
  main: node,
  sidebar: node
}

export default TwoColumnLayout
