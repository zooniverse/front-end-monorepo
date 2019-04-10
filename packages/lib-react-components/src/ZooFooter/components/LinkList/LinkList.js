import { Anchor, Box } from 'grommet'
import { arrayOf, string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import zipLabelsAndUrls from '../../helpers/zipLabelsAndUrls'
import SpacedText from '../../../SpacedText'

const StyledBox = styled(Box)`
  list-style-type: none;
  padding: 0;
`

export default function LinkList ({ className, colorTheme, labels, urls }) {
  const [title, ...links] = zipLabelsAndUrls(labels, urls)

  return (
    <StyledBox
      className={className}
      direction='column'
      tag='ul'
    >

      <li>
        <SpacedText weight='bold'>
          <Anchor href={title.url}>
            {title.label}
          </Anchor>
        </SpacedText>
      </li>

      {links.length > 0 && links.map(link => (
        <li key={link.url}>
          <Anchor
            color={(colorTheme === 'light') ? 'dark-5' : 'light-3'}
            href={link.url}
            size='small'
          >
            {link.label}
          </Anchor>
        </li>
      ))}

    </StyledBox>
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
