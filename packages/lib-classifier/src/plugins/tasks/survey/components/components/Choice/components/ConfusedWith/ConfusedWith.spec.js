import { expect } from 'chai'
import React from 'react'
import { render, screen } from '@testing-library/react'
import zooTheme from '@zooniverse/grommet-theme'

import SurveyTask from '@plugins/tasks/survey'
import { task } from '@plugins/tasks/survey/mock-data'
import { ConfusedWith } from './ConfusedWith'

describe('Component > ConfusedWith', function () {
  const mockTask = SurveyTask.TaskModel.create(task)
  const KUDU = mockTask.choices.KD

  it('should render without crashing', function () {
    render(
      <ConfusedWith
        choices={mockTask.choices}
        confusions={KUDU.confusions}
        confusionsOrder={KUDU.confusionsOrder}
        images={mockTask.images}
        strings={mockTask.strings}
        theme={zooTheme}
      />
    )
    expect(screen).to.be.ok()
  })

  it('should render the section title', function () {
    render(
      <ConfusedWith
        choices={mockTask.choices}
        confusions={KUDU.confusions}
        confusionsOrder={KUDU.confusionsOrder}
        images={mockTask.images}
        strings={mockTask.strings}
        theme={zooTheme}
      />
    )
    /** The translation function will simply return keys in a testing env */
    expect(screen.getByText('SurveyTask.ConfusedWith.confused')).to.exist()
  })

  it('should render the appropriate confused with buttons', function () {
    render(
      <ConfusedWith
        choices={mockTask.choices}
        confusions={KUDU.confusions}
        confusionsOrder={KUDU.confusionsOrder}
        images={mockTask.images}
        strings={mockTask.strings}
        theme={zooTheme}
      />
    )

    expect(screen.getAllByRole('button')).to.have.lengthOf(2)
    expect(screen.getByRole('button', { name: 'Eland' })).to.exist()
    expect(screen.getByRole('button', { name: 'Hartebeest' })).to.exist()
  })

  describe('with hasFocus of true', function () {
    it('should have the first confused with button as the document active element', function () {
      render(
        <ConfusedWith
          choices={mockTask.choices}
          confusions={KUDU.confusions}
          confusionsOrder={KUDU.confusionsOrder}
          hasFocus
          images={mockTask.images}
          strings={mockTask.strings}
          theme={zooTheme}
        />
      )
      expect(screen.getByRole('button', { name: 'Eland' })).to.equal(document.activeElement)
    })

    it('should not have the other confused with button as the document active element', function () {
      render(
        <ConfusedWith
          choices={mockTask.choices}
          confusions={KUDU.confusions}
          confusionsOrder={KUDU.confusionsOrder}
          hasFocus
          images={mockTask.images}
          strings={mockTask.strings}
          theme={zooTheme}
        />
      )
      expect(screen.getByRole('button', { name: 'Hartebeest' })).to.not.equal(document.activeElement)
    })
  })
})
