import React from 'react'
import { shallow, mount } from 'enzyme'
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
    title: 'Favourite colour',
  }],
  required: false,
  taskKey: 'T1',
  type: 'dropdown'
}

describe('DropdownTask', function () {
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

    it('should pass the selected annotation to the Select sub-element', function () {
      const ddSelectAnnotationValue = wrapper.find(DdSelect).first().prop('annotationValue') || {}
      expect(ddSelectAnnotationValue.value).to.equal('hashed-value-R')
      expect(ddSelectAnnotationValue.option).to.equal(true)
    })
  })
})
