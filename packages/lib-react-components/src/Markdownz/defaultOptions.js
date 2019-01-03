import React from 'react'
// Zooniverse flavored markdown
// customization options in the format expected by markdown-to-jsx

// TODO: Migrate other customizations
function createAnchorForNewTab (type, props, children) {
  const href = props.href.split('+tab+')[1]
  const mergedProps = Object.assign({}, props, {
    href,
    rel: 'noopener nofollow',
    target: '_blank',
  })
  return React.createElement(type, mergedProps, children)
}

// The underlying library markdown-to-jsx that Grommet's Markdown component uses
// Does not correctly follow spec regarding _ or * that aren't surrounded by a space
// Fix borrowed from https://github.com/grommet/grommet-swagger/blob/master/src/utils.js#L64-L81
// Response from library author: https://github.com/probablyup/markdown-to-jsx/issues/200
function sanitizeForMarkdown(stringForMd) {
  if (!stringForMd) {
    return '';
  }
  let mdStringWithBreaks = stringForMd.replace(new RegExp('</BR>', 'gi'), '\n\n');
  mdStringWithBreaks = mdStringWithBreaks.replace(new RegExp('\\n\\n', 'gi'), ' \n\n ');
  const mdArray = mdStringWithBreaks.split(' ');
  const cleanMdArray = mdArray.map((md) => {
    // Avoid errors in situations like this - '_this should all style_, rest of the string...'
    const actualString = md.replace(new RegExp('[.,]', 'g'), '');
    if (actualString.indexOf('_') > 1 && actualString.indexOf('_') !== actualString.length - 1) {
      // This is an underscore that is not preceeded by a space and should not be em styled.
      return md.replace(new RegExp('_', 'gi'), '\\_');
    }
    return md;
  });
  return cleanMdArray.join(' ');
}

export default {
  createAnchorForNewTab,
  sanitizeForMarkdown
}