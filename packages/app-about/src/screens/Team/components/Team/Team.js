import { Box, Heading } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import React from 'react'

import Person from '../Person'

function Team (props) {
  const { data } = props
  return (
    <Box as='section' key={data.name}>
      <Heading level='3'>
        {data.name} ({data.people.length})
      </Heading>
      {data.people.map(person => (
        <Person data={person} key={person.name} />
      ))}
    </Box>
  )
}

Team.propTypes = {
  data: shape({
    name: string,
    people: arrayOf(shape({
      name: string
    }))
  })
}

export default Team
