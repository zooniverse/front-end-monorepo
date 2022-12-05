import { expect } from 'chai'
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
    expect(screen.queryByRole('radiogroup')).to.be.null()
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
      expect(screen.getByTestId('filter-LK-CTDG')).to.be.ok()
      expect(screen.getByTestId('filter-CLR-BLCK')).to.be.ok()
      expect(screen.getByTestId('filter-PTTRN-SLD')).to.be.ok()
    })
  })
})
