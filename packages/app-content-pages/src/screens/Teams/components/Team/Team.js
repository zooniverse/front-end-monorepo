import { Box } from 'grommet'
import { arrayOf, func, number, shape, string } from 'prop-types'
import HeadingForAboutNav from '../../../../shared/components/HeadingForAboutNav/HeadingForAboutNav'

import Person from '../Person'

function Team({
  name = '',
  people = [],
  sectionIndex = 0,
  setActiveSection = () => {},
  slug = ''
}) {
  return (
    <Box as='section' key={name}>
      <HeadingForAboutNav
        color={{ light: 'black', dark: 'white' }}
        sectionIndex={sectionIndex}
        sectionName={name}
        setActiveSection={setActiveSection}
        slug={slug}
      />
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
  /* sectionIndex matches index order of sections array supplied to Sidebar component */
  sectionIndex: number,
  /* Setting the active section is handled at the page level (Teams) */
  setActiveSection: func,
  slug: string
}

export default Team
