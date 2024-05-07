import { Box } from 'grommet'
import { arrayOf, func, number, shape, string } from 'prop-types'
import HeadingForAboutNav from '../../../../components/HeadingForAboutNav/HeadingForAboutNav.js'

import Project from '../Project/Project.js'

function Category({
  projects = [],
  setActiveSection = () => {},
  sectionIndex = 0,
  slug = '',
  title = ''
}) {
  return (
    <Box as='section'>
      <HeadingForAboutNav
        color={{ light: 'black', dark: 'white' }}
        sectionName={title}
        sectionIndex={sectionIndex}
        setActiveSection={setActiveSection}
        slug={slug}
      />
      {projects.map(project => (
        <Project
          {...project}
          key={project.title}
          sectionIndex={sectionIndex}
          setActiveSection={setActiveSection}
        />
      ))}
    </Box>
  )
}

Category.propTypes = {
  projects: arrayOf(
    shape({
      avatarSrc: string,
      projectId: string,
      title: string,
      publications: arrayOf(
        shape({
          authors: string,
          title: string,
          url: string,
          year: string
        })
      )
    })
  ),
  /* sectionIndex matches index order of sections array supplied to Sidebar component */
  sectionIndex: number,
  /* Setting the active section is handled at the page level (Publications) */
  setActiveSection: func,
  slug: string,
  title: string
}

export default Category
