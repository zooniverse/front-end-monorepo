import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

const background = {
  dark: 'dark-1',
  light: 'light-1'
}

const GrommetWrapper = ({ children, dark }) => {
  const themeMode = dark ? 'dark' : 'light'

  return (
    <Grommet background={background} theme={zooTheme} themeMode={themeMode}>
      {children}
    </Grommet>
  )
}

export default GrommetWrapper
