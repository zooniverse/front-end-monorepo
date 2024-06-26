import { Box } from 'grommet'
import { node, object, string } from 'prop-types'
import { withResponsiveContext } from '@zooniverse/react-components'

import ContentHeading from './components/ContentHeading'
import ContentLink from './components/ContentLink'

function ContentBox({
  children,
  linkLabel = undefined,
  linkProps = undefined,
  screenSize = 'small',
  title = undefined,
  toolTip = undefined,
  ...rest
}) {
  const border = screenSize === 'small' ? false
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
      elevation={screenSize === 'small' ? 'none' : 'xsmall'}
      pad='30px'
      round={screenSize === 'small' ? 'none' : '8px'}
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
            <ContentHeading>
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
  toolTip: node
}

export default withResponsiveContext(ContentBox)
export { ContentBox }
