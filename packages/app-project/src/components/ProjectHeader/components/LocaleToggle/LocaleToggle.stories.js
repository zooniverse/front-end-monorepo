import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import LocaleToggle from './LocaleToggle'

export default {
  title: 'Project App / Shared / Project Header / LanguageToggle',
  component: LocaleToggle
}

const availableLocales = ['en', 'fr']

export const Default = () => (
  <Grommet theme={zooTheme}>
    <LocaleToggle availableLocales={availableLocales} />
  </Grommet>
)
