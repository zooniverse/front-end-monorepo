import { expect } from 'chai'
import React from 'react'
import sinon from 'sinon'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { task as mockTask } from '@plugins/tasks/SurveyTask/mock-data'
import Choice from './Choice'
import en from './locales/en'

describe('Component > Choice', function () {
  describe('default', function () {
    let choice

    before(function () {
      render(
        <Choice
          choiceId='KD'
          task={mockTask}
        />
      )
      choice = screen.getByTestId('choice-KD')
    })

    after(function () {
      cleanup()
    })

    it('should render without crashing', function () {
      expect(choice).to.be.ok()
    })
  })

  describe('handleDelete callback', function () {
    let handleDeleteSpy

    before(function () {
      handleDeleteSpy = sinon.spy()
      render(
        <Choice
          choiceId='KD'
          handleDelete={handleDeleteSpy}
          task={mockTask}
        />
      )
      const notThis = screen.getByText(en.Choice.notThis)
      userEvent.click(notThis)
    })

    after(function () {
      cleanup()
    })

    it('should be called when "Not this" button is clicked', function () {
      expect(handleDeleteSpy).to.have.been.calledOnceWith('KD')
    })
  })

  describe('onIdentify callback', function () {
    let onIdentifySpy

    before(function () {
      onIdentifySpy = sinon.spy()
      render(
        <Choice
          choiceId='FR'
          onIdentify={onIdentifySpy}
          task={mockTask}
        />
      )
      const identify = screen.getByText(en.Choice.identify) 
      userEvent.click(identify)
    })

    after(function () {
      cleanup()
    })

    it('should be called when "Identify" button clicked', function () {
      expect(onIdentifySpy).to.have.been.calledOnce()
    })
  })

  describe('with choice with images and confusions', function () {
    // choice 'KD' (Kudu) includes images, confusions, and questions
    let carousel, confusedWith

    before(function () {
      render(
        <Choice
          choiceId='KD'
          task={mockTask}
        />
      )
      carousel = screen.getByTestId('choice-images')
      confusedWith = screen.getByText('Sometimes confused with')
    })

    after(function () {
      cleanup()
    })

    it('should render Carousel', function () {
      expect(carousel).to.exist()
    })

    it('should render ConfusedWith', function () {
      expect(confusedWith).to.exist()
    })
  })

  describe('with choice with questions', function () {
    // choice 'KD' (Kudu) includes images, confusions, and questions
    let question

    before(function () {
      render(
        <Choice
          choiceId='KD'
          task={mockTask}
        />
      )
      question = screen.getByText('Are there any young present?')
    })

    after(function () {
      cleanup()
    })

    it('should render Questions', function () {
      expect(question).to.exist()
    })
  })

  describe('with choice without images, with confusions', function () {
    // choice 'NTHNGHR' (Nothing here) excludes images, includes confusions
    let carousel, fire

    before(function () {
      render(
        <Choice
          choiceId='NTHNGHR'
          task={mockTask}
        />
      )
      carousel = screen.queryByTestId('choice-images')
      fire = screen.getByText('Fire')
    })

    after(function () {
      cleanup()
    })

    it('should have the first ConfusedWith button as the document active element', function () {
      expect(fire).to.equal(document.activeElement)
    })

    it('should not render Carousel', function () {
      expect(carousel).to.be.null()
    })
  })

  describe('with choice without images or confusions, with questions', function () {
    // choice 'HMN' (Human) excludes images and confusions, includes questions
    let activeElement, confusedWith, yesAnswer

    before(function () {
      render(
        <Choice
          choiceId='HMN'
          task={mockTask}
        />
      )
      confusedWith = screen.queryByText('Sometimes confused with')
      yesAnswer = screen.getByLabelText('Yes')
    })

    after(function () {
      cleanup()
    })

    it('should have the first Questions input as the document active element', function () {
      expect(yesAnswer).to.equal(document.activeElement)
    })

    it('should not render ConfusedWith', function () {
      expect(confusedWith).to.be.null()
    })
  })

  describe('with choice without more than 1 image, confusions, or questions', function () {
    // choice 'FR' (Fire) has 1 image, excludes confusions and questions
    let activeElement, radioButtons, checkboxes, identify

    before(function () {
      render(
        <Choice
          choiceId='FR'
          task={mockTask}
        />
      )
      radioButtons = screen.queryAllByRole('radio', { hidden: true })
      checkboxes = screen.queryAllByRole('checkbox', { hidden: true })
      identify = screen.getByRole('button', { name: en.Choice.identify }, { hidden: true })
      const activeElement = document.activeElement
    })

    after(function () {
      cleanup()
    })

    it('should have the "Identify" button as the document active element', function () {
      expect(identify).to.equal(document.activeElement)
    })

    it('should not render Questions', function () {
      expect(radioButtons).to.have.lengthOf(0)
      expect(checkboxes).to.have.lengthOf(0)
    })
  })
})
