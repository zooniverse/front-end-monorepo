# ADR 11: Using Grommet's Markdown component instead of the in-house built markdownz library

Created: December 19, 2018

## Context

Markdown can help prevent XSS type security vulnerabilities and is generally safer to use than HTML for user submitted content on the web. Panoptes-Front-End uses markdown through out the entire application. Currently we support an in-house markdown renderer, [markdownz](https://github.com/zooniverse/markdownz), that uses  [markdown-it](https://github.com/markdown-it/markdown-it). The library markdown-it is mature and has several plug-ins available for it that we've added to markdownz as well as some of our own customizations.

Markdown, however, isn't totally free from being exploitable, nor is React. Markdownz relies on a React method, `dangerouslySetInnerHTML` that potentially open us to vulnerabilities (see this line: https://github.com/zooniverse/markdownz/blob/master/src/components/markdown.jsx#L99). 

Now that we've adopted Grommet as general React component library, Grommet also provides a React [markdown](https://v2.grommet.io/markdown) renderer ([code](https://github.com/grommet/grommet/blob/master/src/js/components/Markdown/Markdown.js)). Grommet's markdown component uses [markdown-to-jsx](https://github.com/probablyup/markdown-to-jsx) which instead converts markdown to React components to use instead of relying on `dangerouslySetInnerHTML`. 

TODO: Can markdown-to-jsx do all of the plugins we've setup with markdown-it?

## Decision

We will make a new `Markdownz` React component that will be a part of the Zooniverse React component library. This new component will be built on top of Grommet's `Markdown` component with the necessary additional markdown customizations passed down as props.

## Status

Proposed

## Consequences

- This will decrease the amount of code we're maintain ourselves and will enable us to only maintain the customizations rather than both the customizations and the renderer.
- Grommet's library does not have a markdown editor component, so we may still need to maintain a custom markdown editor.
- Rendered markdown will adopt the theme styles we've set globally in the `Grommet` component since the markdown is converted to Grommet React components or general React components that represent HTML (done by markdown-to-jsx).

