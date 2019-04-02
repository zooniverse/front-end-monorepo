import { SpacedText } from '@zooniverse/react-components'
import { Anchor, Box, Heading } from 'grommet'
import Link from 'next/link'
import { node, string } from 'prop-types'
import React from 'react'

function ContentBox ({ className, children, linkLabel, linkUrl, mode, title }) {
  const showHeader = title || (linkLabel && linkUrl)
  return (
    <Box
      background={mode === 'light' ? 'white' : 'dark-3'}
      border={{
        color: mode === 'light' ? 'light-3' : 'dark-3',
        side: 'all',
        size: 'thin'
      }}
      className={className}
      elevation={mode === 'light' ? 'none' : 'large'}
      pad='medium'
    >
      {showHeader && (
        <Box
          align='center'
          as='header'
          direction='row'
          justify={title ? 'between' : 'end'}
          margin={{ bottom: 'small' }}
        >

          {title && (
            <Heading level='4' margin='none'>
              <SpacedText
                color={mode === 'light' ? 'black' : 'light-1'}
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
