import { Box, Heading } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'

import Person from '../Person'

function Team ({
  name,
  people,
  slug
}) {
  return (
    <Box as='section' key={name} margin={{ bottom: 'medium' }}>
      <Heading
        id={slug}
        level='2'
        margin={{ bottom: 'small', top: 'none' }}
        size='small'
      >
        {name}
      </Heading>

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
