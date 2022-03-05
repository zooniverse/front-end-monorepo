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

  it('should initialize with the default state', function () {
    const mockState = {
      answers: {},
      filters: {},
      selectedChoice: ''
    }
    expect(wrapper.state()).to.eql(mockState)
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

  it('should update component state and props when there is a new task', function () {
    const mockState = {
      answers: {
        HWMN: '1',
        RTHRNNGPRSNT: 'S',
        WHTBHVRSDS: [
          'RSTNG',
          'MVNG'
        ]
      },
      filters: {
        CLR: 'BRWN',
        LK: 'NTLPDR'
      },
      selectedChoice: 'CVT'
    }

    wrapper.setState(mockState)
    expect(wrapper.props().task.taskKey).to.equal('T0')
    expect(wrapper.state()).to.eql(mockState)

    const newMockTask = Object.assign({}, mockTask, { taskKey: 'T9' })
    task = Task.TaskModel.create(newMockTask)
    annotation = task.defaultAnnotation()
    wrapper.setProps({
      annotation: annotation,
      task: task
    })

    expect(wrapper.props().task.taskKey).to.equal('T9')
    expect(wrapper.state()).to.eql({
      answers: {},
      filters: {},
      selectedChoice: ''
    })
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

    it('should persist filters state when annotation but not task is updated', function () {
      expect(wrapper.state().filters).to.eql({})

      wrapper.setState({ filters: mockAnnotationValue[0].filters })
      expect(wrapper.state().filters).to.eql(mockAnnotationValue[0].filters)

      annotation.update(mockAnnotationValue)
      wrapper.setProps({ annotation })

      expect(wrapper.state().filters).to.eql(mockAnnotationValue[0].filters)
    })
  })
})
