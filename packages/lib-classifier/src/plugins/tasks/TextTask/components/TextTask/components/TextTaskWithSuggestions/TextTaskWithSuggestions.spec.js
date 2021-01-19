import React from 'react'
import { shallow } from 'enzyme'
import { Text, TextInput } from 'grommet'
import { default as Task } from '@plugins/tasks/TextTask'
import TextTaskWithSuggestions from './TextTaskWithSuggestions'

describe('TextTask > Components > TextTaskWithSuggestions', function () {
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
      <TextTaskWithSuggestions
        suggestions={['one', 'two', 'three']}
        task={task}
        value={annotation.value}
        updateAnnotation={updateAnnotationSpy}
      />
    )
  })

  it('should have a labelled TextInput', function () {
    const label = wrapper.find('label')
    expect(label.find(Text).prop('children')).to.equal(task.instruction)
    const textInput = label.find(TextInput)
    expect(textInput.prop('value')).to.equal(annotation.value)
  })
})