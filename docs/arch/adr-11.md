# ADR 11: Rewriting Markdownz to use remark

Created: December 19, 2018

## Context

Markdown can help prevent XSS type security vulnerabilities and is generally safer to use than HTML for user submitted content on the web. Panoptes-Front-End uses markdown through out the entire application. Currently we support an in-house markdown renderer, [markdownz](https://github.com/zooniverse/markdownz), that uses  [markdown-it](https://github.com/markdown-it/markdown-it). The library markdown-it is mature and has several plug-ins available for it that we've added to markdownz as well as some of our own customizations.

Markdown, however, isn't totally free from being exploitable, nor is React. Markdownz relies on a React method, `dangerouslySetInnerHTML` that potentially open us to vulnerabilities (see this line: https://github.com/zooniverse/markdownz/blob/master/src/components/markdown.jsx#L99). 

Now that we've adopted Grommet as general React component library, Grommet also provides a React [markdown](https://v2.grommet.io/markdown) renderer ([code](https://github.com/grommet/grommet/blob/master/src/js/components/Markdown/Markdown.js)). Grommet's markdown component uses [markdown-to-jsx](https://github.com/probablyup/markdown-to-jsx) which instead converts markdown to React components to use instead of relying on `dangerouslySetInnerHTML`. However, after extensive evaluation, `markdown-to-jsx` does not have the plugin eco-system that we need and so we would need to rewrite a lot of customizations to get to basic parity with what we already support. This defeats the purpose of reducing the maintenance of our own code for common markdown support.

## Decision

We will make a new `Markdownz` React component that will be a part of the Zooniverse React component library. This new component will be built using [`remark`](https://github.com/remarkjs/remark). Remark is a popular markdown rendering library with a good plugin eco-system. It is supported by Zeit, which also supports Next.js, the server-side rendering library we have decided upon. 

Here is how markdown-it's plugins will map to remark's plugins:

|markdown-it plugin/custom plugin|remark plugin/custom plugin|notes|
|--------------------------------|---------------------------|-----|
|markdown-it-emoji|remark-emoji|remark-emoji does not support emoticons like `:-)` but does gemojis like `:smile:`|
|markdown-it-sub|remark-sub-super||
|markdown-it-sup|remark-sub-super||
|markdown-it-footnote|built in|Remark supports this and can be enabled by passing `footnote: true` into its settings object|
|markdown-it-imsize|N/A|This has been replaced by leveraging the component customization that remark-react supports. For `img`, we have defined a custom function that will set the `width` and `height` props on the Image component if the sizing syntax is defined in the alt tag of the markup. This is in contrast to the sizing syntax originally being defined in the src markup. We do not want to modify the sanitization remark-react does on source urls, so instead we have moved support of syntax to the alt tag area of the markup|
|markdown-it-video|deprecating|We are deprecating this because we don't want project owners embedding youtube videos with ads|
|markdown-it-table-of-contents|remark-toc|This works instead by looking for a heading that has case insensitive `table of contents`, `toc`, or `table-of-contents`|
|markdown-it-anchor|N/A|Remark has basic anchor support.|
|twemoji|N/A|Do we really need to use images of Twitter's emojis? Unicode support for emojis is fairly ubitiquous now.|
|markdown-it-html5-embed|N/A|This has been replaced by leveraging the component customization that remark-react supports. For `img`, we define a custom function that returns a video instead of an image of the src is a video mime-type|
|replaceSymbols|our own fork of remark-ping|remark-ping supports our needs for doing at-mentions of users, but it is forked to also support talk hashtags and the subject mentions using `^S`|
|relNofollow|remark-external-links|This plugin adds nofollow to absolute urls|
|markdownNewTab|remark-external-links|remark-external-links plugin adds `target='_blank'` and nofollow, noopener, noreferrer to all absolute urls. `+tab+` in front of the url will no longer work because of the sanitization that remark-react does. It may not be a good idea to modify how the sanitization works to allow this and instead just update our users on how this works instead.|

`remark-react` is added to parse the markdown to jsx which is inherantly safer than using `dangerouslySetInnerHTML` and allows customizing which react components get used for html elements like `markdown-to-jsx`.

## Status

Proposed

## Consequences

- Remark's plugin eco-system has more plugins that suit our needs and reduces some of the code we have to maintain.
- We still need to maintain a fork of `remark-ping` for our customizations for Talk
- Users will have to learn how to do table of contents, links that open in new tabs, and image sizing differently, but we can post an update with new help to aid when we deploy this. 
- We'll use `remark-react` which enables us to map Grommet components to HTML tags. Then the rendered markdown will adopt the theme styles we've set globally in the `Grommet` component.
- The existing Markdownz library will have a deprecation noticed added to its read me. The new Markdownz component will be part of the @zooniverse/react-components library. Note: As of the writing of this ADR, only the renderer has been migrated and the editor and help docs still need to be migrated. 

