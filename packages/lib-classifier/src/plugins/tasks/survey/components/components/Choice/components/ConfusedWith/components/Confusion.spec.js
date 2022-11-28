import { expect } from 'chai'
import React from 'react'
import { render, screen } from '@testing-library/react'

import SurveyTask from '@plugins/tasks/survey'
import { task } from '@plugins/tasks/survey/mock-data'
import Confusion from './Confusion'

describe('Component > Confusion', function () {
  const mockTask = SurveyTask.TaskModel.create(task)
  const KUDU = mockTask.choices.KD
  const HUMAN = mockTask.choices.HMN

  it('should show the confusion choice label', function () {
    render(
      <Confusion
        confusion={KUDU}
        confusionId='KD'
        confusionText='Test confusion text.'
        images={mockTask.images}
        label={mockTask.strings.get('choices.KD.label')}
      />
    )
    expect(screen.getByText(KUDU.label)).to.be.ok()
  })

  it('should show confusion images with choice with images', function () {
    render(
      <Confusion
        confusion={KUDU}
        confusionId='KD'
        confusionText='Test confusion text.'
        images={mockTask.images}
        label={mockTask.strings.get('choices.KD.label')}
      />
    )
    expect(screen.getByTestId('confusion-images')).to.be.ok()
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

  it('should show confusion text', function () {
    render(
      <Confusion
        confusion={KUDU}
        confusionId='KD'
        confusionText='Test confusion text.'
        images={mockTask.images}
        label={mockTask.strings.get('choices.KD.label')}
      />
    )
    expect(screen.getByText('Test confusion text.')).to.be.ok()
  })

  it('should show a "Cancel" button', function () {
    render(
      <Confusion
        confusion={KUDU}
        confusionId='KD'
        confusionText='Test confusion text.'
        images={mockTask.images}
        label={mockTask.strings.get('choices.KD.label')}
      />
    )
    /** The translation function will simply return keys in a testing env */
    expect(screen.getByRole('button', { name: 'SurveyTask.ConfusedWith.cancel' })).to.be.ok()
  })

  it('should show a "I think it\'s this" button', function () {
    render(
      <Confusion
        confusion={KUDU}
        confusionId='KD'
        confusionText='Test confusion text.'
        images={mockTask.images}
        label={mockTask.strings.get('choices.KD.label')}
      />
    )
    /** The translation function will simply return keys in a testing env */
    expect(screen.getByRole('button', { name: 'SurveyTask.ConfusedWith.itsThis' })).to.be.ok()
  })
})
