import { Box } from 'grommet'
import { node, object, string } from 'prop-types'

import ContentHeading from './components/ContentHeading'
import ContentLink from './components/ContentLink'

function ContentBox({
  children,
  linkLabel,
  linkProps,
  title,
  ...rest
}) {
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
      border={{
        color: {
          dark: 'light-1',
          light: 'light-5'
        },
        side: 'all',
        size: '0.5px'
      }}
      elevation='xsmall'
      pad='30px'
      round='8px'
      {...rest}
    >
      {showHeader && (
        <Box
          align='center'
          direction='row'
          justify={title ? 'between' : 'end'}
          margin={{ bottom: 'small' }}
          wrap
        >

          {title && (
            <ContentHeading>
              {title}
            </ContentHeading>
          )}

          {link.text && (
            <ContentLink
              link={link}
            />   
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
  linkProps: object,
  title: string
}

export default ContentBox
