import { Anchor, Box } from 'grommet'
import { arrayOf, string} from 'prop-types'
import React from 'react'
import { zipWith } from 'lodash'
import zooTheme from '@zooniverse/grommet-theme'

import zipLabelsAndUrls from '../../helpers/zipLabelsAndUrls'
import SpacedText from '../../../SpacedText'

export default function LinkList ({ colorTheme, labels, urls }) {
  const [title, ...links] = zipLabelsAndUrls(labels, urls)
  const colors = zooTheme[colorTheme].zooFooter.linkList

  return (
    <Box direction='column' gap='xxsmall' tag='nav'>

      <SpacedText weight='bold'>
        <Anchor href={title.url} color={colors.title}>
          {title.label}
        </Anchor>
      </SpacedText>

      {links.length > 0 && links.map(link => (
        <Anchor
          color={colors.item}
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
