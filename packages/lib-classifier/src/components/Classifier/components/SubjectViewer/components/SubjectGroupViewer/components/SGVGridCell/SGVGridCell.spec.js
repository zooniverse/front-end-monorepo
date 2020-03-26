import { shallow } from 'enzyme'
import React from 'react'

import SGVGridCell from './SGVGridCell'

let wrapper

const exampleImage = {
  src: 'https://foo.bar/example.png',
  naturalHeight: 400,
  naturalWidth: 300,
}

const cellWidth = 800
const cellHeight = 600
const gridRows = 3
const gridColumns = 3

describe('Component > SubjectGroupViewer > SGVGridCell', function () {
  beforeEach(function () {
    wrapper = shallow(
      <SGVGridCell
        image={exampleImage}
        index={0}
        dragMove={() => {}}
        cellWidth={cellWidth}
        cellHeight={cellHeight}
        cellStyle={{
          stroke: '#fff',
          strokeWidth: '4',
          fill: '#000',
        }}
        gridRows={gridRows}
        gridColumns={gridColumns}
        panX={0}
        panY={0}
        zoom={1}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
  
  it('should render an image', function () {
    const image = wrapper.find('draggable(image)')
    expect(image).to.have.lengthOf(1)
    expect(image.prop('xlinkHref')).to.equal('https://foo.bar/example.png')
  })
  
  describe('with a pan and zoom', function () {
    beforeEach(function () {
      wrapper.setProps({ panX: 10, panY: 50, zoom: 1.5 })
    })

    it('should be transformed', function () {
      const transform = wrapper.find('draggable(image)').prop('transform')
      expect(transform).to.have.string('scale(1.5) translate(10, 50)')
    })
  })
  
  describe('when given an index', function () {
    const x = 1
    const y = 2
    const index = x + y * gridColumns 
    
    beforeEach(function () {
      wrapper.setProps({ index: index })
    })

    it('should position the cell according to predefined cell width/height', function () {
      const transform = wrapper.first().prop('transform')
      expect(transform).to.have.string(`translate(800, 1200)`)
    })
  })
})
