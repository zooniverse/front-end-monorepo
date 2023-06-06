import { Box, Heading } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'

import Publication from '../Publication/Publication.js'

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
          key={publication.url}
          {...publication}
        />
      ))}
    </Box>
  )
}

Project.propTypes = {
  avatarSrc: string,
  projectId: string,
  title: string,
  publications: arrayOf(shape({
    authors: string,
    title: string,
    url: string,
    year: string
  }))
}

export default Project
