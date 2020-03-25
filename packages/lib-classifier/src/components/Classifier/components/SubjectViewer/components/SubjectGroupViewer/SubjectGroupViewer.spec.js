import { shallow } from 'enzyme'
import React from 'react'

import SubjectGroupViewer from './SubjectGroupViewer'
import SGVGridCell from './components/SGVGridCell'

let wrapper

describe('Component > SubjectGroupViewer', function () {
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
  
  it('should render 4 grid cells', function () {
    expect(wrapper.find(SGVGridCell)).to.have.lengthOf(4)
  })
  
  it('should have a viewBox proportional to width and height', function () {
    const viewBox = wrapper.find('svg').prop('viewBox')
    expect(viewBox).to.have.string('0 0 1600 1200')
  })
})
