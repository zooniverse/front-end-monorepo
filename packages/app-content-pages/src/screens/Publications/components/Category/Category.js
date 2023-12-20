import { Box } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import { HeadingForNav } from '../../../../shared/components/SharedStyledComponents/SharedStyledComponents.js'

import Project from '../Project/Project.js'

function Category({ projects = [], slug = '', title = '' }) {
  return (
    <Box as='section'>
      <HeadingForNav
        id={slug}
        color={{ light: 'black', dark: 'white' }}
        level={2}
        size='1.5rem'
        tabIndex={-1}
        textAlign='center'
        style={{ padding: '30px 0' }}
      >
        {title}
      </HeadingForNav>
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
