import { Anchor, Box } from 'grommet'
import { arrayOf, string} from 'prop-types'
import React from 'react'

import zipLabelsAndUrls from '../../helpers/zipLabelsAndUrls'
import SpacedText from '../../../SpacedText'

export default function LinkList ({ className, colorTheme, labels, urls }) {
  const [title, ...links] = zipLabelsAndUrls(labels, urls)

  return (
    <Box className={className} direction='column' gap='xxsmall' tag='nav'>

      <SpacedText weight='bold'>
        <Anchor href={title.url}>
          {title.label}
        </Anchor>
      </SpacedText>

      {links.length > 0 && links.map(link => (
        <Anchor
          color={(colorTheme === 'light') ? 'dark-5' : 'light-3'}
          href={link.url}
          key={link.url}
          size='small'
        >
          {link.label}
        </Anchor>
      ))}

    </Box>
  )
}

LinkList.propTypes = {
  colorTheme: string,
  labels: arrayOf(string).isRequired,
  urls: arrayOf(string).isRequired
}

LinkList.defaultProps = {
  colorTheme: 'light'
}
