import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import Loader from './Loader'
import readme from './README.md'

export default {
  title: 'Project App / Shared / Loader',
  component: Loader,
  args: {
    background: '',
    color: '',
    dark: false,
    height: 'xxsmall',
    margin: '',
    pad: '',
    width: 'xxsmall'
  },
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
    viewport: {
      defaultViewport: 'responsive'
    }
  }
}

export function Default ({ background, color, dark, height, margin, pad, width }) {
  const theme = { ...zooTheme, dark }

  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={theme}
      themeMode={(theme.dark) ? 'dark' : 'light'}
    >
      <Loader
        background={background}
        color={color}
        height={height}
        margin={margin}
        pad={pad}
        width={width}
      />
    </Grommet>
  )
}