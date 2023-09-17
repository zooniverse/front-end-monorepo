import { createElement, Fragment, useCallback } from 'react'
import PropTypes from 'prop-types'
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

import { utils } from 'markdownz'
import rehype from 'rehype'
import rehype2react from 'rehype-react'
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
  const match = alt.match(imgSizeRegex)

  if (match && match.length > 0) {
    width = parseInt(match[1])
    if (match[3]) height = parseInt(match[3])
    alt = alt.split(match[0])[0].trim()
  }

  if (src) return <Media alt={alt} height={height} src={src} width={width} />
  return null
}

const componentMappings = {
  a: Anchor,
  h1: ({ children }) => <Heading level='1'>{children}</Heading>,
  h2: ({ children }) => <Heading level='2'>{children}</Heading>,
  h3: ({ children }) => <Heading level='3'>{children}</Heading>,
  h4: ({ children }) => <Heading level='4'>{children}</Heading>,
  h5: ({ children }) => <Heading level='5'>{children}</Heading>,
  h6: ({ children }) => <Heading level='6'>{children}</Heading>,
  hr: () => <hr style={{ width: '100%' }} />,
  img: renderMedia,
  p: Paragraph,
  span: Text,
  table: Table,
  tfoot: TableFooter,
  thead: TableHeader,
  tbody: TableBody,
  td: TableCell,
  tr: TableRow,
  ol: ({ children }) => <ol style={{ fontSize: '14px', marginTop: 0 }}>{children}</ol>,
  ul: ({ children }) => <ul style={{ fontSize: '14px', marginTop: 0 }}>{children}</ul>
}

function Markdownz({
  baseURI = '',
  children,
  components = {},
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

  const html = utils.getHtml({
    baseURI,
    content: children,
    project: {
      slug: projectSlug
    }
  })
  let parsedHTML = null
  try {
    parsedHTML = rehype()
      .data('settings', rehypeSettings)
      .use(rehype2react, {
        Fragment,
        createElement,
        components: rehypeReactComponents
      })
      .processSync(html).result
  } catch (error) {
    parsedHTML = error.message
  }
  return (
    <Fragment>
      {parsedHTML}
    </Fragment>
  );
}

Markdownz.propTypes = {
  baseURI: PropTypes.string,
  children: PropTypes.string.isRequired,
  components: PropTypes.object,
  projectSlug: PropTypes.string,
  settings: PropTypes.object
}

export { Markdownz }
export default withThemeContext(Markdownz, theme)
