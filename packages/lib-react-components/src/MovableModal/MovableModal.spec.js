import { shallow } from 'enzyme'
import React from 'react'

import { MovableModal } from './Modal'

const title = 'Modal Heading'

const content = (
  <div>
    Leo mollis dictum id dis maecenas consectetur metus elementum vivamus nisl, suscipit tristique lectus nulla mus etiam nisi facilisis magnis, scelerisque ligula montes luctus cursus nibh vulputate parturient risus.
  </div>
)

describe('MovableModal', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <MovableModal title={title} closeFn={() => { }}>
        {content}
      </MovableModal>
    )
    expect(wrapper).to.be.ok()
  })
})