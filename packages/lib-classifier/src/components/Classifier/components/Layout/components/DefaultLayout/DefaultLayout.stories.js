import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import mockStore from '@test/mockStore'
import { SubjectFactory } from '@test/factories'

import DefaultLayout from './DefaultLayout'

export default {
  title: 'Layouts / Default',
  component: DefaultLayout,
  args: {
    dark: false
  }
}

const background = {
  dark: 'dark-1',
  light: 'light-1'
}
const mockSubject = SubjectFactory.build({
  locations: [
    {
      'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/1e54b552-4608-4701-9db9-b8342b81278a.jpeg'
    }
  ]
})

const store = mockStore({
  subject: mockSubject
})

export const Default = ({ dark }) => {
  const themeMode = dark ? 'dark' : 'light'
  return (
    <Grommet background={background} theme={zooTheme} themeMode={themeMode}>
      <Provider classifierStore={store}>
        <DefaultLayout />
      </Provider>
    </Grommet>
  )
}
