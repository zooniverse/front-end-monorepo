import { Box, Heading } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'

import Project from '../Project/Project.js'

function Category ({
  projects = [],
  slug = '',
  title = ''
}) {
  return (
    <Box as='section'>
      <Heading id={slug} level='2' size='small'>
        {title}
      </Heading>
      {projects.map(project => (
        <Project
          {...project}
          key={project.title}
        />
      ))}
    </Box>
  )
}

Category.propTypes = {
  projects: arrayOf(shape({
    avatarSrc: string,
    projectId: string,
    title: string,
    publications: arrayOf(shape({
      authors: string,
      title: string,
      url: string,
      year: string
    }))
  })),
  slug: string,
  title: string
}

export default Category
