import { Box, Heading } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'

import Project from '../Project'

function Category ({
  title,
  projects,
  slug
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
    id: string
  })),
  title: string
}

export default Category
