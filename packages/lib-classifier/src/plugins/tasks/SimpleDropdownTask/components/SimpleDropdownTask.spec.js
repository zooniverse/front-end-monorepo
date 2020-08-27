import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import SimpleDropdownTask from './SimpleDropdownTask'
import DdSelect from './DdSelect'
import { default as Task } from '@plugins/tasks/SimpleDropdownTask'

const simpleDropdownTask = {
  instruction: 'Choose your favourite colour',
  allowCreate: false,
  options: [
    'Red',
    'Blue',
    'Yellow',
    'Green',
    'White',
    'Black',
  ],
  required: false,
  taskKey: 'T1',
  type: 'dropdown-simple'
}

describe('SimpleDropdownTask', function () {
  const task = Task.TaskModel.create(simpleDropdownTask)
  const annotation = task.defaultAnnotation

  describe('when it renders', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<SimpleDropdownTask annotation={annotation} task={task} />)
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should have a question/some instructions', function () {
      expect(wrapper.contains(task.instruction)).to.be.true()
    })

    it('should render a single <select> element', function () {
      expect(wrapper.find(DdSelect)).to.have.lengthOf(1)
    })
  })

  describe('with an annotation', function () {
    let wrapper

    before(function () {
      annotation.update({
        value: 'hashed-value-R',
        option: true,
      })
      wrapper = shallow(
        <SimpleDropdownTask
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
