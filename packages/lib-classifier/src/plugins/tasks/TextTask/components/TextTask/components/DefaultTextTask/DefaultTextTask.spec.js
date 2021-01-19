import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { Text, TextArea } from 'grommet'
import { default as Task } from '@plugins/tasks/TextTask'
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
        updateAnnotation={updateAnnotationSpy}
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