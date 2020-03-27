import React from 'react'
import { mount, shallow } from 'enzyme'
import { Text, TextArea } from 'grommet'
import { default as Task } from '@plugins/tasks/TextTask'

describe('TextTask > Components > DefaultTextTask', function () {
  const task = Task.TaskModel.create({
    instruction: 'Type something here',
    taskKey: 'T0',
    text_tags: ['insertion', 'deletion'],
    type: 'text'
  })
  const annotation = task.defaultAnnotation

  before(function () {
    wrapper = shallow(
      <TextTask
        task={task}
      />
    )
  })

  it('should have a labelled textarea', function () {
    const label = wrapper.find('label')
    expect(label.find(Text).prop('children')).to.equal(task.instruction)
    const textarea = label.find(TextArea)
    expect(textarea.prop('value')).to.equal(annotation.value)
  })
})