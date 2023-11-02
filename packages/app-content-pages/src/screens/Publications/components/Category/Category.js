import { Box } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import { SpacedHeading } from '@zooniverse/react-components'

import Project from '../Project/Project.js'

function Category({ projects = [], slug = '', title = '' }) {
  return (
    <Box as='section'>
      <SpacedHeading
        id={slug}
        color='dark-5'
        level='2'
        size='1.5rem'
        textAlign='center'
      >
        {title}
      </SpacedHeading>
      {projects.map(project => (
        <Project {...project} key={project.title} />
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
  slug: string,
  title: string
}

export default Category
