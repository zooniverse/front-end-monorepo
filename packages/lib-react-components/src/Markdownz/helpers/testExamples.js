import dedent from 'dedent'
import { Anchor, Paragraph } from 'grommet'

export const markdown = dedent`
:smile:

**bold**

_italicized_

[link](https://www.zooniverse.org/)

[relative-link](/relative)

![a placeholder](https://via.placeholder.com/350x350)

![a placeholder =100x100](https://via.placeholder.com/350x350)

![alt](https://static.zooniverse.org/www.zooniverse.org/assets/home-video.mp4)

![alt](https://panoptes-uploads.zooniverse.org/production/subject_location/1c93591f-5d7e-4129-a6da-a65419b88048.mpga)

super^script^

sub~script~

@srallen @team

#tiger

^S1234

> blockquote

- item one
- item two
- item three

1. item one
2. item two
3. item three

# header1

## header2

### header3

#### header4

##### header5

###### header6

## Table of Contents

## News

## Links

Here is a footnote reference,[^1] and another.[^longnote]

[^1]: Here is the footnote.

[^longnote]: Here's one with multiple blocks.

  Another note.
`

// Note the video and audio are first put into img tags. This is the expect jsx output before our customization runs.
// They're then switched to audio or video depending on the mimetype of the source.
export const jsx =
<>
  <Paragraph>
    😄
  </Paragraph>
  <Paragraph>
    <strong>
      bold
    </strong>
  </Paragraph>
  <Paragraph>
    <em>
      italicized
    </em>
  </Paragraph>
  <Paragraph>
    <Anchor href="https://www.zooniverse.org/" target="_blank" rel="nofollow noopener noreferrer">
      link
    </Anchor>
  </Paragraph>
  <Paragraph>
    <Anchor href="/relative">
      relative-link
    </Anchor>
  </Paragraph>
  <Paragraph>
    <img src="https://via.placeholder.com/350x350" alt="a placeholder" />
  </Paragraph>
  <Paragraph>
    <img src="https://via.placeholder.com/350x350" alt="a placeholder =100x100" />
  </Paragraph>
  <Paragraph>
    <img src="https://static.zooniverse.org/www.zooniverse.org/assets/home-video.mp4" alt="alt" />
  </Paragraph>
  <Paragraph>
    <img src="https://panoptes-uploads.zooniverse.org/production/subject_location/1c93591f-5d7e-4129-a6da-a65419b88048.mpga" alt="alt" />
  </Paragraph>
  <Paragraph>
    super
    <sup>
      script
    </sup>
  </Paragraph>
  <Paragraph>
    sub
    <sub>
      script
    </sub>
  </Paragraph>
  <Paragraph>
    <Anchor href="/users/srallen" rel="nofollow">
      @srallen
    </Anchor>
     @team
  </Paragraph>
  <Paragraph>
    <Anchor href="/talk/search?query=tiger" rel="nofollow">
      #tiger
    </Anchor>
  </Paragraph>
  <Paragraph>
    ^S1234
  </Paragraph>
  <blockquote>
    <Paragraph>
      blockquote
    </Paragraph>
  </blockquote>
  <ul>
    <li>
      item one
    </li>
    <li>
      item two
    </li>
    <li>
      item three
    </li>
  </ul>
  <ol>
    <li>
      item one
    </li>
    <li>
      item two
    </li>
    <li>
      item three
    </li>
  </ol>
  <h1 id="user-content-header1">
    header1
  </h1>
  <h2 id="user-content-header2">
    header2
  </h2>
  <h3 id="user-content-header3">
    header3
  </h3>
  <h4 id="user-content-header4">
    header4
  </h4>
  <h5 id="user-content-header5">
    header5
  </h5>
  <h6 id="user-content-header6">
    header6
  </h6>
  <h2 id="user-content-table-of-contents">
    Table of Contents
  </h2>
  <ul>
    <li>
      <Anchor href="#news">
        News
      </Anchor>
    </li>
    <li>
      <Anchor href="#links">
        Links
      </Anchor>
    </li>
  </ul>
  <h2 id="user-content-news">
    News
  </h2>
  <h2 id="user-content-links">
    Links
  </h2>
  <Paragraph>
    Here is a footnote reference,
    <sup id="user-content-fnref-1">
      <Anchor href="#fn-1">
        1
      </Anchor>
    </sup>
     and another.
    <sup id="user-content-fnref-longnote">
      <Anchor href="#fn-longnote">
        longnote
      </Anchor>
    </sup>
  </Paragraph>
  <Paragraph>
    Another note.
  </Paragraph>
  <div>
    <hr />
    <ol>
      <li id="user-content-fn-1">
        Here is the footnote.
        <Anchor href="#fnref-1">
          ↩
        </Anchor>
      </li>
      <li id="user-content-fn-longnote">
        Here&#39;s one with multiple blocks.
        <Anchor href="#fnref-longnote">
          ↩
        </Anchor>
      </li>
    </ol>
  </div>
</>
