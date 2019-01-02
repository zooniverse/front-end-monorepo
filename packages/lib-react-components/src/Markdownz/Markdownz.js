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
  Text,
  Video
} from 'grommet'

import remark from 'remark'
import remark2react from 'remark-react'
import emoji from 'remark-emoji'
import remarkSubSuper from 'remark-sub-super'
import externalLinks from 'remark-external-links'
import toc from 'remark-toc'

export default function Markdownz (props) {
  const remarkReactComponents = {
    a: Anchor,
    h1: (props) => <Heading level='1'>{props.children}</Heading>,
    h2: (props) => <Heading level='2'>{props.children}</Heading>,
    h3: (props) => <Heading level='3'>{props.children}</Heading>,
    h4: (props) => <Heading level='4'>{props.children}</Heading>,
    h5: (props) => <Heading level='5'>{props.children}</Heading>,
    h6: (props) => <Heading level='6'>{props.children}</Heading>,
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

  const markdown = remark()
    .data('settings', { footnotes: true })
    .use(emoji)
    .use(remarkSubSuper)
    .use(externalLinks)
    .use(toc)
    .use(remark2react, { remarkReactComponents })
    .processSync(props.children).contents

  return (
    <React.Fragment>
      {markdown}
    </React.Fragment>
  )
}

Markdownz.propTypes = {
  children: PropTypes.string.isRequired,
  options: PropTypes.object
}