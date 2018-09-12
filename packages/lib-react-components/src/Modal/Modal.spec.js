import { shallow, render } from 'enzyme'
import React from 'react'

import { Modal } from './Modal'

const title = 'Modal Heading'

const content = (
  <div>
    Leo mollis dictum id dis maecenas consectetur metus elementum vivamus nisl, suscipit tristique lectus nulla mus etiam nisi facilisis magnis, scelerisque ligula montes luctus cursus nibh vulputate parturient risus.
  </div>
)

describe('Modal', function () {
  it('should render without crashing', function () {
    shallow(
      <Modal title={title} closeFn={() => {}}>
        {content}
      </Modal>
    )
  })
})
