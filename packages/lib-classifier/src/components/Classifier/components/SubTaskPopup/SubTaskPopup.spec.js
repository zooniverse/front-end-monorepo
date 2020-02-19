import { types } from 'mobx-state-tree'
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { SubTaskPopup } from './SubTaskPopup'
import asyncStates from '@zooniverse/async-states'
import SingleChoiceTask from '@plugins/tasks/SingleChoiceTask'
import ClassificationStore from '@store/ClassificationStore'

describe('SubTaskPopup', function () {
  const singleChoiceTask = SingleChoiceTask.TaskModel.create({
    answers: [{ label: 'yes' }, { label: 'no' }],
    question: 'Is there a cat?',
    required: true,
    taskKey: 'init',
    type: 'single'
  })
  const tasks = [ singleChoiceTask ]
  const step = {
    isComplete: true,
    stepKey: 'S1',
    taskKeys: ['init'],
    tasks: {
      init: tasks[0]
    }
  }
  const classifications = ClassificationStore.create()
  const store = types.model('MockStore', {
    classifications: ClassificationStore,
    task: SingleChoiceTask.TaskModel
  })
  .create({
    classifications,
    task: singleChoiceTask
  })
  const mockSubject = {
    id: 'subject',
    metadata: {}
  }
  const mockWorkflow = {
    id: 'workflow',
    version: '1.0'
  }
  const mockProject = {
    id: 'project'
  }
  classifications.createClassification(mockSubject, mockWorkflow, mockProject)
  const annotation = classifications.addAnnotation(singleChoiceTask)
  const classification = classifications.active
  const { addAnnotation } = classifications
  singleChoiceTask.setAnnotation(annotation)

  it('should render without crashing', function () {
    const wrapper = shallow(<SubTaskPopup />)
    expect(wrapper).to.be.ok()
  })
})
