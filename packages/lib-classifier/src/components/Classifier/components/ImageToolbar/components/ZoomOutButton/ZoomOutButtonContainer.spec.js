import zooTheme from '@zooniverse/grommet-theme'
import { mount } from 'enzyme'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'

import mockStore from '@test/mockStore'
import ZoomOutButtonContainer from './ZoomOutButtonContainer'

describe('Component > ZoomOutButtonContainer', function () {
  it('should render without crashing', function () {
    const wrapper = mount(
      <Grommet theme={zooTheme}>
        <Provider classifierStore={mockStore()}>
          <ZoomOutButtonContainer />
        </Provider>
      </Grommet>
    )
    expect(wrapper).to.be.ok()
  })
})
