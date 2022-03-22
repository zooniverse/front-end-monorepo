import { shallow } from 'enzyme'
import React from 'react'
import { Markdownz } from '@zooniverse/react-components'

import TextFromSubjectTask from './TextFromSubjectTask'
import { textFromSubject as Task } from '@plugins/tasks'

describe('TextFromSubjectTask', function () {
  let wrapper

  const task = Task.TaskModel.create({
    instruction: 'Correct the text',
    taskKey: 'T0',
    type: 'textFromSubject'
  })
  const annotation = task.defaultAnnotation()
  const value = annotation.value

  describe('when it renders', function () {
    before(function () {
      wrapper = shallow(
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
  })
})
