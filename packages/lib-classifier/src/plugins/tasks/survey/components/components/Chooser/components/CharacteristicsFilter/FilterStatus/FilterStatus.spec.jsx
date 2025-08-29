import { render, screen } from '@testing-library/react'

import { task as mockTask } from '@plugins/tasks/survey/mock-data'
import { default as Task } from '@plugins/tasks/survey'

import FilterStatus from './FilterStatus'

describe('Component > FilterStatus', function () {
  let task = Task.TaskModel.create({
    characteristics: mockTask.characteristics,
    characteristicsOrder: mockTask.characteristicsOrder,
    images: mockTask.images,
    taskKey: 'T0',
    type: 'survey'
  })

  it('should not show characteristic radiogroups on initial render', function () {
    render(
      <FilterStatus
        task={task}
      />
    )
    expect(screen.queryByRole('radiogroup')).to.equal(null)
  })

  describe('with selected filters', function () {
    it('should show the appropriate selected filter buttons', function () {
      const filters = {
        LK: 'CTDG',
        CLR: 'BLCK',
        PTTRN: 'SLD'
      }

      render(
        <FilterStatus
          filters={filters}
          task={task}
        />
      )
      expect(screen.getByTestId('remove filter-LK-CTDG')).toBeDefined()
      expect(screen.getByTestId('remove filter-CLR-BLCK')).toBeDefined()
      expect(screen.getByTestId('remove filter-PTTRN-SLD')).toBeDefined()
    })

    it('should show the showing x of y text', function () {
      const filters = {
        LK: 'CTDG',
        CLR: 'BLCK',
        PTTRN: 'SLD'
      }

      render(
        <FilterStatus
          filters={filters}
          task={task}
        />
      )
      expect(screen.getByText('SurveyTask.CharacteristicsFilter.showing')).toBeDefined()
    })

    it('should show the clear all filters button', function () {
      const filters = {
        LK: 'CTDG',
        CLR: 'BLCK',
        PTTRN: 'SLD'
      }

      render(
        <FilterStatus
          filters={filters}
          task={task}
        />
      )
      expect(screen.getByRole('button', { name: 'SurveyTask.CharacteristicsFilter.clearFilters' })).toBeDefined()
    })
  })
})
