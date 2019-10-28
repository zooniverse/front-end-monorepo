import { Anchor, Box } from 'grommet'
import { arrayOf, string } from 'prop-types'
import React from 'react'

import zipLabelsAndUrls from '../../helpers/zipLabelsAndUrls'
import SpacedText from '../../../SpacedText'
import withResponsiveContext from '../../../helpers/withResponsiveContext'

function PolicyLinkSection (props) {
  const { labels, screenSize, urls } = props
  const links = zipLabelsAndUrls(labels, urls)
  const direction = screenSize === 'small' ? 'column' : 'row'
  return (
    <Box as='nav' direction={direction} gap='medium' role='presentation'>

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

export default withResponsiveContext(PolicyLinkSection)
