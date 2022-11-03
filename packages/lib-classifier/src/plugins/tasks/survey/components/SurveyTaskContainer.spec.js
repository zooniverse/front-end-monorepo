import { expect } from 'chai'
import React from 'react'
import { composeStory } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Meta, { Default, NoFilters } from './SurveyTask.stories'

describe('SurveyTaskContainer', function () {
  describe('when choices are showing / without a selected choice', function () {
    describe('with characteristic filters', function () {
      const DefaultStory = composeStory(Default, Meta)

      it('should show a filter button', function () {
        const { getByRole } = render(<DefaultStory />)
        const filterButton = getByRole('button', { name: 'SurveyTask.CharacteristicsFilter.filter' })
        expect(filterButton).to.exist()
      })

      it('should show the choices', function () {
        const { getAllByRole } = render(<DefaultStory />)
        const choiceButtons = getAllByRole('menuitemcheckbox')
        expect(choiceButtons.length).to.equal(6)
        expect(choiceButtons[0]).to.have.text('Aardvark')
        expect(choiceButtons[1]).to.have.text('Elephant')
        expect(choiceButtons[2]).to.have.text('Kudu')
        expect(choiceButtons[3]).to.have.text('Human')
        expect(choiceButtons[4]).to.have.text('Fire')
        expect(choiceButtons[5]).to.have.text('Nothing here')
      })

      it('should show the choices showing count out of total choices count', function () {
        const { getByText } = render(<DefaultStory />)
        const choicesShowingCount = getByText('SurveyTask.CharacteristicsFilter.showing')
        expect(choicesShowingCount).to.exist()
      })

      it('should show a clear filters button', function () {
        const { getByRole } = render(<DefaultStory />)
        const clearFiltersButton = getByRole('button', { name: 'Clear SurveyTask.CharacteristicsFilter.clearFilters' })
        expect(clearFiltersButton).to.exist()
      })

      it.skip('should keep filters after choice identified', function () {})
    })

    describe('without characteristic filters', function () {
      const NoFiltersStory = composeStory(NoFilters, Meta)
      
      it('should not show a filter button', function () {
        const { queryByRole } = render(<NoFiltersStory />)
        const filterButton = queryByRole('button', { name: 'SurveyTask.CharacteristicsFilter.filter' })
        expect(filterButton).to.not.exist()
      })

      it('should show the choices', function () {
        const { getAllByRole } = render(<NoFiltersStory />)
        const choiceButtons = getAllByRole('menuitemcheckbox')
        expect(choiceButtons.length).to.equal(6)
        expect(choiceButtons[0]).to.have.text('Aardvark')
        expect(choiceButtons[1]).to.have.text('Elephant')
        expect(choiceButtons[2]).to.have.text('Kudu')
        expect(choiceButtons[3]).to.have.text('Human')
        expect(choiceButtons[4]).to.have.text('Fire')
        expect(choiceButtons[5]).to.have.text('Nothing here')
      })

      it('should not show the choices showing count out of total choices count', function () {
        const { queryByText } = render(<NoFiltersStory />)
        const choicesShowingCount = queryByText('SurveyTask.CharacteristicsFilter.showing')
        expect(choicesShowingCount).to.not.exist()
      })

      it('should not not show a clear filters button', function () {
        const { queryByRole } = render(<NoFiltersStory />)
        const clearFiltersButton = queryByRole('button', { name: 'Clear SurveyTask.CharacteristicsFilter.clearFilters' })
        expect(clearFiltersButton).to.not.exist()
      })
    })
  })

  describe('with a selected choice', function () {
    it.skip('should...', function () {})
  })
})
