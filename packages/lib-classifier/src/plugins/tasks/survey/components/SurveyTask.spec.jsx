import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import Meta, { Default, NoFiltersNoInstruction } from './SurveyTask.stories'

describe('SurveyTask', function () {
  describe('when choices are showing / without a selected choice', function () {
    describe('with task instruction', function () {
      it('should show the instruction', function () {
        const DefaultStory = composeStory(Default, Meta)
        render(<DefaultStory />)

        const instruction = screen.findByText('Select the animals you see in the image.')

        expect(instruction).to.exist
      })
    })

    describe('with characteristic filters', function () {
      let filterButton, choiceButtons, choicesShowingCount, clearFiltersButton

      before(function () {
        const DefaultStory = composeStory(Default, Meta)
        render(<DefaultStory />)
        // filterButton is the Filter button above the choices
        filterButton = screen.queryByLabelText('Filter')
        const choiceMenu = document.querySelector('[role=menu]')
        // choiceButtons are the menu items / buttons for the various choices (i.e. for the mock task the various animals)
        choiceButtons = choiceMenu.querySelectorAll('[role=menuitem]')
        // choicesShowingCount is the text below choices that notes "Showing X of Y"
        choicesShowingCount = screen.queryByText('Showing', { exact: false })
        clearFiltersButton = screen.queryByRole('button', { name: 'Clear filters' })
      })

      it('should show a filter button', function () {
        expect(filterButton).to.exist
      })

      it('should show the choices', function () {
        expect(choiceButtons.length).to.equal(6)
        expect(choiceButtons[0]).to.have.text('Aardvark')
        expect(choiceButtons[1]).to.have.text('Elephant')
        expect(choiceButtons[2]).to.have.text('Kudu')
        expect(choiceButtons[3]).to.have.text('Human')
        expect(choiceButtons[4]).to.have.text('Fire')
        expect(choiceButtons[5]).to.have.text('Nothing here')
      })

      // the choicesShowingCount is not rendered until filters are applied
      it.skip('should not show the choices showing count out of total choices count', function () {
        expect(choicesShowingCount).to.equal(null)
      })

      // the clearFiltersButton is not rendered until filters are applied
      it('should not not show a "Clear All Filters" button', function () {
        expect(clearFiltersButton).to.equal(null)
      })
    })

    describe('without characteristic filters', function () {
      let filterButton, choiceButtons, choicesShowingCount, clearFiltersButton

      before(function () {
        const NoFiltersNoInstructionStory = composeStory(NoFiltersNoInstruction, Meta)
        render(<NoFiltersNoInstructionStory />)
        // filterButton is the Filter button above the choices
        filterButton = screen.queryByLabelText('Filter')
        const choiceMenu = document.querySelector('[role=menu]')
        // choiceButtons are the menu items / buttons for the various choices (i.e. for the mock task the various animals)
        choiceButtons = choiceMenu.querySelectorAll('[role=menuitem]')
        // choicesShowingCount is the text below choices that notes "Showing X of Y"
        choicesShowingCount = screen.queryByText('Showing', { exact: false })
        clearFiltersButton = screen.queryByRole('button', { name: 'Clear filters' })
      })

      it('should not show a filter button', function () {
        expect(filterButton).to.equal(null)
      })

      it('should show the choices', function () {
        expect(choiceButtons.length).to.equal(6)
        expect(choiceButtons[0]).to.have.text('Aardvark')
        expect(choiceButtons[1]).to.have.text('Elephant')
        expect(choiceButtons[2]).to.have.text('Kudu')
        expect(choiceButtons[3]).to.have.text('Human')
        expect(choiceButtons[4]).to.have.text('Fire')
        expect(choiceButtons[5]).to.have.text('Nothing here')
      })

      it.skip('should not show the choices showing count out of total choices count', function () {
        expect(choicesShowingCount).to.equal(null)
      })

      it('should not not show a "Clear All Filters" button', function () {
        expect(clearFiltersButton).to.equal(null)
      })
    })
  })
})
