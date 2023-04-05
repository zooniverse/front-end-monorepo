import { Key } from 'grommet-icons'

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
    <Tab title='one'>One</Tab>
    <Tab title='two'>Two</Tab>
    <Tab title='three'>Three</Tab>
    <Tab title={<ComplexTitle />}>Tab with complex title (tab header)</Tab>
  </Tabs>
)
