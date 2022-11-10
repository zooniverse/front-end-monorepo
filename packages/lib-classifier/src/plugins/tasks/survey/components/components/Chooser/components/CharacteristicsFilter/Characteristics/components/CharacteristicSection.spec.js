import { expect } from 'chai'
import React from 'react'
import { render, screen } from '@testing-library/react'

import SurveyTask from '@plugins/tasks/survey'
import { task } from '@plugins/tasks/survey/mock-data'

import CharacteristicSection from './CharacteristicSection'

const mockTask = SurveyTask.TaskModel.create(task)
const characteristicPattern = mockTask.characteristics.PTTRN

describe('Component > CharacteristicSection', function () {
  it('should show characteristic Filter inputs in order per the task  characteristic\'s valuesOrder', function () {
    render(
      <CharacteristicSection
        characteristic={characteristicPattern}
        characteristicId='PTTRN'
        images={mockTask.images}
        label='Pattern'
        selectedValueId=''
        strings={mockTask.strings}
      />
    )

    const characteristicFilterInputs = screen.getAllByRole('radio')

    // mock survey task valuesOrder = ['SLD', 'STRPS', 'BNDS', 'SPTS']
    expect(characteristicFilterInputs[0].getAttribute('value')).to.equal('SLD')
    expect(characteristicFilterInputs[1].getAttribute('value')).to.equal('STRPS')
    expect(characteristicFilterInputs[2].getAttribute('value')).to.equal('BNDS')
    expect(characteristicFilterInputs[3].getAttribute('value')).to.equal('SPTS')
  })
})
