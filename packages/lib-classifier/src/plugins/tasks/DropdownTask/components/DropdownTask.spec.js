import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import DropdownTask from './DropdownTask'
import DdSelect from './DdSelect'
import { default as Task } from '@plugins/tasks/DropdownTask'

const dropdownTask = {
  instruction: 'Choose your favourite things.',
  selects: [{
    allowCreate: false,
    id: 'dropdown-select-1',
    options: {
      '*': [
        {
          label: 'Red',
          value: 'hashed-value-R',
        },
        {
          label: 'Green',
          value: 'hashed-value-G',
        },
        {
          label: 'Blue',
          value: 'hashed-value-B',
        },
      ],
    },
    required: false,
    title: 'Colour',
  }],
  required: false,
  taskKey: 'T1',
  type: 'dropdown'
}

describe.only('DropdownTask', function () {
  const task = Task.TaskModel.create(dropdownTask)
  const annotation = task.defaultAnnotation

  describe('when it renders', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<DropdownTask annotation={annotation} task={task} />)
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should have a question/some instructions', function () {
      expect(wrapper.contains(task.instruction)).to.be.true()
    })

    it('(for a simple dropdown) should render a single <select> element', function () {
      expect(wrapper.find(DdSelect)).to.have.lengthOf(1)
    })
  })

  describe('with an annotation', function () {
    let wrapper

    before(function () {
      annotation.update([{
        value: 'hashed-value-R',
        option: true,
      }])
      wrapper = shallow(
        <DropdownTask
          annotation={annotation}
          task={task}
        />
      )
    })

    it('should check the selected answer', function () {
      const answer = task.answers[0]
      const input = wrapper.find({ label: answer.label })
      expect(input.prop('checked')).to.be.true()
    })
  })

  describe('onChange event handler', function () {
    let wrapper
    beforeEach(function () {
      annotation.update(null)
      wrapper = shallow(<DropdownTask annotation={annotation} task={task} />)
    })

    it('should update the annotation', function () {
      task.answers.forEach((answer, index) => {
        const node = wrapper.find({ label: answer.label })
        node.simulate('change', { target: { checked: true } })
        expect(annotation.value).to.equal(index)
      })
    })

    it('should not update the annotation if the answer is not checked', function () {
      const node = wrapper.find({ label: task.answers[1].label })
      node.simulate('change', { target: { checked: false } })
      expect(annotation.value).to.be.null()
    })
  })
})
