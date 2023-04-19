import { Provider } from 'mobx-react'
import mockStore from '@test/mockStore'

import SeparateFrame from './SeparateFrame'

export default {
  title: 'Subject Viewers / SeparateFrame',
  component: SeparateFrame,
  args: {
    frameUrl:
      'https://panoptes-uploads.zooniverse.org/subject_location/1e54b552-4608-4701-9db9-b8342b81278a.jpeg',
    limitSubjectHeight: false
  }
}

const store = mockStore()
store.subjectViewer.setSeparateFramesView(true)

export const Default = ({ frameUrl, limitSubjectHeight }) => {
  return (
    <Provider classifierStore={store}>
      <SeparateFrame
        frameUrl={frameUrl}
        limitSubjectHeight={limitSubjectHeight}
      />
    </Provider>
  )
}
