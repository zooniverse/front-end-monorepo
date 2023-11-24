import { Markdownz } from '@zooniverse/react-components'
import withThemeContext from '@zooniverse/react-components/helpers/withThemeContext'
import { Box } from 'grommet'
import Link from 'next/link'
import theme from './theme'

const components = {
  a: Link
}

const AboutMarkdownz = ({ content }) => {
  return (
    <Box>
      <Markdownz components={components}>{content}</Markdownz>
    </Box>
  )
}

export default withThemeContext(AboutMarkdownz, theme)
