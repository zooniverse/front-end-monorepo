import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import mockStore from '@test/mockStore'

import SeparateFrame from './SeparateFrame'

export default {
  title: 'Subject Viewers / SeparateFrame',
  component: SeparateFrame,
  args: {
    dark: false,
    frameUrl:
      'https://panoptes-uploads.zooniverse.org/subject_location/1e54b552-4608-4701-9db9-b8342b81278a.jpeg',
    limitSubjectHeight: false
  }
}

const store = mockStore()
store.subjectViewer.setSeparateFramesView(true)

const background = {
  dark: 'dark-1',
  light: 'light-1'
}

export const Default = ({ dark, frameUrl, limitSubjectHeight }) => {
  const themeMode = dark ? 'dark' : 'light'
  return (
    <Grommet background={background} theme={zooTheme} themeMode={themeMode}>
      <Provider classifierStore={store}>
        <SeparateFrame
          frameUrl={frameUrl}
          limitSubjectHeight={limitSubjectHeight}
        />
      </Provider>
    </Grommet>
  )
}
