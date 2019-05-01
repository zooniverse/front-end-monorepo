import { Anchor, Box } from 'grommet'
import { arrayOf, string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import zipLabelsAndUrls from '../../helpers/zipLabelsAndUrls'
import SpacedText from '../../../SpacedText'

const StyledBox = styled(Box)`
  height: 100%;
  list-style-type: none;
`

export default function LinkList ({ className, labels, urls }) {
  const [title, ...links] = zipLabelsAndUrls(labels, urls)

  return (
    <StyledBox
      className={className}
      direction='column'
      pad='none'
      tag='ul'
    >

      <li>
        <SpacedText size='medium' weight='bold'>
          <Anchor href={title.url}>
            {title.label}
          </Anchor>
        </SpacedText>
      </li>

      {links.length > 0 && links.map(link => (
        <li key={link.url}>
          <Anchor
            color={{
              dark: 'light-3',
              light: 'dark-5'
            }}
            href={link.url}
            size='medium'
          >
            {link.label}
          </Anchor>
        </li>
      ))}

    </StyledBox>
  )
}

LinkList.propTypes = {
  labels: arrayOf(string).isRequired,
  urls: arrayOf(string).isRequired
}
