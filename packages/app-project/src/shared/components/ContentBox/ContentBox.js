import { Box } from 'grommet'
import { bool, node, object, shape, string } from 'prop-types'
import { withTheme } from 'styled-components'
import NavLink from '@shared/components/NavLink'

import WidgetHeading from '../WidgetHeading'

function ContentBox (props) {
  const {
    children,
    linkLabel,
    linkProps,
    theme: { dark },
    title,
    titleLevel,
    ...rest
  } = props

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
            <WidgetHeading level={titleLevel}>{title}</WidgetHeading>
          )}

          {link.text && (
            <NavLink
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
