import { Anchor, Box } from 'grommet'
import { arrayOf, string} from 'prop-types'
import React from 'react'

import zipLabelsAndUrls from '../../helpers/zipLabelsAndUrls'
import SpacedText from '../../../SpacedText'

export default function PolicyLinkSection ({ className, labels, urls }) {
  const links = zipLabelsAndUrls(labels, urls)

  return (
    <Box role='presentation' as='nav' className={className} direction='row' gap='medium'>

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
