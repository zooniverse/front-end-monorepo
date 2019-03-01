import { SpacedText } from '@zooniverse/react-components'
import { Anchor, Box, Heading } from 'grommet'
import Link from 'next/link'
import { node, string } from 'prop-types'
import React from 'react'

function ContentBox ({ children, linkLabel, linkUrl, mode, title }) {
  const showHeader = title || (linkLabel && linkUrl)
  return (
    <Box
      background={mode === 'light' ? 'white' : '#333'}
      border={{
        color: mode === 'light' ? 'lightGrey' : '#333',
        side: 'all',
        size: 'thin'
      }}
      elevation={mode === 'light' ? 'none' : 'large'}
      pad='medium'
    >
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
              <SpacedText
                color={mode === 'light' ? 'black' : 'lighterGrey'}
                weight='bold'
              >
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
  linkLabel: string,
  linkUrl: string,
  title: string,
  mode: string
}

export default ContentBox
