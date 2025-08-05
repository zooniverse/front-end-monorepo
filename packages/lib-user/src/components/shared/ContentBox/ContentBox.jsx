import { Box, ResponsiveContext } from 'grommet'
import { node, object, string } from 'prop-types'
import { useContext } from 'react'

import ContentHeading from './components/ContentHeading'
import ContentLink from './components/ContentLink'

function ContentBox({
  children,
  linkLabel = undefined,
  linkProps = undefined,
  title = undefined,
  titleId = undefined,
  toolTip = undefined,
  ...rest
}) {
  const size = useContext(ResponsiveContext)
  const border = size === 'small' ? false
    : {
      color: {
        dark: 'light-1',
        light: 'light-5'
      },
      side: 'all',
      size: '0.5px'
    }
  const showHeader = title || (linkLabel && linkProps)
  const link = {
    ...linkProps,
    text: linkLabel
  }

  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'white'
      }}
      border={border}
      elevation={size === 'small' ? 'none' : 'xsmall'}
      pad={size !== 'small' ? '30px' : '20px'}
      round={size === 'small' ? 'none' : '8px'}
      {...rest}
    >
      {showHeader ? (
        <Box
          align='center'
          direction='row'
          justify={title ? 'between' : 'end'}
          margin={{ bottom: 'small' }}
          wrap
        >

          {title ? (
            <ContentHeading id={titleId}>
              {title}
              {toolTip ? toolTip : null}
            </ContentHeading>
          ) : null}

          {link.text ? (
            <ContentLink
              link={link}
            />
          ) : null}

        </Box>
      ) : null}
      {children}
    </Box>
  )
}

ContentBox.propTypes = {
  children: node.isRequired,
  linkLabel: string,
  linkProps: object,
  screenSize: string,
  title: string,
  titleId: string,
  toolTip: node
}

export default ContentBox
