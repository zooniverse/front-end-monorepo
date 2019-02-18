import { Anchor, Box, Heading } from 'grommet'
import { node, string } from 'prop-types'
import React from 'react'
import { SpacedText } from '@zooniverse/react-components'
import Link from 'next/link'

export default function ContentBox ({ children, linkLabel, linkUrl, title }) {
  const showHeader = title || (linkLabel && linkUrl)
  return (
    <Box background='white' border='all' pad='medium'>
      {showHeader && (
        <Box
          align='center'
          as='header'
          direction='row'
          justify={title ? 'between' : 'end'}
          margin={{ bottom: 'medium' }}
        >
          {title && (
            <Heading level='4' margin='none'>
              <SpacedText color='black' weight='bold'>
                {title}
              </SpacedText>
            </Heading>
          )}
          {(linkLabel && linkUrl) && (
            <Link href={linkUrl} passHref>
              <Anchor>
                <SpacedText>
                  {linkLabel}
                </SpacedText>
              </Anchor>
            </Link>
          )}
        </Box>
      )}
      {children}
    </Box>
  )
}

ContentBox.propTypes = {
  children: node,
  title: string
}
