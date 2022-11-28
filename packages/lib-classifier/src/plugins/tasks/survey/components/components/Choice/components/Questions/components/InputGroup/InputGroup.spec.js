import { expect } from 'chai'
import React from 'react'
import { render, screen } from '@testing-library/react'

import { task as mockTask } from '@plugins/tasks/survey/mock-data'
import InputGroup from './InputGroup'

describe('Component > InputGroup', function () {
  describe('with checkbox type', function () {
    const questionId = 'WHTBHVRSDS'
    const question = mockTask.questions[questionId]
    const options = question.answersOrder.map(answerId => ({
      label: question.answers[answerId].label,
      value: answerId
    }))

    it('should show 5 checkbox inputs', function () {
      render(
        <InputGroup
          options={options}
          questionId={questionId}
          type='checkbox'
        />
      )
      expect(screen.queryAllByRole('checkbox')).to.have.lengthOf(5)
    })

    describe('with defined answer', function () {
      it('should show chosen CheckBoxInputs as checked', function () {
        render(
          <InputGroup
            options={options}
            questionAnswer={['RSTNG', 'TNG']}
            questionId={questionId}
            type='checkbox'
          />
        )
        const checkboxInputs = screen.queryAllByRole('checkbox')

        checkboxInputs.forEach(checkboxInput => {
          if (checkboxInput.getAttribute('value') === 'RSTNG') {
            expect(checkboxInput.checked).to.be.true()
          } else if (checkboxInput.getAttribute('value') === 'TNG') {
            expect(checkboxInput.checked).to.be.true()
          } else {
            expect(checkboxInput.checked).to.be.false()
          }
        })
      })
    })

    describe('with hasFocus true', function () {
      // per the question ('WHTBHVRSDS') answersOrder 'Resting' is the first input

      it('should have the first checkbox input as the document active element', function () {
        render(
          <InputGroup
            hasFocus
            options={options}
            questionId={questionId}
            type='checkbox'
          />
        )
        expect(screen.getByLabelText('Resting')).to.equal(document.activeElement)
      })
    })
  })

  describe('with radio type', function () {
    const questionId = 'RTHRNNGPRSNT'
    const question = mockTask.questions[questionId]
    const options = question.answersOrder.map(answerId => ({
      label: question.answers[answerId].label,
      value: answerId
    }))

    it('should show 2 radio inputs', function () {
      render(
        <InputGroup
          options={options}
          questionId={questionId}
          type='radio'
        />
      )
      expect(screen.queryAllByRole('radio')).to.have.lengthOf(2)
    })

    describe('with defined answer', function () {
      it('should show chosen RadioInput as checked', function () {
        render(
          <InputGroup
            options={options}
            questionAnswer='N'
            questionId={questionId}
            type='radio'
          />
        )
        const radioInputs = screen.queryAllByRole('radio')
        radioInputs.forEach(checkboxInput => {
          if (checkboxInput.getAttribute('value') === 'N') {
            expect(checkboxInput.checked).to.be.true()
          } else {
            expect(checkboxInput.checked).to.be.false()
          }
        })
      })
    })

    describe('with hasFocus true', function () {
      // per the question ('RTHRNNGPRSNT') answersOrder 'Yes' is the first input

      it('should have the first radio input as the document active element', function () {
        render(
          <InputGroup
            hasFocus
            options={options}
            questionId={questionId}
            type='radio'
          />
        )
        expect(screen.getByLabelText('Yes')).to.equal(document.activeElement)
      })
    })
  })
})
