import { Box } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import { SpacedHeading } from '@zooniverse/react-components'

import Person from '../Person'

function Team({ name = '', people = [], slug = '' }) {
  return (
    <Box as='section' key={name} margin={{ bottom: 'medium' }}>
      <SpacedHeading
        id={slug}
        color='dark-5'
        level='2'
        margin={{ bottom: 'small', top: 'small' }}
        size='1.5rem'
        textAlign='center'
      >
        {name}
      </SpacedHeading>
      {people.map(person => (
        <Person key={person.name} {...person} />
      ))}
    </Box>
  )
}

Team.propTypes = {
  name: string,
  people: arrayOf(
    shape({
      id: string
    })
  ),
  slug: string
}

export default Team
