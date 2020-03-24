import { shallow } from 'enzyme'
import React from 'react'

import SGVGridCell from './SGVGridCell'

let wrapper

const exampleImage = {
  src: 'https://foo.bar/example.png',
  naturalHeight: 400,
  naturalWidth: 300,
}

describe('Component > SubjectGroupViewer > SGVGridCell', function () {
  beforeEach(function () {
    wrapper = shallow(
      <SGVGridCell
        images={exampleImage}
        index={0}
        dragMove={() => {}}
        cellWidth={200}
        cellHeight={200}
        cellStyle={{
          stroke: '#fff',
          strokeWidth: '4',
          fill: '#000',
        }}
        gridRows={2}
        gridColumns={2}
        panX={0}
        panY={0}
        zoom={1}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
  
})
