import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'

import ContentBox from './ContentBox'

const CONTENT = <div>A natoque elementum venenatis tempus nec vel placerat vehicula vestibulum platea, posuere eget quam donec magna sodales euismod parturient fermentum. Gravida suspendisse dictum consectetur nec convallis ridiculus nisi, integer proin condimentum urna in vestibulum adipiscing, lectus eros tempus metus primis fermentum. Maecenas torquent posuere sit lorem vehicula conubia habitant, vel est placerat semper hendrerit neque porta, parturient mi massa metus integer quam.</div>
const LINK_LABEL = 'A link'
const LINK_URL = '#'
const TITLE = 'Here is a title'

storiesOf('Project App / Shared / ContentBox', module)
  .add('plain', () => (
    <Grommet theme={zooTheme}>
      <ContentBox
        children={CONTENT}
      />
    </Grommet>
  ))
  .add('content with title', () => (
    <Grommet theme={zooTheme}>
      <ContentBox
        children={CONTENT}
        title={TITLE}
      />
    </Grommet>
  ))
  .add('content with title and a link', () => (
    <Grommet theme={zooTheme}>
      <ContentBox
        children={CONTENT}
        linkLabel={LINK_LABEL}
        linkUrl={LINK_URL}
        title={TITLE}
      />
    </Grommet>
  ))
