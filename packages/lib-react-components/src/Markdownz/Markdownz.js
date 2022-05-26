import React from 'react'
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

const hashtag = '#'
const at = '@'
const subjectSymbol = '^S'

class Markdownz extends React.Component {
  buildResourceURL (resource, symbol) {
    if (!resource) return ''
    const { baseURI, projectSlug } = this.props
    const baseURL = (projectSlug) ? `${baseURI}/projects/${projectSlug}` : baseURI

    if (symbol === hashtag) return (projectSlug) ? `${baseURL}/talk/tag/${resource}` : `${baseURL}/talk/search?query=%23${resource}`
    if (symbol === at) return `${baseURL}/users/${resource}`
    if (symbol === subjectSymbol && projectSlug) return `${baseURL}/talk/subjects/${resource}`

    return ''
  }

  shouldResourceBeLinkable (resource, symbol) {
    const { projectSlug, restrictedUserNames } = this.props

    if (symbol === at) return !restrictedUserNames.includes(resource)
    if (symbol === subjectSymbol) return !!projectSlug

    return true
  }

  // Support image resizing, video, and audio using markdown's image syntax
  renderMedia (nodeProps) {
    let width, height
    const imgSizeRegex = /=(\d+(%|px|em|rem|vw)?)x(\d+(%|px|em|rem|vh)?)?/
    let alt = nodeProps.alt
    const src = nodeProps.src
    const match = alt.match(imgSizeRegex)

    if (match && match.length > 0) {
      width = parseInt(match[1])
      height = parseInt(match[3])
      alt = alt.split(match[0])[0].trim()
      if (width && !height) height = 'none'
    }

    if (src) return <Media alt={alt} height={height} src={src} width={width} />
    return null
  }

  replaceImageString (img, altText, imageURL, imageSize) {
    return `![${altText} ${imageSize}](${imageURL})`
  }

  render () {
    const { children, components, settings } = this.props

    if (!children) return null

    if (Object.keys(components).includes('img')) {
      console.warn('Overriding the rendering function for the img tag may break the syntax support for image resizing and using image markup for video and audio. Are you sure you want to do this?')
    }

    const imageRegex = /!\[([^\]]+?)\]\((https:\/\/[^)]+?) (=\d+?(|%|px|em|rem|vw)x\d*?(|%|px|em|rem|vh))\)/g
    const newChildren = children.replace(imageRegex, this.replaceImageString)

    const componentMappings = {
      a: Anchor,
      h1: (nodeProps) => <Heading level='1'>{nodeProps.children}</Heading>,
      h2: (nodeProps) => <Heading level='2'>{nodeProps.children}</Heading>,
      h3: (nodeProps) => <Heading level='3'>{nodeProps.children}</Heading>,
      h4: (nodeProps) => <Heading level='4'>{nodeProps.children}</Heading>,
      h5: (nodeProps) => <Heading level='5'>{nodeProps.children}</Heading>,
      h6: (nodeProps) => <Heading level='6'>{nodeProps.children}</Heading>,
      hr: () => <hr style={{ width: '100%' }} />,
      img: (nodeProps) => this.renderMedia(nodeProps),
      p: Paragraph,
      span: Text,
      table: Table,
      tfoot: TableFooter,
      thead: TableHeader,
      tbody: TableBody,
      td: TableCell,
      tr: TableRow,
      ol: (nodeProps) => <ol style={{ color: '#000000', fontSize: '14px', marginTop: 0 }}>{nodeProps.children}</ol>,
      ul: (nodeProps) => <ul style={{ color: '#000000', fontSize: '14px', marginTop: 0 }}>{nodeProps.children}</ul>
    }

    const remarkReactComponents = Object.assign({}, componentMappings, components)
    const remarkSettings = Object.assign({}, settings)

    const markdown = remark()
      .data('settings', remarkSettings)
      .use(emoji)
      .use(remarkSubSuper)
      .use(externalLinks)
      .use(footnotes, { inlineNotes: true })
      .use(ping, {
        ping: (resource, symbol) => this.shouldResourceBeLinkable(resource, symbol), // We could support passing in a prop to call a function here
        pingSymbols: [at, hashtag, subjectSymbol],
        resourceURL: (resource, symbol) => this.buildResourceURL(resource, symbol)
      })
      .use(toc)
      .use(remark2react, { remarkReactComponents })
      .processSync(newChildren).result

    return (
      <React.Fragment>
        {markdown}
      </React.Fragment>
    )
  }
}

Markdownz.defaultProps = {
  baseURI: '',
  components: {},
  projectSlug: '',
  restrictedUserNames: ['admins', 'moderators', 'researchers', 'scientists', 'team', 'support'],
  settings: {}
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
