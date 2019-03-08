import { Anchor, Box } from 'grommet'
import { arrayOf, string} from 'prop-types'
import React from 'react'

import zipLabelsAndUrls from '../../helpers/zipLabelsAndUrls'
import SpacedText from '../../../SpacedText'

export default function PolicyLinkSection ({ labels, urls }) {
  const links = zipLabelsAndUrls(labels, urls)

  return (
    <Box direction='row' gap='medium' tag='nav'>

      {links.length > 0 && links.map(link => (
        <Anchor
          href={link.url}
          key={link.url}
          size='small'
        >
          <SpacedText weight='bold'>
            {link.label}
          </SpacedText>
        </Anchor>
      ))}

    </Box>
  )
}

PolicyLinkSection.propTypes = {
  labels: arrayOf(string).isRequired,
  urls: arrayOf(string).isRequired
}
