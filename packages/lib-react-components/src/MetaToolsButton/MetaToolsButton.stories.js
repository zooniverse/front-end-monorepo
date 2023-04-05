import { Add } from 'grommet-icons'

import MetaToolsButton from './'
import readme from './README.md'

export default {
  title: 'Components / MetaToolsButton',
  component: MetaToolsButton,
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
}

export const Default = () => (
  <MetaToolsButton disabled={false} icon={<Add size='small' />} text='Add' />
)

export const AsLink = () => (
  <MetaToolsButton
    disabled={false}
    href='/mypage'
    icon={<Add size='small' />}
    text='Add'
  />
)
