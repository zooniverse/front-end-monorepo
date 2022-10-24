import { expect } from 'chai'
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { task as mockTask } from '@plugins/tasks/survey/mock-data'
import { default as Task } from '@plugins/tasks/survey'

import FilterStatus from './FilterStatus'

describe('Component > FilterStatus', function () {
  this.timeout(0)

  let task = Task.TaskModel.create({
    characteristics: mockTask.characteristics,
    characteristicsOrder: mockTask.characteristicsOrder,
    images: mockTask.images,
    taskKey: 'T0',
    type: 'survey'
  })

  it('should render without crashing', function () {
    render(
      <FilterStatus
        task={task}
      />
    )
    expect(screen.getByRole('button', { name: 'SurveyTask.CharacteristicsFilter.filter' })).to.be.ok()
  })

  it('should not show characteristic radiogroups on initial render', function () {
    render(
      <FilterStatus
        task={task}
      />
    )
    expect(screen.queryByRole('radiogroup')).to.be.null()
  })

  describe('when disabled, on click', function () {
    it('should not show characteristic radiogroups on click', async function () {
      const user = userEvent.setup({ delay: null })
      render(
        <FilterStatus
          disabled
          task={task}
        />
      )
      const filterButton = screen.getByRole('button', { name: 'SurveyTask.CharacteristicsFilter.filter' })
      await user.click(filterButton)

      expect(screen.queryByRole('radiogroup')).to.be.null()
    })
  })

  describe('on click', function () {
    it('should show the characteristic radiogroups', async function () {
      const user = userEvent.setup({ delay: null })
      render(
        <FilterStatus
          task={task}
        />
      )
      const filterButton = screen.getByRole('button', { name: 'SurveyTask.CharacteristicsFilter.filter' })
      await user.click(filterButton)

      expect(screen.getAllByRole('radiogroup')).to.have.lengthOf(task.characteristicsOrder.length)
    })
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
