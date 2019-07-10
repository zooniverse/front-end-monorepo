import { Box, Heading } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import React from 'react'

import Publication from '../Publication'

function Project (props) {
  const { avatarSrc, id, title, publications } = props
  return (
    <Box as='section' key={id} margin={{ bottom: 'medium' }}>
      <Heading level='3' margin={{ bottom: 'small', top: 'none' }} size='small'>
        {title} ({publications.length})
      </Heading>
      {publications.map(publication => (
        <Publication
          avatarSrc={avatarSrc}
          key={publication.id}
          {...publication}
        />
      ))}
    </Box>
  )
}

Project.propTypes = {
  avatarSrc: string,
  id: string,
  title: string,
  publications: arrayOf(shape({
    id: string
  }))
}

export default Project
