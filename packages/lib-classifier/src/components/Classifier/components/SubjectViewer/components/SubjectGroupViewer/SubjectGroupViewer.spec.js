import { shallow } from 'enzyme'
import React from 'react'

import SubjectGroupViewer from './SubjectGroupViewer'
import InteractionLayer from '../InteractionLayer'

let wrapper

const exampleImages = [
  {
    src: 'https://foo.bar/example.png',
    naturalHeight: 400,
    naturalWidth: 300,
  },
  {
    src: 'https://foo.bar/example.png',
    naturalHeight: 400,
    naturalWidth: 300,
  },
  {
    src: 'https://foo.bar/example.png',
    naturalHeight: 400,
    naturalWidth: 300,
  },
  {
    src: 'https://foo.bar/example.png',
    naturalHeight: 400,
    naturalWidth: 300,
  },
]

describe('Component > SubjectGroupViewer', function () {
  beforeEach(function () {
    wrapper = shallow(
      <SubjectGroupViewer
        images={exampleImages}
        dragMove={() => {}}
        onKeyDown={() => {}}
        cellWidth={800}
        cellHeight={600}
        cellStyle={{
          stroke: '#fff',
          strokeWidth: '4',
          fill: '#000',
        }}
        gridRows={2}
        gridColumns={2}
        width={1600}
        height={1200}
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
