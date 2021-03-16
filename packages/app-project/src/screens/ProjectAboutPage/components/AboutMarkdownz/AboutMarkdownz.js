import { withThemeContext } from '@zooniverse/react-components'
import theme from './theme'
import { Box } from 'grommet'
import { Markdownz } from '@zooniverse/react-components'

const AboutMarkdownz = ({ content }) => {
  return (
    <Box>
      <Markdownz children={content} />
    </Box>
  )
}

export default withThemeContext(AboutMarkdownz, theme)
