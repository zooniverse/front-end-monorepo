import { SpacedText } from '@zooniverse/react-components'
import { Anchor, Box, Heading } from 'grommet'
import Link from 'next/link'
import { node, string } from 'prop-types'
import React from 'react'
import { withTheme } from 'styled-components'

function ContentBox (props) {
  const {
    children,
    className,
    linkLabel,
    linkUrl,
    theme: { dark },
    title
  } = props

  const showHeader = title || (linkLabel && linkUrl)

  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'white'
      }}
      border={{
        color: {
          dark: 'dark-3',
          light: 'light-3'
        },
        side: 'all',
        size: 'thin'
      }}
      className={className}
      elevation={dark ? 'large' : 'none'}
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
                color={{
                  dark: 'light-1',
                  light: 'black'
                }}
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

export default withTheme(ContentBox)
export { ContentBox }
