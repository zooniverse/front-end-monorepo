import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Chooser from './Chooser'

import SurveyTask from '@plugins/tasks/survey'
import { task } from '@plugins/tasks/survey/mock-data'

const taskWithoutCharacteristics = Object.assign({}, task, { characteristics: {} })

describe('Component > Chooser', function () {
  describe('with a survey task with no characteristics filters', function () {
    const mockTaskWithoutCharacteristics = SurveyTask.TaskModel.create(taskWithoutCharacteristics)

    it('should allow you to choose from a list of choices', function () {
      render(
        <Chooser
          task={mockTaskWithoutCharacteristics}
        />
      )
      expect(screen.getByText('Aardvark')).to.be.ok() // first choice per mock-data survey task
      expect(screen.getByText('Nothing here')).to.be.ok() // last choice per mock-data survey task
    })

    it('should not allow you to filter the list of choices', function () {
      render(
        <Chooser
          task={mockTaskWithoutCharacteristics}
        />
      )
      expect(screen.queryByText('SurveyTask.CharacteristicsFilter.filter')).to.be.null()
    })

    it('should not allow you to clear filters on the list of choices', function () {
      render(
        <Chooser
          task={mockTaskWithoutCharacteristics}
        />
      )
      expect(screen.queryByText('SurveyTask.CharacteristicsFilter.clearFilters')).to.be.null()
    })
  })

  describe('with a survey task with characteristics filters', function () {
    const mockTask = SurveyTask.TaskModel.create(task)

    it('should allow you to choose from a list of choices', function () {
      render(
        <Chooser
          task={mockTask}
        />
      )
      expect(screen.getByText('Aardvark')).to.be.ok() // first choice per mock-data survey task
      expect(screen.getByText('Nothing here')).to.be.ok() // last choice per mock-data survey task
    })

    it('should show you a Filter button', function () {
      render(
        <Chooser
          task={mockTask}
        />
      )
      expect(screen.getByText('SurveyTask.CharacteristicsFilter.filter')).to.be.ok()
    })

    it('should show you a Clear Filters button', function () {
      render(
        <Chooser
          task={mockTask}
        />
      )
      expect(screen.getByText('SurveyTask.CharacteristicsFilter.clearFilters')).to.be.ok()
    })

    describe('on Filter button click', function () {
      it('should show the characteristic radiogroups', async function () {
        const user = userEvent.setup({ delay: null })
        render(
          <Chooser
            task={mockTask}
          />
        )
        const filterButton = screen.getByRole('button', { name: 'SurveyTask.CharacteristicsFilter.filter' })
        await user.click(filterButton)
  
        expect(screen.getAllByRole('radiogroup')).to.have.lengthOf(task.characteristicsOrder.length)
      })

      describe('when Filter button is disabled', function () {
        it('should not show characteristic radiogroups', async function () {
          const user = userEvent.setup({ delay: null })
          render(
            <Chooser
              disabled
              task={mockTask}
            />
          )
          const filterButton = screen.getByRole('button', { name: 'SurveyTask.CharacteristicsFilter.filter' })
          await user.click(filterButton)
    
          expect(screen.queryByRole('radiogroup')).to.be.null()
        })
      })
    })

    describe('with a filter selected', function () {
      it('should allow you to choose from a filtered list of choices', function () {
        render(
            <Chooser
              filters={{ PTTRN: 'SLD'}}
              task={mockTask}
            />
        )
        expect(screen.getByText('Aardvark')).to.be.ok() // first choice per mock-data survey task, has characteristic pattern solid (PTTRN: SLD)
        expect(screen.queryByText('Nothing here')).to.be.null() // last choice per mock-data survey task, doesn't have characteristic pattern solid (PTTRN: SLD)
      })
    })
  })
})
