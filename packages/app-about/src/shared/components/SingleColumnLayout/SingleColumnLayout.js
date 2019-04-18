import { Box } from 'grommet'
import { node } from 'prop-types'
import React from 'react'

import AboutHeader from '../AboutHeader'

function SingleColumnLayout (props) {
  return (
    <>
      <AboutHeader />
      <Box align='center'>
        <Box width='xlarge'>
          {props.children}
        </Box>
      </Box>
    </>
  )
}

SingleColumnLayout.propTypes = {
  children: node
}

export default SingleColumnLayout
