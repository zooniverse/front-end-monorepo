import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import SimpleDropdownTask from './SimpleDropdownTask'
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

describe.only('SimpleDropdownTask', function () {
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

    it('should render a single Grommet Select element', function () {
      expect(wrapper.find('Select')).to.have.lengthOf(1)
    })
    
    it('should have no initial value', function () {
      const grommetSelect = wrapper.find('Select')
      expect(grommetSelect.props()['value']).to.equal(undefined)
    })
    
    it('should render the correct number of options', function () {
      const grommetSelect = wrapper.find('Select')
      const renderedOptions = grommetSelect.props()['options'] || []
      expect(renderedOptions).to.have.length(6)
    })
  })

  describe('with an annotation', function () {
    let wrapper

    before(function () {
      annotation.update({
        selection: 2,  // Corresponds to "Yellow"
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
      const grommetSelect = wrapper.find('Select').first()
      expect(grommetSelect.prop('value')['text']).to.equal('Yellow')
    })
  })
})
