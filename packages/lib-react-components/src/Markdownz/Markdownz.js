import { bool, object, string } from 'prop-types'
import styled from 'styled-components'
import {
  Anchor,
  Heading,
  Paragraph,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  TableFooter,
  Text
} from 'grommet'

import { useMarkdownz } from 'markdownz'
import Media from '../Media'
import withThemeContext from '../helpers/withThemeContext'
import theme from './theme'

// Support image resizing, video, and audio using markdown's image syntax
export function renderMedia(nodeProps) {
  let width = nodeProps.width
  let height = nodeProps.height
  const imgSizeRegex = /=(\d+(%|px|em|rem|vw)?)x(\d+(%|px|em|rem|vh)?)?/
  let alt = nodeProps.alt
  const src = nodeProps.src
  if (src.startsWith('https://cdn.jsdelivr.net/gh/jdecked/twemoji')) {
    // Replace twemoji images with their alt text.
    return alt
  }
  const match = alt.match(imgSizeRegex)

  if (match && match.length > 0) {
    width = parseInt(match[1])
    if (match[3]) height = parseInt(match[3])
    alt = alt.split(match[0])[0].trim()
  }

  if (src) return <Media alt={alt} height={height} src={src} width={width} />
  return null
}

const StyledHorizontalRule = styled.hr`
  width: 100%;
`
const StyledOrderedList = styled.ol`
  font-size: 1rem;
  margin-top: 0;
`
const StyledUnorderedList = styled.ul`
  font-size: 1rem;
  margin-top: 0;
`
const StyledTable = styled(Table)`
  font-size: 1rem;
`

const StyledVideo = styled.video`
  max-width: 100%;
`
const componentMappings = {
  a: Anchor,
  h1: ({ id, children }) => <Heading id={id} level='1'>{children}</Heading>,
  h2: ({ id, children }) => <Heading id={id} level='2'>{children}</Heading>,
  h3: ({ id, children }) => <Heading id={id} level='3'>{children}</Heading>,
  h4: ({ id, children }) => <Heading id={id} level='4'>{children}</Heading>,
  h5: ({ id, children }) => <Heading id={id} level='5'>{children}</Heading>,
  h6: ({ id, children }) => <Heading id={id} level='6'>{children}</Heading>,
  hr: StyledHorizontalRule,
  img: renderMedia,
  p: Paragraph,
  span: Text,
  table: StyledTable,
  tfoot: TableFooter,
  thead: TableHeader,
  tbody: TableBody,
  td: TableCell,
  tr: TableRow,
  ol: StyledOrderedList,
  ul: StyledUnorderedList,
  video: StyledVideo
}

function Markdownz({
  baseURI = '',
  children,
  components = {},
  inline = false,
  projectSlug = '',
  settings = {}
}) {
  if (!children) return null

  if (Object.keys(components).includes('img')) {
    console.warn('Overriding the rendering function for the img tag may break the syntax support for image resizing and using image markup for video and audio. Are you sure you want to do this?')
  }

  const rehypeReactComponents = { ...componentMappings, ...components }
  const rehypeSettings = {
    fragment: true,
    ...settings
  }

  const markdownChildren = useMarkdownz({
    baseURI,
    components: rehypeReactComponents,
    content: children,
    inline,
    project: { slug: projectSlug },
    settings
  })

  return (
    <>
      {markdownChildren}
    </>
  );
}

Markdownz.propTypes = {
  baseURI: string,
  children: string.isRequired,
  components: object,
  inline: bool,
  projectSlug: string,
  settings: object
}

export { Markdownz }
export default withThemeContext(Markdownz, theme)
