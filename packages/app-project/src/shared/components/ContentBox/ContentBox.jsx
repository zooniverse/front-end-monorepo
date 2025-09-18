import { Box } from 'grommet'
import { bool, node, object, shape, string } from 'prop-types'
import { withTheme } from 'styled-components'
import NavLink from '@shared/components/NavLink'

import WidgetHeading from '../WidgetHeading'

const THEME = { dark: false }

function ContentBox({
  children,
  linkLabel,
  linkProps,
  theme = THEME,
  title,
  titleLevel,
  ...rest
}) {
  const { dark = false } = theme
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

export default withTheme(ContentBox)
export { ContentBox }
