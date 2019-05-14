import { Box, Heading } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import React from 'react'

import Project from '../Project'

function Category (props) {
  const { title, projects } = props
  return (
    <Box as='section'>
      <Heading level='2' size='small'>
        {title}
      </Heading>
      {projects.map(project => (
        <Project {...project} key={project.id} />
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
