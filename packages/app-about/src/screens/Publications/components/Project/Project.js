import { Box, Heading } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import React from 'react'

import Publication from '../Publication'

function Project (props) {
  const { data } = props
  return (
    <Box as='section' key={data.name}>
      <Heading level='3' size='small'>
        {data.name} ({data.publications.length})
      </Heading>
      {data.publications.map(publication => (
        <Publication data={publication} key={publication.citation} />
      ))}
    </Box>
  )
}

Project.propTypes = {
  data: shape({
    name: string,
    publications: arrayOf(shape({
      citation: string
    }))
  })
}

export default Project
