import React from 'react'
import PropTypes from 'prop-types'
import { Markdown as GrommetMarkdown } from 'grommet'
import defaultOptions from './defaultOptions'

const { createAnchorForNewTab, sanitizeForMarkdown } = defaultOptions

export default function Markdownz (props) {
  const { children, options } = props
  const mergedOptions =  {
    createElement(type, props, children) {
      if (type === 'a' && props.href && props.href.startsWith('+tab+')) {
        return createAnchorForNewTab(type, props, children)
      }

      return React.createElement(type, props, children)
    },
    ...options
  }
  const sanitizedMarkdownContent = sanitizeForMarkdown(children)

  // Grommet Markdown is not styling anchors correctly to theme
  // Issue: https://github.com/grommet/grommet/issues/2515
  return (
    <GrommetMarkdown options={mergedOptions}>
      {sanitizedMarkdownContent}
    </GrommetMarkdown>
  )
}

Markdownz.propTypes = {
  children: PropTypes.string.isRequired,
  options: PropTypes.object
}