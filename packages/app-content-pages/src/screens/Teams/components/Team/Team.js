import { Box } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import { HeadingForNav } from '../../../../shared/components/SharedStyledComponents/SharedStyledComponents.js'

import Person from '../Person'

function Team({ name = '', people = [], slug = '' }) {
  return (
    <Box as='section' key={name}>
      <HeadingForNav
        id={slug}
        color={{ light: 'black', dark: 'white' }}
        level={2}
        size='1.5rem'
        tabIndex={-1}
        textAlign='center'
        style={{ padding: '30px 0' }}
      >
        {name}
      </HeadingForNav>
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
