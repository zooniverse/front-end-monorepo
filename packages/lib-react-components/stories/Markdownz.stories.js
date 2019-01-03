import React from 'react'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'

import { storiesOf } from '@storybook/react'

import { Markdownz } from '../src'

const content = `
**bold**

_italicized_

[link](https://www.zooniverse.org/)

[tabbed link](+tab+https://www.zooniverse.org/)

![imagealttext](https://via.placeholder.com/350x350)

^super\ script^

~sub\ script~

- item one\n
- item two\n
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

---
`

storiesOf('Markdownz', module)
  // .addParameters({
  //   info: spacedTextDocs
  // })
  .add('Light theme (default)', () =>
    <Grommet theme={zooTheme}>
      <Markdownz>{content}</Markdownz>
    </Grommet>
  )