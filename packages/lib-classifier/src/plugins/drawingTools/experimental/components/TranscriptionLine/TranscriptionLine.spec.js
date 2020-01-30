import React from 'react'
import { shallow } from 'enzyme'
import TranscriptionLine from './TranscriptionLine'
import { TranscriptionLine as TranscriptionLineMark } from '../../models/marks'
import { DragHandle } from '@plugins/drawingTools/components'

describe('Components > Drawing marks > Transcription line', function () {
  let mark
  beforeEach(function () {
    mark = TranscriptionLineMark.create({
      id: 'line1',
      toolType: 'transcriptionLine',
      x1: 100,
      y1: 200,
      x2: 300,
      y2: 400
    })
  })

  it('should render without crashing', function () {
    const wrapper = shallow(<TranscriptionLine
      mark={mark}
    />)
    expect(wrapper).to.be.ok()
  })

  describe('when active', function () {
    it('should not be closed at first', function () {
      const wrapper = shallow(<TranscriptionLine
        active
        mark={mark}
      />)
      expect(mark.finished).to.be.false()
    })

    it('should have a draggable start point', function () {
      const wrapper = shallow(<TranscriptionLine
        active
        mark={mark}
      />)
      expect(wrapper.find(DragHandle).find('[x=100]')).to.have.lengthOf(1)
    })

    it('should have a transparent start point', function () {
      const wrapper = shallow(<TranscriptionLine
        active
        mark={mark}
      />)
      expect(wrapper.find(DragHandle).find('[x=100]').prop('fill')).to.equal('transparent')
    })

    it('should move the start point on drag move', function () {
      const wrapper = shallow(<TranscriptionLine
        active
        mark={mark}
      />)
      const dragMove = wrapper.find(DragHandle).find('[x=100]').prop('dragMove')
      expect(mark.x1).to.equal(100)
      expect(mark.y1).to.equal(200)
      dragMove({}, { x: 10, y: 20 })
      expect(mark.x1).to.equal(110)
      expect(mark.y1).to.equal(220)
    })

    it('should have a draggable end point', function () {
      const wrapper = shallow(<TranscriptionLine
        active
        mark={mark}
      />)
      expect(wrapper.find(DragHandle).find('[x=300]')).to.have.lengthOf(1)
    })

    it('should move the end point on drag move', function () {
      const wrapper = shallow(<TranscriptionLine
        active
        mark={mark}
      />)
      const dragMove = wrapper.find(DragHandle).find('[x=300]').prop('dragMove')
      expect(mark.x2).to.equal(300)
      expect(mark.y2).to.equal(400)
      dragMove({}, { x: 10, y: 20 })
      expect(mark.x2).to.equal(310)
      expect(mark.y2).to.equal(420)
    })

    it('should close when the end point is clicked', function () {
      const wrapper = shallow(<TranscriptionLine
        active
        mark={mark}
      />)
      wrapper.find('circle[cx=300]').simulate('pointerdown')
      expect(mark.finished).to.be.true()
    })
  })
})
