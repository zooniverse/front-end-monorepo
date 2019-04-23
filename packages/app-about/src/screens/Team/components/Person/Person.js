import { Box } from 'grommet'
import { shape, string } from 'prop-types'
import React from 'react'

function Person (props) {
  const { data } = props
  return (
    <Box as='section' key={data.name}>
      {data.name}
    </Box>
  )
}

Person.propTypes = {
  data: shape({
    name: string
  })
}

export default Person
