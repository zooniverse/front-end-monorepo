import { Box, Heading } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import React from 'react'

import Project from '../Project'

function Category (props) {
  const { name, projects } = props.data
  return (
    <Box as='section'>
      <Heading level='2' size='small'>
        {name}
      </Heading>
      {projects.map(project => (
        <Project data={project} key={project.name} />
      ))}
    </Box>
  )
}

Category.propTypes = {
  data: shape({
    category: shape({
      name: string
    }),
    projects: arrayOf(shape({
      name: string
    }))
  })
}

export default Category
