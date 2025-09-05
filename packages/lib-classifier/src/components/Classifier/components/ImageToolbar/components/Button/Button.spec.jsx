import { render } from '@testing-library/react'
import { Provider } from 'mobx-react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

import Button from './Button'

describe('Component > ImageToolbar > Button', function () {
  const mockStore = {
    subjectViewer: { viewerWidth: 'default' }
  }

  it('should have a label', function () {
    const { getByLabelText } = render(
      <Grommet theme={zooTheme}>
        <Provider classifierStore={mockStore}>
          <Button a11yTitle='Annotate' />
        </Provider>
      </Grommet>
    )
    const button = getByLabelText('Annotate')
    expect(button).to.exist
  })
})
