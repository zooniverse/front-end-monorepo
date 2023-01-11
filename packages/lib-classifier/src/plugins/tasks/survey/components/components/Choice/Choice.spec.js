import { expect } from 'chai'
import { Grommet } from 'grommet'
import { render, screen } from '@testing-library/react'
import zooTheme from '@zooniverse/grommet-theme'

import { task } from '@plugins/tasks/survey/mock-data'
import SurveyTask from '@plugins/tasks/survey'
import Choice from './Choice'

const mockTask = SurveyTask.TaskModel.create(task)

describe('Component > Choice', function () {
  describe('with choice with images, confusions, and questions', function () {
    let carousel, confusedWith, question

    // choice 'KD' (Kudu) includes images, confusions, and questions
    before(function () {
      render(
        <Grommet
          theme={zooTheme}
          themeMode='light'
        >
          <Choice
            choiceId='KD'
            task={mockTask}
          />
        </Grommet>
      )

      carousel = screen.getByTestId('choice-images')
      confusedWith = screen.getByText('SurveyTask.ConfusedWith.confused')
      question = screen.getByText('Are there any young present?')
    })
    
    it('should show Carousel', function () {
      expect(carousel).to.be.ok()
    })
  
    it('should show ConfusedWith', function () {
      expect(confusedWith).to.be.ok()
    })
  
    it('should show Questions', function () {
      expect(question).to.be.ok()
    })
  })

  describe('with choice without images, with confusions', function () {
    // choice 'NTHNGHR' (Nothing here) excludes images, includes confusions

    it('should not render Carousel', function () {
      render(
        <Grommet
          theme={zooTheme}
          themeMode='light'
        >
          <Choice
            choiceId='NTHNGHR'
            task={mockTask}
          />
        </Grommet>
      )
      expect(screen.queryByTestId('choice-images')).to.be.null()
    })
  })

  describe('with choice without images or confusions, with questions', function () {
    // choice 'HMN' (Human) excludes images and confusions, includes questions

    it('should not render ConfusedWith', function () {
      render(
        <Grommet
          theme={zooTheme}
          themeMode='light'
        >
          <Choice
            choiceId='HMN'
            task={mockTask}
          />
        </Grommet>
      )
      expect(screen.queryByText('Sometimes confused with')).to.be.null()
    })
  })

  describe('with choice without more than 1 image, confusions, or questions', function () {
    // choice 'FR' (Fire) has 1 image, excludes confusions and questions

    it('should not render Questions', function () {
      render(
        <Grommet
          theme={zooTheme}
          themeMode='light'
        >
          <Choice
            choiceId='FR'
            task={mockTask}
          />
        </Grommet>
      )
      expect(screen.queryAllByRole('radio', { hidden: true })).to.have.lengthOf(0)
      expect(screen.queryAllByRole('checkbox', { hidden: true })).to.have.lengthOf(0)
    })
  })

  describe('with choice with required questions unanswered', function () {
    // choice 'RDVRK' (Aardvark) has 2 required questions

    it('should disable the Identify button', function () {
      render(
        <Grommet
          theme={zooTheme}
          themeMode='light'
          >
          <Choice
            choiceId='RDVRK'
            task={mockTask}
          />
        </Grommet>
      )
      expect(screen.getByTestId('choice-identify-button').disabled).to.be.true()
    })
  })

  describe('with choice with required questions answered', function () {
    // choice 'RDVRK' (Aardvark) has 2 required questions

    it('should enable the Identify button', function () {
      render(
        <Grommet
          theme={zooTheme}
          themeMode='light'
        >
          <Choice
            answers={{
              HWMN: '3',
              WHTBHVRSDS: ['TNG', 'STNDNG']
            }}
            choiceId='RDVRK'
            task={mockTask}
          />
        </Grommet>
      )
      expect(screen.getByTestId('choice-identify-button').disabled).to.be.false()
    })
  })
})
