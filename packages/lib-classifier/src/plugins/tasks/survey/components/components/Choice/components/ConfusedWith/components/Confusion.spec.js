import { expect } from 'chai'
import { render, screen } from '@testing-library/react'

import SurveyTask from '@plugins/tasks/survey'
import { task } from '@plugins/tasks/survey/mock-data'
import Confusion from './Confusion'

describe('Component > Confusion', function () {
  let label, images, confusionText, cancel, itsThis
  
  const mockTask = SurveyTask.TaskModel.create(task)
  const KUDU = mockTask.choices.KD
  const HUMAN = mockTask.choices.HMN

  describe('with choice with images', function () {
    before(function () {
      render(
        <Confusion
          confusion={KUDU}
          confusionId='KD'
          confusionText='Test confusion text.'
          images={mockTask.images}
          label={mockTask.strings.get('choices.KD.label')}
        />
      )

      label = screen.getByText(KUDU.label)
      images = screen.getByTestId('confusion-images')
      confusionText = screen.getByText('Test confusion text.')
      cancel = screen.getByRole('button', { name: 'SurveyTask.ConfusedWith.cancel' })
      itsThis = screen.getByRole('button', { name: 'SurveyTask.ConfusedWith.itsThis' })
    })

    it('should show the confusion choice label', function () {
      expect(label).to.be.ok()
    })

    it('should show confusion images', function () {
      expect(images).to.be.ok()
    })

    it('should show confusion text', function () {
      expect(confusionText).to.be.ok()
    })

    it('should show a "Cancel" button', function () {
      /** The translation function will simply return keys in a testing env */
      expect(cancel).to.be.ok()
    })
  
    it('should show a "I think it\'s this" button', function () {
      /** The translation function will simply return keys in a testing env */
      expect(itsThis).to.be.ok()
    })
  })

  describe('with choice without images', function () {
    it('should not render confusion images', function () {
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
  })
})
