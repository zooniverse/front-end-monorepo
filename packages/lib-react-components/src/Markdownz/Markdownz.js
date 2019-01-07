import React from 'react'
import PropTypes from 'prop-types'
import {
  Anchor,
  Heading,
  Image,
  Paragraph,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  TableFooter,
  Text,
  Video
} from 'grommet'

import remark from 'remark'
import remark2react from 'remark-react'
import emoji from 'remark-emoji'
import remarkSubSuper from 'remark-sub-super'
import externalLinks from 'remark-external-links'
import toc from 'remark-toc'
import ping from './lib/ping'

const hashtag = '#'
const at = '@'
const subjectSymbol = '^S'

class Markdownz extends React.Component {
  // Matches @username, #hashtag, or ^S1234 (subject id).
  // Must be called usernameRegex because of remarkPing's API
  static matchRegex = /[@,#]?(\w+)|(\^S[0-9]+)/

  buildTagSearchURL(tag, projectURLSection, uri) {
    if (projectURLSection) return `${uri}/${projectURLSection}/talk/tag/${tag}`

    return `${uri}/talk/search?query=${tag}`
  }

  buildUserURL(username, projectURLSection, uri) {
    if (projectURLSection) {
      return `${uri}/${projectURLSection}/users/${username}`
    }

    return `${uri}/users/${username}`
  }

  buildSubjectURL(subjectId, projectURLSection, uri) {
    if (projectURLSection) return `${uri}/${projectURLSection}/talk/subjects/${subjectId}`

    return ''
  }

  buildResourceUrl(resource, symbol) {
    const { baseURI, projectSlug } = this.props
    const uri = baseURI || ''
    let owner, name, projectURLSection
    if (projectSlug) {
      [owner, name] = projectSlug.split('/')
      projectURLSection = `projects/${owner}/${name}`
    }

    if (symbol === hashtag) return this.buildTagSearchURL(resource, projectURLSection, uri)
    if (symbol === at) return this.buildUserURL(resource, projectURLSection, uri)
    if (symbol === subjectSymbol) return this.buildSubjectURL(resource, projectURLSection, uri)

    return ''
  }

  shouldResourceBePingable(resource, symbol) {
    const { projectSlug, restrictedUserNames } = this.props

    if (symbol === at) return !restrictedUserNames.includes(resource)
    if (symbol === subjectSymbol) return projectSlug

    return true
  }

  render() {
    const { children, components, settings } = this.props
    const componentMappings = {
      a: Anchor,
      h1: (nodeProps) => <Heading level='1'>{nodeProps.children}</Heading>,
      h2: (nodeProps) => <Heading level='2'>{nodeProps.children}</Heading>,
      h3: (nodeProps) => <Heading level='3'>{nodeProps.children}</Heading>,
      h4: (nodeProps) => <Heading level='4'>{nodeProps.children}</Heading>,
      h5: (nodeProps) => <Heading level='5'>{nodeProps.children}</Heading>,
      h6: (nodeProps) => <Heading level='6'>{nodeProps.children}</Heading>,
      img: (nodeProps) => { console.log('nodeProps', nodeProps); return <Image />},
      p: Paragraph,
      span: Text,
      table: Table,
      tfoot: TableFooter,
      thead: TableHeader,
      tbody: TableBody,
      td: TableCell,
      tr: TableRow,
      video: Video
    }

    const remarkReactComponents = Object.assign({}, components, componentMappings)
    const remarkSettings = Object.assign({}, { footnotes: true }, settings)

    // Support image resizing


    const markdown = remark()
      .data('settings', remarkSettings)
      .use(emoji)
      .use(remarkSubSuper)
      .use(externalLinks)
      .use(ping, {
        ping: (resource, symbol) => this.shouldResourceBePingable(resource, symbol), // We could support passing in a prop to call a function here
        pingSymbols: [at, hashtag, subjectSymbol],
        resourceUrl: (resource, symbol) => this.buildResourceUrl(resource, symbol),
        matchRegex: /(@[A-Za-z0-9]+)|(#[A-Za-z0-9]+)|(\^S[0-9]+)/
      })
      .use(toc)
      .use(remark2react, { remarkReactComponents })
      .processSync(children).contents

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
  restrictedUserNames: ['admins', 'moderators', 'researchers', 'scientists', 'team'],
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

export default Markdownz