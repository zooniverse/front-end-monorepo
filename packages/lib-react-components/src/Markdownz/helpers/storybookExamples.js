export const examples = [
  {
    label: 'table',
    content: `
|fruit|colour|
|-----|:------:|
|apple|green|
|banana|yellow|
|strawberry|red|
`
  },
  {
    label: 'emoji',
    content: ':smile: :-)'
  },
  {
    label: 'bold',
    content: '**bold**'
  },
  {
    label: 'italicized',
    content: '_italicized_'
  },
  {
    label: 'anchor',
    content: '[link](https://www.zooniverse.org/)'
  },
  {
    label: 'relative link',
    content: '[relative-link](/relative)'
  },
  {
    label: 'image',
    content: '![imagealttext](https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg)'
  },
  {
    label: 'image resized like TESS',
    content: '![like TESS](https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg =100x)'
  },
  {
    label: 'image resized in alt text',
    content: '![imagealttext =100x100](https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg)'
  },
  {
    label: 'image resized in url',
    content: '![imagealttext](https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg =100x100)'
  },
  {
    label: 'image with equals sign in the alt text',
    content: '![A blackboard showing the expression 2x2=4](https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg =100x100)'
  },
  {
    label: 'video (using image syntax)',
    content: '![alt](https://static.zooniverse.org/fem-assets/home-video.mp4)'
  },
  {
    label: 'audio (using image syntax)',
    content: '![alt](https://panoptes-uploads.zooniverse.org/production/subject_location/1c93591f-5d7e-4129-a6da-a65419b88048.mpga)'
  },
  {
    label: 'JSON data subject',
    content: '![alt](https://panoptes-uploads.zooniverse.org/subject_location/74fddc9b-790d-47c6-9eac-110c64022ea8.json =300x)'
  },
  {
    label: 'superscript',
    content: 'super^script^'
  },
  {
    label: 'subscript',
    content: 'sub~script~'
  },
  {
    label: 'typed email address',
    content: 'contact@zooniverse.org'
  },
  {
    label: 'Zooniverse user mention',
    content: '@srallen @team'
  },
  {
    label: 'Zooniverse Talk Tag mention',
    content: '#tiger'
  },
  {
    label: 'Zooniverse Subject mention (only works in project context)',
    content: '^S1234'
  },
  {
    label: 'Link inside a link',
    content: '[foo @username bar](http://example.com)'
  },
  {
    label: 'blockquote',
    content: '>blockquote'
  },
  {
    label: 'unordered list',
    content: `
- item one
- item two
- item three
`
  },
  {
    label: 'ordered list',
    content: `
1. item one
1. item two
1. item three
`
  },
  {
    label: 'headings',
    content: `
# header 1

## header 2

### header 3

#### header 4

##### header 5

###### header 6
`
  },
  {
    label: 'table of contents',
    content: `
[[toc]]

## News

## Links
`
  },
  {
    label: 'footnotes',
    content: `
Here is a footnote reference,[^1] and another.[^longnote]

[^1]: Here is the footnote.

[^longnote]: Here's one with multiple blocks.

    Another note.
`
  }
]
