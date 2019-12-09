import { Box, Heading } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import React from 'react'

import Person from '../Person'

function Team (props) {
  const { name, people } = props
  return (
    <Box as='section' key={name} margin={{ bottom: 'medium' }}>
      <Heading
        children={name}
        level='2'
        margin={{ bottom: 'small', top: 'none' }}
        size='small'
      />

      {people.map(person => (
        <Person
          key={person.name}
          {...person}
        />
      ))}
    </Box>
  )
}

Team.propTypes = {
  name: string,
  people: arrayOf(shape({
    id: string
  }))
}

export default Team
