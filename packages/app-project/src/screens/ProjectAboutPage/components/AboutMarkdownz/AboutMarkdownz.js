import { withThemeContext, Markdownz } from '@zooniverse/react-components'
import theme from './theme'
import { Box } from 'grommet'

const AboutMarkdownz = ({ content }) => {
  return (
    <Box>
      <Markdownz children={content} />
    </Box>
  )
}

export default withThemeContext(AboutMarkdownz, theme)
