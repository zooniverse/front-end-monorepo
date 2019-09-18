import { SpacedText } from '@zooniverse/react-components'
import { Anchor, Box } from 'grommet'
import Link from 'next/link'
import { bool, node, shape, string } from 'prop-types'
import React from 'react'
import { withTheme } from 'styled-components'

import WidgetHeading from '../WidgetHeading'

function ContentBox (props) {
  const {
    children,
    linkLabel,
    linkUrl,
    theme: { dark },
    title,
    titleLevel,
    ...rest
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
      elevation={dark ? 'xlarge' : 'none'}
      pad='medium'
      {...rest}
    >
      {showHeader && (
        <Box
          align='center'
          as='header'
          direction='row'
          justify={title ? 'between' : 'end'}
          margin={{ bottom: 'small' }}
          wrap
        >

          {title && (
            <WidgetHeading children={title} level={titleLevel} />
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
  theme: shape({ dark: bool }),
  title: string,
  titleLevel: string
}

ContentBox.defaultProps = {
  theme: {
    dark: false
  }
}

export default withTheme(ContentBox)
export { ContentBox }
