import { Box } from 'grommet'
import { arrayOf, func, number, shape, string } from 'prop-types'

import HeadingForAboutNav from '@components/HeadingForAboutNav/HeadingForAboutNav.jsx'
import Person from '../Person/Person.jsx'

function Institution({
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

Institution.propTypes = {
  name: string,
  people: arrayOf(
    shape({
      id: string
    })
  ),
  /* sectionIndex matches index order of sections array supplied to Sidebar component */
  sectionIndex: number,
  /* Setting the active section is handled at the page level */
  setActiveSection: func,
  slug: string
}

export default Institution
