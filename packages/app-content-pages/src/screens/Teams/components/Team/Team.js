import { Box } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import { SpacedHeading } from '@zooniverse/react-components'
import withResponsiveContext from '@zooniverse/react-components/helpers/withResponsiveContext'

import Person from '../Person'

function Team({ name = '', people = [], screenSize = 'medium', slug = '' }) {
  return (
    <Box as='section' key={name} margin={{ bottom: 'medium' }}>
      <SpacedHeading
        id={slug}
        color='black'
        level='2'
        margin={{ bottom: '30px', top: '20px' }}
        size={screenSize === 'small' ? '1.13rem' : '1.5rem'}
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

export default withResponsiveContext(Team)
