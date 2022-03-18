import React from 'react'
import { shallow } from 'enzyme'
import { TextArea } from 'grommet'
import { Markdownz } from '@zooniverse/react-components'
import { default as Task } from '@plugins/tasks/text'
import DefaultTextTask from './DefaultTextTask'

describe('TextTask > Components > DefaultTextTask', function () {
  let wrapper
  const task = Task.TaskModel.create({
    instruction: 'Type something here',
    taskKey: 'T0',
    text_tags: ['insertion', 'deletion'],
    type: 'text'
  })
  const annotation = task.defaultAnnotation()

  before(function () {
    wrapper = shallow(
      <DefaultTextTask
        task={task}
        value={annotation.value}
      />
    )
  })

  it('should have a labelled textarea', function () {
    const label = wrapper.find('label')
    expect(label.find(Markdownz).prop('children')).to.equal(task.instruction)
    const textarea = label.find(TextArea)
    expect(textarea.prop('value')).to.equal(annotation.value)
  })
})