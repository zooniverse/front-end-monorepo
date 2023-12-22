import { Markdownz } from '@zooniverse/react-components'
import withThemeContext from '@zooniverse/react-components/helpers/withThemeContext'
import theme from './theme'
import { Box } from 'grommet'

const AboutMarkdownz = ({ content }) => {
  return (
    <Box pad={{ top: '30px' }}>
      <Markdownz>{content}</Markdownz>
    </Box>
  )
}

export default withThemeContext(AboutMarkdownz, theme)
