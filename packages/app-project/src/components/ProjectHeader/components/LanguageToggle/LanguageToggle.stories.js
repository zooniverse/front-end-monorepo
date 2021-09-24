import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import LanguageToggle from './LanguageToggle'

export default {
  title: 'Project App / Shared / Project Header / LanguageToggle',
  component: LanguageToggle
}

const availableLanguages = ['en', 'fr']

export const Default = () => (
  <Grommet theme={zooTheme}>
    <LanguageToggle availableLanguages={availableLanguages} />
  </Grommet>
)
