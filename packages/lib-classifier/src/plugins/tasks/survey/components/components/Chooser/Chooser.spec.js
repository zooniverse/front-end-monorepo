import React from 'react'
import { render, screen } from '@testing-library/react'

import Chooser from './Chooser'

import SurveyTask from '@plugins/tasks/survey'
import { task } from '@plugins/tasks/survey/mock-data'

const taskWithoutCharacteristics = Object.assign({}, task, { characteristics: {} })

describe('Component > Chooser', function () {
  describe('with a survey task with no characteristics', function () {
    const mockTaskWithoutCharacteristics = SurveyTask.TaskModel.create(taskWithoutCharacteristics)

    it('should render a Choices component', function () {
      render(
        <Chooser
          task={mockTaskWithoutCharacteristics}
        />
      )
      expect(screen.getByText('Aardvark')).to.be.ok() // first choice per mock-data survey task
      expect(screen.getByText('Nothing here')).to.be.ok() // last choice per mock-data survey task
    })

    it('should not render a FilterStatus component', function () {
      render(
        <Chooser
          task={mockTaskWithoutCharacteristics}
        />
      )
      expect(screen.queryByText('SurveyTask.CharacteristicsFilter.filter')).to.be.null()
    })

    it('should not render a ClearFilters component', function () {
      render(
        <Chooser
          task={mockTaskWithoutCharacteristics}
        />
      )
      expect(screen.queryByText('SurveyTask.CharacteristicsFilter.clearFilters')).to.be.null()
    })
  })

  describe('with a survey task with characteristics', function () {
    const mockTask = SurveyTask.TaskModel.create(task)

    it('should render a Choices component', function () {
      render(
        <Chooser
          task={mockTask}
        />
      )
      expect(screen.getByText('Aardvark')).to.be.ok() // first choice per mock-data survey task
      expect(screen.getByText('Nothing here')).to.be.ok() // last choice per mock-data survey task
    })

    it('should render a FilterStatus component', function () {
      render(
        <Chooser
          task={mockTask}
        />
      )
      expect(screen.getByText('SurveyTask.CharacteristicsFilter.filter')).to.be.ok()
    })

    it('should render a ClearFilters component', function () {
      render(
        <Chooser
          task={mockTask}
        />
      )
      expect(screen.getByText('SurveyTask.CharacteristicsFilter.clearFilters')).to.be.ok()
    })
  })
})
