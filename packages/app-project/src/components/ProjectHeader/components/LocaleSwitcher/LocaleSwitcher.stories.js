import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import LocaleSwitcher from './LocaleSwitcher'

export default {
  title: 'Project App / Shared / Project Header / LocaleSwitcher',
  component: LocaleSwitcher
}

const availableLocales = ['en', 'fr']

export const Default = () => (
  <Grommet theme={zooTheme}>
    <LocaleSwitcher availableLocales={availableLocales} />
  </Grommet>
)
