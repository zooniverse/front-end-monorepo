import { Grommet } from 'grommet'
import { render, screen } from '@testing-library/react'
import zooTheme from '@zooniverse/grommet-theme'

import { task } from '@plugins/tasks/survey/mock-data'
import SurveyTask from '@plugins/tasks/survey'
import Choice from './Choice'

const mockTask = SurveyTask.TaskModel.create(task)

describe('Component > Choice', function () {
  this.timeout(0)

  describe('with choice with images and questions', function () {
    let carousel, showMoreInfo, question

    // choice 'KD' (Kudu) includes images and questions
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
      showMoreInfo = screen.getByRole('button', { name: 'SurveyTask.Choice.moreInfo' })
      question = screen.getByText('Are there any young present?')
    })

    it('should show Carousel', function () {
      expect(carousel).to.be.ok()
    })

    it('should show "More info" button', function () {
      expect(showMoreInfo).to.be.ok()
    })

    it('should show Questions', function () {
      expect(question).to.be.ok()
    })
  })

  describe('with choice without images', function () {
    // choice 'NTHNGHR' (Nothing here) excludes images

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

  describe('with choice without more than 1 image or questions', function () {
    // choice 'FR' (Fire) has 1 image excludes questions

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
