import { expect } from 'chai'
import { render, screen } from '@testing-library/react'

import SurveyTask from '@plugins/tasks/survey'
import { task } from '@plugins/tasks/survey/mock-data'
import Questions from './Questions'

describe('Component > Questions', function () {
  const mockTask = SurveyTask.TaskModel.create(task)
  const questionIds = ['HWMN', 'WHTBHVRSDS', 'RTHRNNGPRSNT']

  it('should show the appropriate inputs', function () {
    // "HWMN" has 12 radio inputs, "WHTBHVRSDS" has 5 checkbox inputs, and "RTHRNNGPRSNT" has 2 radio inputs

    render(
      <Questions
        questionIds={questionIds}
        questions={mockTask.questions}
        strings={mockTask.strings}
      />
    )
    expect(screen.queryAllByRole('radio', { hidden: true })).to.have.lengthOf(14)
    expect(screen.queryAllByRole('checkbox', { hidden: true })).to.have.lengthOf(5)
  })

  it('should show answers provided as checked inputs', function () {
    render(
      <Questions
        answers={{ WHTBHVRSDS: ['RSTNG', 'TNG'], HWMN: '9' }}
        questionIds={questionIds}
        questions={mockTask.questions}
        strings={mockTask.strings}
      />
    )
    const radioInputs = screen.queryAllByRole('radio', { hidden: true })
    const checkboxInputs = screen.queryAllByRole('checkbox', { hidden: true })
    radioInputs.forEach(checkboxInput => {
      if (checkboxInput.getAttribute('value') === '9') {
        expect(checkboxInput.getAttribute('checked')).to.not.be.null()
      } else {
        expect(checkboxInput.getAttribute('checked')).to.be.null()
      }
    })
    checkboxInputs.forEach(checkboxInput => {
      if (checkboxInput.getAttribute('value') === 'RSTNG') {
        expect(checkboxInput.getAttribute('checked')).to.not.be.null()
      } else if (checkboxInput.getAttribute('value') === 'TNG') {
        expect(checkboxInput.getAttribute('checked')).to.not.be.null()
      } else {
        expect(checkboxInput.getAttribute('checked')).to.be.null()
      }
    })
  })

  describe('with hasFocus of true', function () {
    it('should have the first question\'s first input as the document active element', function () {
      // per the survey task questionsOrder the first question is HWMN (How many?) and the first input is "1"
      render(
        <Questions
          hasFocus
          questionIds={questionIds}
          questions={mockTask.questions}
          strings={mockTask.strings}
        />
      )
      expect(screen.getByLabelText('1')).to.equal(document.activeElement)
    })
  })
})
