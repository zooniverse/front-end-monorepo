import { Key } from 'grommet-icons'
import { Box, Heading, Paragraph } from 'grommet'

import Tabs from './Tabs'
import Tab from '../Tab'
import readme from './README.md'

export default {
  title: 'Components / Tabs',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
}

const ComplexTitle = () => (
  <span>
    <Key size='small' a11yTitle='Restricted Section:' />
    &nbsp;
    <span>Members Only</span>
  </span>
)

export const Default = () => (
  <Tabs>
    <Tab title='one'>
      <Box border={{ color: 'light-3' }} pad='small'>
        <Heading level={2}>Tab Content</Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor
          nec orci vitae vestibulum. Quisque blandit semper nisl, mollis aliquet
          nunc bibendum vel. Etiam sapien felis, luctus sit amet blandit eu,
          dapibus in mi. Vestibulum mattis malesuada mi, in viverra metus
          hendrerit eu. Phasellus vehicula consectetur scelerisque.
        </Paragraph>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor
          nec orci vitae vestibulum. Quisque blandit semper nisl, mollis aliquet
          nunc bibendum vel. Etiam sapien felis, luctus sit amet blandit eu,
          dapibus in mi. Vestibulum mattis malesuada mi, in viverra metus
          hendrerit eu...
        </Paragraph>
      </Box>
    </Tab>
    <Tab title='two'>Two</Tab>
    <Tab title='three'>Three</Tab>
    <Tab title={<ComplexTitle />}>Tab with complex title (tab header)</Tab>
  </Tabs>
)
