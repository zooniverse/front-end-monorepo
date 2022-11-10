import { expect } from 'chai'
import React from 'react'
import { render, screen } from '@testing-library/react'

import SurveyTask from '@plugins/tasks/survey'
import { task } from '@plugins/tasks/survey/mock-data'

import Characteristics from './Characteristics'

const mockTask = SurveyTask.TaskModel.create(task)

describe('Component > Characteristics', function () {
  it('should show Characteristic sections in order per task characteristicsOrder', function () {
    render(
      <Characteristics
        characteristics={mockTask.characteristics}
        characteristicsOrder={mockTask.characteristicsOrder}
        images={mockTask.images}
        strings={mockTask.strings}
      />
    )

    const characteristicSections = screen.getAllByRole('heading')

    expect(characteristicSections[0]).to.have.text('Like')
    expect(characteristicSections[1]).to.have.text('Pattern')
    expect(characteristicSections[2]).to.have.text('Color')
  })
})
