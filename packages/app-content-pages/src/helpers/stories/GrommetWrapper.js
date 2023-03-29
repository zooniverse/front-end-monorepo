import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { bool } from 'prop-types'

const background = {
  dark: 'dark-1',
  light: 'light-1'
}

const GrommetWrapper = ({ children, dark = false }) => {
  const themeMode = dark ? 'dark' : 'light'

  return (
    <Grommet background={background} theme={zooTheme} themeMode={themeMode}>
      {children}
    </Grommet>
  )
}

export default GrommetWrapper

GrommetWrapper.propTypes = {
  /** Toggles the light and dark theme mode */
  dark: bool
}
