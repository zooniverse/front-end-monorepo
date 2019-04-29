import { Anchor, Box } from 'grommet'
import { shape, string } from 'prop-types'
import React from 'react'

function Publication (props) {
  const { citation, url } = props.data
  return (
    <Box key={citation} margin={{ bottom: 'small' }}>
      <div>
        {citation}
      </div>
      <div>
        <Anchor href={url}>
          View publication.
        </Anchor>
      </div>
    </Box>
  )
}

Publication.propTypes = {
  data: shape({
    citation: string,
    url: string
  })
}

export default Publication
