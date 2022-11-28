import { expect } from 'chai'
import React from 'react'
import { render, screen } from '@testing-library/react'

import { task } from '@plugins/tasks/survey/mock-data'
import SurveyTask from '@plugins/tasks/survey'
import Choice from './Choice'

const mockTask = SurveyTask.TaskModel.create(task)

describe('Component > Choice', function () {
  describe('with choice with images, confusions, and questions', function () {
    // choice 'KD' (Kudu) includes images, confusions, and questions

    it('should show Carousel', function () {
      render(
        <Choice
          choiceId='KD'
          task={mockTask}
        />
      )
      expect(screen.getByTestId('choice-images')).to.be.ok()
    })

    it('should show ConfusedWith', function () {
      render(
        <Choice
          choiceId='KD'
          task={mockTask}
        />
      )
      expect(screen.getByText('SurveyTask.ConfusedWith.confused')).to.be.ok()
    })

    it('should show Questions', function () {
      render(
        <Choice
          choiceId='HMN'
          task={mockTask}
        />
      )
      expect(screen.getByText('Are there any young present?')).to.be.ok()
    })
  })

  describe('with choice without images, with confusions', function () {
    // choice 'NTHNGHR' (Nothing here) excludes images, includes confusions

    it('should not render Carousel', function () {
      render(
        <Choice
          choiceId='NTHNGHR'
          task={mockTask}
        />
      )
      expect(screen.queryByTestId('choice-images')).to.be.null()
    })
  })

  describe('with choice without images or confusions, with questions', function () {
    // choice 'HMN' (Human) excludes images and confusions, includes questions

    it('should not render ConfusedWith', function () {
      render(
        <Choice
          choiceId='HMN'
          task={mockTask}
        />
      )
      expect(screen.queryByText('Sometimes confused with')).to.be.null()
    })
  })

  describe('with choice without more than 1 image, confusions, or questions', function () {
    // choice 'FR' (Fire) has 1 image, excludes confusions and questions

    it('should not render Questions', function () {
      render(
        <Choice
          choiceId='FR'
          task={mockTask}
        />
      )
      expect(screen.queryAllByRole('radio', { hidden: true })).to.have.lengthOf(0)
      expect(screen.queryAllByRole('checkbox', { hidden: true })).to.have.lengthOf(0)
    })
  })
})
