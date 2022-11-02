import { shallow } from 'enzyme'
import React from 'react'

import { default as Task } from '@plugins/tasks/survey'
import { task as mockTask } from '@plugins/tasks/survey/mock-data'
import SurveyTask from './SurveyTask'
import { SurveyTaskContainer } from './SurveyTaskContainer'

describe('SurveyTaskContainer', function () {
  let wrapper
  let task = Task.TaskModel.create(mockTask)
  let annotation = task.defaultAnnotation()

  before(function () {
    wrapper = shallow(
      <SurveyTaskContainer
        annotation={annotation}
        task={task}
      />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a SurveyTask component', function () {
    expect(wrapper.find(SurveyTask)).to.have.lengthOf(1)
  })

  it('should pass the component state and props to the SurveyTask component', function () {
    expect(wrapper.find(SurveyTask).props().answers).to.eql({})
    expect(wrapper.find(SurveyTask).props().filters).to.eql({})
    expect(wrapper.find(SurveyTask).props().selectedChoice).to.eql('')
    expect(wrapper.find(SurveyTask).props().task).to.eql(task)
  })

  describe('with updated annotation value', function () {
    const mockAnnotationValue = [
      {
        choice: 'MPL',
        answers: {
          HWMN: '3',
          WHTBHVRSDS: [
            'TNG'
          ],
          RTHRNNGPRSNT: 'N',
          DSNHRNS: 'N'
        },
        filters: {
          CLR: 'BRWN',
          LK: 'NTLPDR'
        }
      }
    ]

    it('should pass the selectedChoiceIds to the SurveyTask', function () {
      annotation.update(mockAnnotationValue)
      wrapper.setProps({ annotation })

      expect(wrapper.find(SurveyTask).props().selectedChoiceIds).to.eql([ 'MPL' ])
    })

    it.skip('should persist filters after identifying a choice', function () {})
  })
})
