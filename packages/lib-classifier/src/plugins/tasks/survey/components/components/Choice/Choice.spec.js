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
    // choice 'KD' (Kudu) includes images, confusions, and questions

    it('should show Carousel', function () {
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
      expect(screen.getByTestId('choice-images')).to.be.ok()
    })

    it('should show ConfusedWith', function () {
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
      expect(screen.getByText('SurveyTask.ConfusedWith.confused')).to.be.ok()
    })

    it('should show Questions', function () {
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
      expect(screen.getByText('Are there any young present?')).to.be.ok()
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
      expect(screen.getByRole('button', { name: 'SurveyTask.Choice.identify' }).disabled).to.be.true()
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
      expect(screen.getByRole('button', { name: 'SurveyTask.Choice.identify' }).disabled).to.be.false()
    })
  })
})
