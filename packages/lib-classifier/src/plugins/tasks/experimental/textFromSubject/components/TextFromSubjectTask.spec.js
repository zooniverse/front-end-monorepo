import { mount } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import { Markdownz } from '@zooniverse/react-components'

import TextFromSubjectTask from './TextFromSubjectTask'
import { textFromSubject as Task } from '@plugins/tasks'

describe('TextFromSubjectTask', function () {
  let wrapper

  const task = Task.TaskModel.create({
    strings: {
      instruction: 'Correct the text'
    },
    taskKey: 'T0',
    type: 'textFromSubject'
  })
  const annotation = task.defaultAnnotation()
  annotation.update('This is a test.')
  const value = annotation.value

  describe('when it renders', function () {
    before(function () {
      wrapper = mount(
        <TextFromSubjectTask
          task={task}
          value={value}
        />
      )
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should have a labelled textarea', function () {
      const label = wrapper.find('label')
      expect(label.find(Markdownz).prop('children')).to.equal(task.instruction)
    })

    it('should have a textarea with the correct value', function () {
      const textarea = wrapper.find('textarea')
      expect(textarea.prop('value')).to.equal(value)
    })

    describe('with isChanged false', function () {
      let resetButton

      before(function () {
        wrapper.setProps({ isChanged: false })
        resetButton = wrapper.find('button')
      })

      it('should have a disabled reset button', function () {
        expect(resetButton).to.have.lengthOf(1)
        expect(resetButton.prop('disabled')).to.be.true()
      })
    })

    describe('with isChanged true', function () {
      let resetButton

      before(function () {
        wrapper.setProps({ isChanged: true })
        resetButton = wrapper.find('button')
      })

      it('should have an enabled reset button', function () {
        expect(resetButton).to.have.lengthOf(1)
        expect(resetButton.prop('disabled')).to.be.false()
      })

      it('should call resetSubject on click', function () {
        const resetToSubject = sinon.spy()
        wrapper.setProps({ resetToSubject })
        resetButton.simulate('click')
        expect(resetToSubject).to.have.been.calledOnce()
      })
    })
  })
})
