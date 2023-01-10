import { Fragment, useCallback } from 'react'
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

import remark from 'remark'
import remark2react from 'remark-react'
import emoji from 'remark-emoji'
import remarkSubSuper from 'remark-sub-super'
import externalLinks from 'remark-external-links'
import toc from 'remark-toc'
import ping from './lib/ping'
import footnotes from 'remark-footnotes'
import Media from '../Media'
import withThemeContext from '../helpers/withThemeContext'
import theme from './theme'

const HASHTAG = '#'
const AT = '@'
const SUBJECT_SYMBOL = '^S'

export const RESTRICTED_USERNAMES = ['admins', 'moderators', 'researchers', 'scientists', 'team', 'support']

// Support image resizing, video, and audio using markdown's image syntax
export function renderMedia(nodeProps) {
  let width, height
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

export function buildResourceURL(baseURI, projectSlug, resource, symbol) {
  if (!resource) return ''
  const baseURL = (projectSlug) ? `${baseURI}/projects/${projectSlug}` : baseURI

  if (symbol === HASHTAG) return (projectSlug) ? `${baseURL}/talk/tag/${resource}` : `${baseURL}/talk/search?query=%23${resource}`
  if (symbol === AT) return `${baseURL}/users/${resource}`
  if (symbol === SUBJECT_SYMBOL && projectSlug) return `${baseURL}/talk/subjects/${resource}`

  return ''
}

export function shouldResourceBeLinkable(restrictedUserNames, projectSlug, resource, symbol) {
  if (symbol === AT) return !restrictedUserNames.includes(resource)
  if (symbol === SUBJECT_SYMBOL) return !!projectSlug
  return true
}

export function replaceImageString(img, altText, imageURL, imageSize) {
  return `![${altText} ${imageSize}](${imageURL})`
}

function Markdownz({
  baseURI = '',
  children,
  components = {},
  projectSlug = '',
  restrictedUserNames = RESTRICTED_USERNAMES,
  settings = {}
}) {
  if (!children) return null

  if (Object.keys(components).includes('img')) {
    console.warn('Overriding the rendering function for the img tag may break the syntax support for image resizing and using image markup for video and audio. Are you sure you want to do this?')
  }

  const imageRegex = /!\[([^\]]+?)\]\((https:\/\/[^)]+?) (=\d+?(|%|px|em|rem|vw)x\d*?(|%|px|em|rem|vh))\)/g
  const newChildren = children.replace(imageRegex, replaceImageString)

  const remarkReactComponents = { ...componentMappings, ...components }
  const remarkSettings = { ...settings }

  const pingCallback = useCallback(
    (resource, symbol) => shouldResourceBeLinkable(restrictedUserNames, projectSlug, resource, symbol),
    [restrictedUserNames, projectSlug]
  )
  const resourceURL = useCallback(
    (resource, symbol) => buildResourceURL(baseURI, projectSlug, resource, symbol),
    [baseURI, projectSlug]
  )
  let markdown = null
  try {
    markdown = remark()
      .data('settings', remarkSettings)
      .use(emoji)
      .use(remarkSubSuper)
      .use(externalLinks)
      .use(footnotes, { inlineNotes: true })
      .use(ping, {
        ping: pingCallback,
        pingSymbols: [AT, HASHTAG, SUBJECT_SYMBOL],
        resourceURL
      })
      .use(toc)
      .use(remark2react, { remarkReactComponents })
      .processSync(newChildren).result
  } catch (error) {
    markdown = error.message
  }
  return (
    <Fragment>
      {markdown}
    </Fragment>
  );
}

Markdownz.propTypes = {
  baseURI: PropTypes.string,
  children: PropTypes.string.isRequired,
  components: PropTypes.object,
  projectSlug: PropTypes.string,
  restrictedUserNames: PropTypes.arrayOf(PropTypes.string),
  settings: PropTypes.object
}

export { Markdownz }
export default withThemeContext(Markdownz, theme)
