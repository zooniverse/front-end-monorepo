import { Markdownz } from '@zooniverse/react-components'
import withThemeContext from '@zooniverse/react-components/helpers/withThemeContext'
import theme from './theme'

const AboutMarkdownz = ({ content = '' }) => {
  return <Markdownz>{content}</Markdownz>
}

export default withThemeContext(AboutMarkdownz, theme)
