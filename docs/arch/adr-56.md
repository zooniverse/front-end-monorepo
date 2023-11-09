# ADR 56: use markdownz to parse markdown

## Context
[ADR 11](./adr-11.md) introduced Remark, to parse markdown in our custom `Markdownz` component. Replacing `markdown-it` with `remark` changed [some features of the Zooniverse markdown parser](./adr-11.md#consequences). Since that decision:
- `remark-react` is now deprecated. It's now recommended to parse markdown to HTML, then use `rehype-react` to map that HTML to a React component tree.
- `markdownz` now sanitises its output HTML with DOMPurify ([v8.3.3](https://github.com/zooniverse/markdownz/releases/tag/v8.3.3)), and exports a `useMarkdownz` hook ([v8.5.0](https://github.com/zooniverse/markdownz/releases/tag/v8.5.0)), removing the security concerns around `dangerouslySetInnerHTML` in ADR 11. 
- With ([v9.0.0](https://github.com/zooniverse/markdownz/releases/tag/v9.0.0)), the `Markdown` component, exported by `markdownz`, uses `rehype-react` to render HTML as a React component tree.
- there has been confusion among project teams about how to write Zooniverse-flavoured markdown for their projects. Markdown that's written and previewed in the project builder needs changes in order to work in the new parser.

## Decision
[PR #5352](https://github.com/zooniverse/front-end-monorepo/pull/5352) updates `@zooniverse/react-components/Markdownz` to parse Zooniverse-flavoured markdown with `markdownz`, then map the output HTML to Zooniverse Grommet components with `react-rehype`.

## Consequences
- Markdown is parsed with `markdown-it`, not Remark.
- Links must be prepended with `+tab+` in order to open in a new tab/window.
- Custom table-of-contents is supported with `[[toc]]`.
- Fragment links to page headings are supported by default (eg. `/about/faq#2.-objects-in-image-margins`.)
- Markdown images with audio and video URLs are automatically converted to `<audio>` and `<video>` tags.

## Status
Accepted