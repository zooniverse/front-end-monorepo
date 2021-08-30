import { expect } from 'chai'
import React from 'react'
import sinon from 'sinon'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { task as mockTask } from '@plugins/tasks/SurveyTask/mock-data'
import Choice from './Choice'
import en from './locales/en'

describe('Component > Choice', function () {
  it('should render without crashing', function () {
    render(
      <Choice
        choiceId='KD'
        task={mockTask}
      />
    )
    expect(screen).to.be.ok()
  })

  it('should call handleDelete when "Not this" button clicked', function () {
    const handleDeleteSpy = sinon.spy()
    render(
      <Choice
        choiceId='KD'
        handleDelete={handleDeleteSpy}
        task={mockTask}
      />
    )
    userEvent.click(screen.getByText(en.Choice.notThis))

    expect(handleDeleteSpy).to.have.been.calledOnceWith('KD')
  })

  it('should call onIdentify when "Identify" button clicked', function () {
    const onIdentifySpy = sinon.spy()
    render(
      <Choice
        choiceId='FR'
        onIdentify={onIdentifySpy}
        task={mockTask}
      />
    )
    userEvent.click(screen.getByText(en.Choice.identify))

    expect(onIdentifySpy).to.have.been.calledOnce()
  })

  describe('with choice with images, confusions, and questions', function () {
    // choice 'KD' (Kudu) includes images, confusions, and questions

    it('should render Carousel', function () {
      render(
        <Choice
          choiceId='KD'
          task={mockTask}
        />
      )
      expect(screen.getByTestId('choice-images')).to.exist()
    })

    it('should render ConfusedWith', function () {
      render(
        <Choice
          choiceId='KD'
          task={mockTask}
        />
      )
      expect(screen.getByText('Sometimes confused with')).to.exist()
    })

    it('should render Questions', function () {
      render(
        <Choice
          choiceId='HMN'
          task={mockTask}
        />
      )
      expect(screen.getByText('Are there any young present?')).to.exist()
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

    it('should have the first ConfusedWith button as the document active element', function () {
      render(
        <Choice
          choiceId='NTHNGHR'
          task={mockTask}
        />
      )
      expect(screen.getByText('Fire')).to.equal(document.activeElement)
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

    it('should have the first Questions input as the document active element', function () {
      render(
        <Choice
          choiceId='HMN'
          task={mockTask}
        />
      )
      expect(screen.getByLabelText('Yes')).to.equal(document.activeElement)
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

    it('should have the "Identify" button as the document active element', function () {
      render(
        <Choice
          choiceId='FR'
          task={mockTask}
        />
      )
      expect(screen.getByRole('button', { name: en.Choice.identify }, { hidden: true })).to.equal(document.activeElement)
    })
  })
})
