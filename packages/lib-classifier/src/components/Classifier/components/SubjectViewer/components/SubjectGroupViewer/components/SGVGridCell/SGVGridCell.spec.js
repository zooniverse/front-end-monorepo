import { shallow } from 'enzyme'
import { getSnapshot } from 'mobx-state-tree'
import React from 'react'

import SGVGridCell from './SGVGridCell'
import { default as Task } from '@plugins/tasks/subjectGroupComparison'

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
  let wrapper, annotation
  
  const task = Task.TaskModel.create({
    required: true,
    strings: {
      question: 'Please select the cells that look weird.',
    },
    taskKey: 'init',
    type: 'subjectGroupComparison'
  })
  
  beforeEach(function () {
    annotation = task.defaultAnnotation()
    
    wrapper = shallow(
      <SGVGridCell
        image={exampleImage}
        index={0}
        subjectId={'1000'}
      
        dragMove={() => {}}
        cellWidth={cellWidth}
        cellHeight={cellHeight}
        cellStyle={{
          stroke: '#fff',
          strokeWidth: '4',
          highlight: '#4cc',
          highlightWidth: '40',
          background: '#000',
        }}
        gridRows={gridRows}
        gridColumns={gridColumns}
        
        panX={0}
        panY={0}
        zoom={1}
             
        annotation={annotation}
        annotationMode={true}
        cellAnnotated={false}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
  
  it('should render an image', function () {
    const image = wrapper.find('Styled(draggable(image))')    
    expect(image).to.have.lengthOf(1)
    expect(image.prop('xlinkHref')).to.equal('https://foo.bar/example.png')
  })
  
  describe('with a pan and zoom', function () {
    beforeEach(function () {
      wrapper.setProps({ panX: 10, panY: 50, zoom: 1.5 })
    })

    it('should be transformed', function () {
      const transform = wrapper.find('Styled(draggable(image))').prop('transform')
      expect(transform).to.have.string('translate(225, 300) scale(1.5) translate(-225, -300) translate(10, 50)')
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
  
  describe('when clicked', function () {
    
    it('should have no reaction if not in annotation mode', function () {
      wrapper.setProps({ annotationMode: false })
      const clickableBit = wrapper.find({tabIndex: 0})
      expect(clickableBit).to.be.empty()
    })
    
    it('should add the cell to the annotations (if in annotation mode, and if cell wasn\'t added already)', function () {
      wrapper.setProps({ annotationMode: true })
      annotation.update([
        { index: 99, subject: '1099' }
      ])
      
      const clickableBit = wrapper.find({tabIndex: 0})
      clickableBit.simulate('click', { preventDefault: () => {} })
      expect(annotation.value.length).to.equal(2)
      expect(getSnapshot(annotation.value)).to.deep.equal([{ index: 99, subject: '1099' }, { index: 0, subject: '1000' }])
    })
  })
})
