`Markdownz` is a component that wraps a child string of markdown and parses it. The parser is [remark](https://github.com/remarkjs/remark) configured with several plugins. See the storybook for examples of how the markdown is rendered.

## Usage example

```js

class ParentComponent extends React.Component {
  render() {
    return (
      <Markdownz>
        {`
          This is my markdown content

          ## Hello World

          [a link](https://www.example.com)
        `}
      </Markdownz>
    )
  }
}

```

## Configuration

`Markdownz` supports several props:

- baseURI - _(string)_ If you need to set the URL for pingable resources to not be relative, i.e. the URL link for `@srallen` will be set as `'${baseURI}/users/srallen'` instead of left as relative. Defaults to an empty string.
- children - _(string)_ The markdown string. Required.
- components - _(object)_ An object that maps HTML tags to custom React components. This gets merged into the default configuration. The default maps the following to Grommet components:
```js
{
  a: Anchor,
  h1: (nodeProps) => <Heading level='1'>{nodeProps.children}</Heading>,
  h2: (nodeProps) => <Heading level='2'>{nodeProps.children}</Heading>,
  h3: (nodeProps) => <Heading level='3'>{nodeProps.children}</Heading>,
  h4: (nodeProps) => <Heading level='4'>{nodeProps.children}</Heading>,
  h5: (nodeProps) => <Heading level='5'>{nodeProps.children}</Heading>,
  h6: (nodeProps) => <Heading level='6'>{nodeProps.children}</Heading>,
  img: (nodeProps) => this.renderMedia(nodeProps),
  p: Paragraph,
  span: Text,
  table: Table,
  tfoot: TableFooter,
  thead: TableHeader,
  tbody: TableBody,
  td: TableCell,
  tr: TableRow
}
```

Note: The customization for the `img` tag supports the sizing syntax as well as HTML 5 video and audio. If you override this, you risk breaking this functionality. Overriding these components is available for customization of styles.

- projectSlug - _(string)_ The project resource's slug. Set this if within project context so that subject mentions can work, i.e. `^S1234`
- restrictedUserNames - _(array)_ This is an array of the pingable Talk roles that don't have profile pages, so they shouldn't be links. Defaults to `['admins', 'moderators', 'researchers', 'scientists', 'team']`
- settings - _(object)_ Available to pass in any remark/unified.js settings into the remark parser. This get merged into the default settings which are `{ footnotes: true }`

## Current plugins

- remark-react - Converts markdown to React
- remark-emoji - Converts emoji names to unicode, i.e. `:smile:` to its unicode
- remark-sub-super - Adds support for the subscript and superscript markup
- remark-external-links - Adds nofollow, noreferrer, noopener and `target="_blank"` to all absolute url links
- remark-toc - Adds table of contents markup support
- Custom plugin in `./lib/ping` - Fork of `remark-ping`. Parses strings like `@srallen`, `#tigers`, or `^S1234` to links to specific Zooniverse pages. Forked because original plugin was hardcoded only for at-mention strings using `@`