import { expect } from 'chai'
import React from 'react'
import sinon from 'sinon'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SurveyTask from '@plugins/tasks/survey'
import { task } from '@plugins/tasks/survey/mock-data'
import Confusion from './Confusion'

describe('Component > Confusion', function () {
  const mockTask = SurveyTask.TaskModel.create(task)
  const ELAND = mockTask.choices.LND
  const HUMAN = mockTask.choices.HMN

  it('should render without crashing', function () {
    render(
      <Confusion
        confusion={ELAND}
        confusionId='LND'
        confusionText='Test confusion text.'
        images={mockTask.images}
      />
    )
    expect(screen).to.be.ok()
  })

  it('should render the confusion choice label', function () {
    render(
      <Confusion
        confusion={ELAND}
        confusionId='LND'
        confusionText='Test confusion text.'
        images={mockTask.images}
        label={mockTask.strings.get('choices.LND.label')}
      />
    )
    expect(screen.getByText(ELAND.label)).to.be.exist()
  })

  it('should render confusion images with choice with images', function () {
    render(
      <Confusion
        confusion={ELAND}
        confusionId='LND'
        confusionText='Test confusion text.'
        images={mockTask.images}
        label={mockTask.strings.get('choices.LND.label')}
      />
    )
    expect(screen.getByTestId('confusion-images')).to.exist()
  })

  it('should not render confusion images with choice without images', function () {
    render(
      <Confusion
        confusion={HUMAN}
        confusionId='HMN'
        confusionText='Test confusion text.'
        images={mockTask.images}
        label={mockTask.strings.get('choices.HMN.label')}
      />
    )
    expect(screen.queryByTestId('confusion-images')).to.be.null()
  })

  it('should render confusion text', function () {
    render(
      <Confusion
        confusion={ELAND}
        confusionId='LND'
        confusionText='Test confusion text.'
        images={mockTask.images}
        label={mockTask.strings.get('choices.LND.label')}
      />
    )
    expect(screen.getByText('Test confusion text.')).to.exist()
  })

  it('should render a "Cancel" button', function () {
    render(
      <Confusion
        confusion={ELAND}
        confusionId='LND'
        confusionText='Test confusion text.'
        images={mockTask.images}
        label={mockTask.strings.get('choices.LND.label')}
      />
    )
    /** The translation function will simply return keys in a testing env */
    expect(screen.getByRole('button', { name: 'SurveyTask.ConfusedWith.cancel' })).to.exist()
  })

  it('should call onClose when the Cancel button is clicked', async function () {
    const onCloseSpy = sinon.spy()
    const user = userEvent.setup({ delay: null })

    render(
      <Confusion
        confusion={ELAND}
        confusionId='LND'
        confusionText='Test confusion text.'
        images={mockTask.images}
        onClose={onCloseSpy}
        label={mockTask.strings.get('choices.LND.label')}
      />
    )
    /** The translation function will simply return keys in a testing env */
    await user.click(screen.getByRole('button', { name: 'SurveyTask.ConfusedWith.cancel' }))
    expect(onCloseSpy).to.have.been.calledOnce()
  })

  it('should render a "I think it\'s this" button', function () {
    render(
      <Confusion
        confusion={ELAND}
        confusionId='LND'
        confusionText='Test confusion text.'
        images={mockTask.images}
        label={mockTask.strings.get('choices.LND.label')}
      />
    )
    /** The translation function will simply return keys in a testing env */
    expect(screen.getByRole('button', { name: 'SurveyTask.ConfusedWith.itsThis' })).to.exist()
  })

  it('should call handleChoice with confusion ID when the "I think it\'s this" button is clicked', async function () {
    const handleChoiceSpy = sinon.spy()
    const user = userEvent.setup({ delay: null })

    render(
      <Confusion
        confusion={ELAND}
        confusionId='LND'
        confusionText='Test confusion text.'
        handleChoice={handleChoiceSpy}
        images={mockTask.images}
        label={mockTask.strings.get('choices.LND.label')}
      />
    )
    /** The translation function will simply return keys in a testing env */
    await user.click(screen.getByRole('button', { name: 'SurveyTask.ConfusedWith.itsThis' }))
    expect(handleChoiceSpy).to.have.been.calledOnceWith('LND')
  })
})
